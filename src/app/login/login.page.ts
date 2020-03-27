import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/logar/login.service';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  formLogin = new FormGroup({
    pesquisador: new FormControl('', Validators.required),
    supervisor: new FormControl('', Validators.required),
    posto: new FormControl('', Validators.required)
  });
 
  idDevice: any;

  constructor(private alertCtrl: AlertController,
              private loginService: LoginService, 
              private navCtrl: NavController,
              private storage: Storage,
              private uniqueDeviceID: UniqueDeviceID

              ) { 

    this.uniqueDeviceID.get().then((uuid: any) => {
      this.idDevice = uuid;
    }).catch((error: any) => navigator['app'].exitApp());
    
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Atençâo!',
      subHeader: 'Erro!',
      message: 'Preencha todos os campos corretamente',
      buttons: ['OK']
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  login(dadosLogin: any) {

   
    
    this.storage.set("idDevice", this.idDevice).then(()=>{

      this.storage.set("pesquisador", dadosLogin.pesquisador.toLowerCase()).then(()=>{

        this.storage.set("supervisor", dadosLogin.supervisor.toLowerCase()).then(()=>{
          this.storage.set("posto", dadosLogin.posto).then((posto)=>{
            this.storage.get("pesquisador").then((val) => {
              this.storage.get("supervisor").then((data) => {

                if(data == "" || val == "" || posto == ""){
                  console.log(this.presentAlert());
                }else{
                  this.navCtrl.navigateRoot("/tabs/tab1")
                }
              });

            });
          });
        });
          

        });
    }, (error) => {
          
      console.log(this.presentAlert());
    });

  }

  cadastrar(){
   this.navCtrl.navigateRoot("/cadastrar");
  }
}
