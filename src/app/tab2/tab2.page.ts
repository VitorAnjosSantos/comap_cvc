import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { InserirNoBancoService } from '../services/database/inserir-no-banco.service';
//import { GerarPlanilhaService } from '../services/api/gerar-planilha.service';
import { AlertController } from '@ionic/angular';
import {Tab1Page} from '../tab1/tab1.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  loading: any = null;

  constructor(private navCtrl: NavController,
              private storage: Storage,
              private inserir: InserirNoBancoService,
              //private gerar: GerarPlanilhaService,
              public loadingController: LoadingController,
              private toastController: ToastController,
              private alertController: AlertController,
              public tab: Tab1Page
              ) 
              {

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
 
          this.storage.get("idDevice").then((id)=>{
            this.storage.get("pesquisador").then((pesq)=>{
              this.storage.get("supervisor").then((supe)=>{
                this.storage.get("tb_formularios_id_formulario").then((fk)=>{
                  
                  const formData = new FormData();

                  formData.append("pesquisador", pesq);
                  formData.append("supervisor", supe);
                  formData.append("contagem", JSON.stringify(val));
                  formData.append("idDevice", id);
                  formData.append("fk", fk);
                  
                  this.inserir.inserirDados(formData).subscribe((data: any) => {

                      this.presentToast();
                      this.ocultaCarregando();
                  
                  }, (error) => {
                   
                    this.toastErro();
                    this.ocultaCarregando();  
                    
                  });
                }); 
              });              
            });  
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

  limpar(){
    this.storage.set("listaForm", "").then(() =>{
      this.storage.set("historico", "").then(() =>{
        this.storage.set("pesquisador", "").then(() =>{
          this.storage.set("supervisor", "").then(() =>{

            this.tab.contagem= {
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
            this.tab.conta= {
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
            this.tab.count= {
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
      });
    });    
  }

  limparCache(){
    this.storage.set("listaForm", "").then(() =>{
      this.storage.set("historico", "").then(() =>{
       

            this.tab.contagem= {
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
            this.tab.conta= {
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
            this.tab.count= {
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
