import { Component} from '@angular/core';
import { NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { InserirNoBancoService } from '../services/database/inserir-no-banco.service';
import { GerarPlanilhaService } from '../services/api/gerar-planilha.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
 
  count: any;
  listaForm: any;
  localdate: any;
  loading: any = null;

  constructor(private navCtrl: NavController, 
              private storage: Storage,
              private inserir: InserirNoBancoService,
              private gerar: GerarPlanilhaService,
              public loadingController: LoadingController,
              private toastController: ToastController,
              private alertController: AlertController
            ) {

    this.count= {
      date: '',
      time: '',
      auto: 0,
      motos: 0,
      onibus: 0,
      caminhao: 0,
      

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
    this.storage.set("listaForm", "").then((data: any) =>{
      
    });   


  }

  async alertaEnviar() {
    const alert = await this.alertController.create({
      header: 'Alerta!!',
      message: '<strong>Deseja realmente enviar os dados de contagem?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Envio cancelado');
          }
        }, {
          text: 'Enviar',
          handler: () => {
            this.enviar();
          }
        }
      ]
    });

    return alert.present();
  }


  formataZerosEsquerda(valor: number) {
    return valor > 9 ? valor : "0" + valor;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Dados enviados com sucesso',
      duration: 4000,
      position: "top"
     
    });
    toast.present();
  }

  async toastErro() {
    const toastErro = await this.toastController.create({
      message: 'Erro: os dados não foram enviados',
      duration: 4000,
      position: "top"
     
    });
    toastErro.present();
  }
  
  contador(tipo: string){
    this.count[tipo]++;  
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

         date = dia + "-" + mes + "-" + ano + " ";
         time = hora + "-" + minutos + "-" + segundos;
        
        
        this.count["date"] = date;
        this.count["time"] = time;
      
      array.push(this.count);

      this.storage.set("listaForm", JSON.stringify(array)).then((data: any) => {
        
        
        //alert(data);
        console.log(data);
      });
    });
  }

  contados(tipo: string){
    return this.count[tipo];

  }

  async enviar(){
    //setInterval(() => { 
     
    await this.mostraCarregando();
   
      this.storage.get("listaForm").then((val: any) => {

        if(val == ""){
          alert("Contagem vazia!!! \nCertifique-se de realizar uma contagem!!");
          this.toastErro();
          this.ocultaCarregando();
        }
        else{
          const formData = new FormData();
          formData.append("contagem", val);
        
          this.inserir.inserirDados(formData).subscribe((data: any) => {
            console.log(data);

            this.storage.set("listaForm", "").then((data: any) =>{
              this.count= {
                date: '',
                time: '',
                auto: 0,
                motos: 0,
                onibus: 0,
                caminhao: 0
              };
            });          

            this.presentToast();
            this.ocultaCarregando();
            
            
            this.gerar.gerarDados(formData).subscribe((data: any) => {

            });

          }, (error) => {
          
            this.toastErro();
            this.ocultaCarregando();
          });
        }
      });
       
  // }, 10000);        
  }

  async mostraCarregando() {
    this.loading = await this.loadingController.create({
      message: 'Enviando dados ...',
      spinner: 'crescent',
      duration: 0 
      
    });
    
    await this.loading.present();
  }
  
  async ocultaCarregando() {
    await this.loading.dismiss();
  }

}