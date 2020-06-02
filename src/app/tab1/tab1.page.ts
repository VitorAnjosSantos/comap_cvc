import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { InserirNoBancoService } from '../services/database/inserir-no-banco.service';
//import { GerarPlanilhaService } from '../services/api/gerar-planilha.service';
import { AlertController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
 
  public count: any = {};
  listaForm: any;
  localdate: any;
  loading: any = null;
  public contagem: any;
  public conta: any = {};
  pesquisador: any;
  supervisor: any;
  transito: boolean= false;
  sigapare: boolean= false;
  chuva: boolean= false; 
  ocorrencia: any= [{transito: false, sigapare: false, chuva: false}];
  geo = {latitude: 0, longitude: 0};
  array: any;
  botoes: any;

  constructor(private navCtrl: NavController, 
              private storage: Storage,
              private inserir: InserirNoBancoService,
              //private gerar: GerarPlanilhaService,
              public loadingController: LoadingController,
              private toastController: ToastController,
              private alertController: AlertController,
              private nativeAudio: NativeAudio,
              private geoLocation: Geolocation,
              public _http: HttpClient
            ){

    this.inserir.botoesJson()
    .subscribe((botoes)=>{
      this.botoes = botoes;
      this.ngOnInit();
    });   
  }
 
  async ngOnInit() {

    let count = 0;
      this.botoes.forEach(()=>{
         this.count[this.botoes[count]["nome_botao"]] = 0;
         this.conta[this.botoes[count]["nome_botao"]] = 0;

         count++;
      });

    this.storage.set("tb_formularios_id_formulario", this.botoes[0]['tb_formularios_id_formulario']).then(() => { 
    }); 

    this.storage.get("listaForm").then((val: any) => {
      if(val !== null){
        this.array = val;
        
      }else{  
        this.storage.set("listaForm", "").then(() => { 
          
        });
      }
    });

    this.storage.get("historico").then((val: any) => {
      if (val) {
        this.contagem = val;
        this.conta = val;
        console.log(JSON.stringify(this.count));
      }else{
        this.storage.set("historico", '');
        this.limparCache();
      }
      
    });      

    this.geolocaliza(); 

    this.nativeAudio.preloadSimple('uniqueId1', 'assets/audios/pop.mp3');
    
  }


  geolocaliza(){
    
      this.geoLocation.getCurrentPosition().then((resp) => {
  
        this.geo.latitude  = resp.coords.latitude;
        this.geo.longitude  = resp.coords.longitude;
        //alert(JSON.stringify(this.geo));
        let latitude = JSON.stringify(this.geo.latitude);
        let longitude = JSON.stringify(this.geo.longitude);

          setInterval(()=>{
            this.count['latitude'] = latitude;
            this.count['longitude'] = longitude;
          },10000);

        }).catch((error: any) => navigator['app'].exitApp());
      //alert(JSON.stringify(this.count));  

  }

  formataZerosEsquerda(valor: number) {
    return valor > 9 ? valor : "0" + valor;
  }

  getValor(tipo: any){
    return new Promise ((resolve, reject) => {
      
      this.geolocaliza();

      let array = JSON.stringify(this.count);
  
      let aux = JSON.parse(array);
      
      aux[tipo]++; 

      let date: any;
      let time: any;

      let dataCompleta = new Date(),
          horaCompleta = new Date();

      let dia = this.formataZerosEsquerda(dataCompleta.getDate()),
          mes = this.formataZerosEsquerda((dataCompleta.getMonth() + 1)),
          ano = dataCompleta.getFullYear(),
          hora = this.formataZerosEsquerda(horaCompleta.getHours()),   
          minutos = this.formataZerosEsquerda(horaCompleta.getMinutes()),
          segundos = this.formataZerosEsquerda(horaCompleta.getSeconds()),
          milisegundos = this.formataZerosEsquerda(horaCompleta.getMilliseconds());

      date = dia + "/" + mes + "/" + ano;
      time = hora + ":" + minutos + ":" + segundos + ":" + milisegundos;         
      
      aux["date"] = date;
      aux["time"] = time;

      resolve(aux); 
             
    })
  }

  async setValor(val:any){
    return new Promise ((resolve, reject) => {
      
      this.array = this.array.concat(val);
      this.storage.set("listaForm", this.array).then((data)=>{
         
        resolve(data);
        
      })
    });
  }

  async  setHistorico(){
    return new Promise ((resolve, reject) => {
      this.storage.set("historico", this.conta).then((val: any) => {
       
        
        resolve('2');
        
      });
    });
    
  }

  audio(){
    return new Promise ((resolve, reject) => {
      this.nativeAudio.play('uniqueId1').then(()=> {
        
        resolve("Ok");
      });
    });
  }  

  async contador(tipo: any){
    this.conta[tipo]++;

    /* let d = await this.audio(); */
    let a = await this.getValor(tipo);
    let b = await this.setValor(a);
    let c = await this.setHistorico();
  
    console.log(b);  
  }

  contados(tipo: string){

    return this.conta[tipo];
  }

  limpaCount(){
    alert(JSON.stringify(this.conta));
  }

  limparCache(){
    this.storage.set("listaForm", "").then(() =>{
      this.storage.set("historico", "").then(() =>{
        this.array = [];

        let count = 0;
        this.botoes.forEach(()=>{
          this.count[this.botoes[count]["nome_botao"]] = 0;
          this.conta[this.botoes[count]["nome_botao"]] = 0;
          count++;
       });
           
      });
    });    
  }

}