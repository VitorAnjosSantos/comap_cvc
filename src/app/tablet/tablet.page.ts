import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/logar/login.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InserirNoBancoService } from '../services/database/inserir-no-banco.service';

@Component({
  selector: 'app-tablet',
  templateUrl: './tablet.page.html',
  styleUrls: ['./tablet.page.scss'],
})
export class TabletPage implements OnInit {
  tablet: any;
  senha: any;
  loading: any = null;

  constructor(private sinc: LoginService,
              private storage: Storage,
              private inserir: InserirNoBancoService,
              private alertController: AlertController,
              public loadingController: LoadingController,
              private toastController: ToastController) 
              {  }

  ngOnInit() {
  }

  async sincronizar(){
    await this.mostraCarregando();

    const formData = new FormData();

    formData.append("tablet", this.tablet);
    formData.append("senha", this.senha);
    
    this.sinc.postLogin(formData).subscribe((data: any) => {

      this.storage.set("postos",data['posto']).then(()=>{
        
        this.storage.set("sentidos",data['sentido']).then(()=>{

          this.storage.set("rodovias",data['rodovia']).then(()=>{

            this.storage.set("kms",data['km']).then(()=>{

              this.storage.set("idPosto",data['idPosto']).then(()=>{

                this.storage.set("tb_formularios_id_formulario",data['id_formulario']).then((fk)=>{

                  const formData = new FormData();

                    formData.append("id_formulario", fk);

                    this.inserir.botoesJson(formData).subscribe((botoes)=>{
                      this.storage.set("botoes",botoes).then((bt)=>{
                        console.log(bt);
                        this.presentToast();
                        this.ocultaCarregando();
                      });
                    });
                
                });
              
              });

            });

          });

        });

      });
    
    }, (error) => {
      
      this.toastErro();
      this.ocultaCarregando();  
      
    });
  }
  
  async alertaEnviar() {
    const alert = await this.alertController.create({
      header: 'Alerta!!',
      message: '<strong>Deseja realmente sincronizar um novo tablet?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Sincronização cancelada');
          }
        }, {
          text: 'Sincronizar',
          handler: () => {
            this.sincronizar();
          }
        }
      ]
    });

    return alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tablet sincronizado com sucesso',
      duration: 4000,
      position: "top"
     
    });
    toast.present();
  }

  async toastErro() {
    const toastErro = await this.toastController.create({
      message: 'Erro: não foi possivel sincronizar!',
      duration: 4000,
      position: "top"
     
    });
    toastErro.present();
  } 

  async mostraCarregando() {
    this.loading = await this.loadingController.create({
      message: 'Sincronizando ...',
      spinner: 'crescent',
      duration: 0 
      
    });
    
    await this.loading.present();
  }
  
  async ocultaCarregando() {
    await this.loading.dismiss();
  }






}
