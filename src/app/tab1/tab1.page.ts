import { Component, OnInit} from '@angular/core';
import { NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { InserirNoBancoService } from '../services/database/inserir-no-banco.service';
//import { GerarPlanilhaService } from '../services/api/gerar-planilha.service';
import { AlertController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
 
  public count: any;
  listaForm: any;
  localdate: any;
  loading: any = null;
  public contagem: any;
  public conta: any;
  pesquisador: any;
  supervisor: any;
  transito: boolean= false;
  sigapare: boolean= false;
  chuva: boolean= false; 
  ocorrencia: any= [{transito: false, sigapare: false, chuva: false}];

  constructor(private navCtrl: NavController, 
              private storage: Storage,
              private inserir: InserirNoBancoService,
              //private gerar: GerarPlanilhaService,
              public loadingController: LoadingController,
              private toastController: ToastController,
              private alertController: AlertController,
              private nativeAudio: NativeAudio
            ) 
            {
            
   this.count= {
      date: '',
      time: '',
      auto: 0,
      motos: 0,
      onibus: 0,
      caminhao: 0,
      transito: 'NÃO', 
      sigapare: 'NÃO', 
      chuva: 'NÃO'
      
      /* 
      auto: 0,
      utilitario: 0,
      auto3E: 0,
      auto4E: 0,
      onibus2E: 0,
      onibus3E: 0,
      onibus4E: 0,
      veiculoOficial: 0,
      veiculoEspecial: 0,
      motos: 0,
      cLeve2E: 0,
      c2E: 0,
      c3R: 0,
      c31S: 0,
      c4R: 0,
      c41S: 0,
      c42S: 0,
      c5R: 0,
      c51S: 0,
      c52S: 0,
      c6R: 0,
      c61S: 0,
      c62S: 0,
      c63S: 0,
      c7R: 0,
      c71S: 0,
      c72S: 0,
      c73S: 0,
      c8R: 0,
      c81S: 0,
      c82S: 0,
      c83S: 0,
      c84S: 0,
      c9R: 0,
      c91S: 0,
      c92S: 0,
      c93S: 0,
      c94S: 0
      */

    };

    this.contagem = this.count;
    this.conta = this.count;

    this.storage.get("listaForm").then((val: any) => {
      if(val !== null){
        console.log('Lista ja existe');
      }else{
        this.storage.set("listaForm", "").then(() => { 
        });
      }
    });

    this.storage.get("historico").then((val: any) => {
      if (val) {
        this.contagem = val;
        this.conta = val;
        
      }else{
        this.storage.set("historico", this.count).then((val: any) => {
          this.contagem = val;
          
        });
      }
      
    });     
    
  }

  ocorrencias(tipo){
    this.storage.get("listaForm").then((val: any) => {
      
      let tipoOcorrencia = tipo;

      let array: any[] = [];

      if (val !== "") {
        array = array.concat(JSON.parse(val));
        
      }
      
      if(this.ocorrencia[0][tipo] == true){
        this.ocorrencia[0][tipo] = false;
          this.count[tipo] = 'NÃO';
          array.push(this.count);
          //console.log(JSON.stringify(this.ocorrencia));
        }else{
          this.ocorrencia[0][tipo] = true;
          this.count[tipo] = 'SIM';
          array.push(this.count);
          //console.log(JSON.stringify(this.ocorrencia));
        }
        
        

    });
  }

  ngOnInit() {

    this.nativeAudio.preloadSimple('uniqueId1', 'assets/audios/pop.mp3');
    
  }

  formataZerosEsquerda(valor: number) {
    return valor > 9 ? valor : "0" + valor;
  }

  contador(tipo: string){
    //this.nativeAudio.play('uniqueId1').then(()=> {

      if(this.count[tipo] == 0 && this.conta[tipo] == 0 ){
        this.count[tipo]++;
        this.conta[tipo] = this.count[tipo];
      }else{
        this.count[tipo]++;
        this.conta[tipo]++;
      }
      
      this.storage.get("listaForm").then((val: any) => {
        let array: any[] = [];

        if (val !== "") {
          array = array.concat(JSON.parse(val));
          
        }

          let date: any;
          let time: any;

          let dataCompleta = new Date(),
              horaCompleta = new Date();

          let dia = this.formataZerosEsquerda(dataCompleta.getDate()),
              mes = this.formataZerosEsquerda((dataCompleta.getMonth() + 1)),
              ano = dataCompleta.getFullYear(),
              hora = this.formataZerosEsquerda(horaCompleta.getHours()),   
              minutos = this.formataZerosEsquerda(horaCompleta.getMinutes()),
              segundos = this.formataZerosEsquerda(horaCompleta.getSeconds());

          date = dia + "/" + mes + "/" + ano;
          time = hora + ":" + minutos + ":" + segundos;
          
          
          this.count["date"] = date;
          this.count["time"] = time;
        
          array.push(this.count);

        this.storage.set("listaForm", JSON.stringify(array)).then((data: any) => {

          this.storage.set("historico", this.conta).then((val: any) => {
            this.contagem = val
            this.count.date= '';
            this.count.time= '';
            this.count.auto= 0;
            this.count.motos= 0;
            this.count.onibus= 0;
            this.count.caminhao= 0;
            
            
          });

        console.log(data);
    
        });
      });
    //});
  }

  contados(tipo: string){

      return this.contagem[tipo];
   
  }

  limparCache(){
    this.storage.set("listaForm", "").then(() =>{
      this.storage.set("historico", "").then(() =>{

            this.contagem= {
              date: '',
              time: '',
              auto: 0,
              motos: 0,
              onibus: 0,
              caminhao: 0,
              transito: 'NÃO', 
              sigapare: 'NÃO', 
              chuva: 'NÃO'
            };
            this.conta= {
              date: '',
              time: '',
              auto: 0,
              motos: 0,
              onibus: 0,
              caminhao: 0,
              transito: 'NÃO', 
              sigapare: 'NÃO', 
              chuva: 'NÃO'
            };
            this.count= {
              date: '',
              time: '',
              auto: 0,
              motos: 0,
              onibus: 0,
              caminhao: 0,
              transito: 'NÃO', 
              sigapare: 'NÃO', 
              chuva: 'NÃO'
            };
           
      });
    });    
  }

}