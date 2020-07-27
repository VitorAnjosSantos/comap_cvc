import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.page.html',
  styleUrls: ['./finalizar.page.scss'],
})
export class FinalizarPage implements OnInit {
  senha: any;
  loading: any = null;
  public interval;
  constructor(private alertController: AlertController,
              private navCtrl: NavController,
              public loadingController: LoadingController,
              private toastController: ToastController,
              private storage: Storage,
              public modalCtrl: ModalController
              ) 
              {}

  ngOnInit() {
    this.storage.set("senha", "comapcvcfinalizar");
    
  }

  async finalizarContagem(){
    await this.mostraCarregando();
    
    this.storage.get("senha").then((val)=>{
      if(this.senha == val){       
          this.presentToast();
          this.ocultaCarregando();
          
         
          this.navCtrl.navigateRoot('tablet');
          //this.modalCtrl.dismiss();
                
      }else{
        this.toastErro();
        this.ocultaCarregando();  
      }

    });
  }

  async close(){
    await this.modalCtrl.dismiss();
  }

  async alertaEnviar() {
    const alert = await this.alertController.create({
      header: 'Alerta!!',
      message: '<strong>Deseja realmente finalizar a contagem?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Finalizar',
          handler: () => {
            this.finalizarContagem();
          }
        }
      ]
    });
    return alert.present();
  }

  async mostraCarregando() {
    this.loading = await this.loadingController.create({
      message: 'Finalizando contagem ...',
      spinner: 'crescent',
      duration: 0 
      
    });
    
    await this.loading.present();
  }
  
  async ocultaCarregando() {
    await this.loading.dismiss();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Contagem finalizada com sucesso',
      duration: 4000,
      position: "top"
     
    });
    toast.present();
  }

  async toastErro() {
    const toastErro = await this.toastController.create({
      message: 'Erro: Senha incorreta',
      duration: 4000,
      position: "top"
     
    });
    toastErro.present();
  } 
  
}
