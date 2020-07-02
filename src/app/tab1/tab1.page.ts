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
  bt= "1";
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
    const formData = new FormData();

    formData.append("id_formulario", this.bt);

    this.inserir.botoesJson(formData).subscribe((botoes)=>{
      this.botoes = botoes;
      this.ngOnInit();
    });   
  }
 
  async ngOnInit() {

    console.log(this.botoes);

    let count = 0;
    this.storage.get("botoes").then((botoes)=>{
      botoes.forEach(()=>{
          this.count[this.botoes[count]["nome_botao"]] = 0;
          this.conta[this.botoes[count]["nome_botao"]] = 0;
          
          count++;
      });
    });

    this.ocorrencia.forEach((val)=>{
      let aux = [];
      aux = Object.keys(val);
      for(let i= 0 ;  i < aux.length ; i++){
        
        this.count[aux[i]]= "NAO";
      };
          
    });

    console.log(this.count); 

    this.geolocaliza(); 

    this.nativeAudio.preloadSimple('uniqueId1', 'assets/audios/pop.mp3');

    setInterval(() => { 
    
      let horaCompleta = new Date();

      let hora = this.formataZerosEsquerda(horaCompleta.getHours()),   
          minutos = this.formataZerosEsquerda(horaCompleta.getMinutes()),
          segundos = this.formataZerosEsquerda(horaCompleta.getSeconds());

      let time = hora + ":" + minutos + ":" + segundos;

      if(time == "00:00:00"){
        this.storage.set("contagemTotal", "");
        let count = 0;
        this.storage.get("botoes").then((botoes)=>{
          botoes.forEach(()=>{
              this.conta[this.botoes[count]["nome_botao"]] = 0;
              
              count++;
          });
        });
      }
    }, 100);

    setInterval(() => { 
      this.setValor();
    }, 1000);

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

    
  }

  geolocaliza(){
    
    this.geoLocation.getCurrentPosition().then((resp) => {

      this.geo.latitude  = resp.coords.latitude;
      this.geo.longitude  = resp.coords.longitude;
      //alert(JSON.stringify(this.geo));
      let latitude = JSON.stringify(this.geo.latitude);
      let longitude = JSON.stringify(this.geo.longitude);
     
      this.count['latitude'] = latitude;
      this.count['longitude'] = longitude;
        

      }).catch((error: any) => navigator['app'].exitApp());
    //alert(JSON.stringify(this.count));  

  }

  ocorrencias(tipo){
    this.storage.get("listaForm").then((val: any) => {
      
      let array: any[] = [];

      if (val !== "") {
        array = array.concat(val);
        
      }
      
      console.log(JSON.stringify(this.ocorrencia));
      if(this.ocorrencia[0][tipo] == true){
          this.ocorrencia[0][tipo] = false;
          this.count[tipo] = 'NAO';
          array.push(val);
          console.log(JSON.stringify(this.ocorrencia));
        }else{
          this.ocorrencia[0][tipo] = true;
          this.count[tipo] = 'SIM';
          array.push(val);
          console.log(JSON.stringify(this.ocorrencia));
        }
        
    });
  }

  formataZerosEsquerda(valor: number) {
    return valor > 9 ? valor : "0" + valor;
  }

  getValor(tipo: any){
      
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
   
    this.array = this.array.concat(aux);

  }

  setValor(){
    
    this.storage.set("listaForm", this.array).then((data)=>{
        this.setHistorico();
        this.storage.set("contagemTotal", this.conta).then(() =>{});
        console.log(data);
    })

  }

  setHistorico(){

    this.storage.set("historico", this.conta).then((val: any) => {
        
      });
   
  }

  async contador(tipo: any){
    //this.nativeAudio.play('uniqueId1');
    
    this.conta[tipo]++;     

      // let d = await this.audio(); 
     this.getValor(tipo);
   
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
        this.storage.set("contagemTotal", "").then(() =>{
          this.array = [];

            let count = 0;
            this.storage.get("botoes").then((botoes)=>{
              botoes.forEach(()=>{
                  this.count[this.botoes[count]["nome_botao"]] = 0;
                  this.conta[this.botoes[count]["nome_botao"]] = 0;
                  
                  count++;
              });
            });
        });    
      });
    });    
  }

}