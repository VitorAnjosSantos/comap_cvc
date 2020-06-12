import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  geo = {latitude: 0, longitude: 0};

  formLogin = new FormGroup({
    pesquisador: new FormControl('', Validators.required),
    supervisor: new FormControl('', Validators.required),
    posto: new FormControl('', Validators.required),
    sentido: new FormControl('', Validators.required)
  });

  pesq: any;
  sup: any;
  postos: any;
  sentidos: any = [];
 
  idDevice: string = "10101010";

  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController,
              private storage: Storage,
              private uniqueDeviceID: UniqueDeviceID,
              ) { 

    this.uniqueDeviceID.get().then((uuid: any) => {
      this.idDevice = uuid;
    }).catch((error: any) => navigator['app'].exitApp());

    this.storage.get("pesquisador").then((val) => {
      this.storage.get("supervisor").then((data) => {

        this.pesq = val;
        this.sup = data;
        
      });

    });

   
  }

  ionViewWillEnter(){
    let count = 0;
    let count2 = 0;
    let aux = [];
    let aux2 = [];
    let aux3 = [];
    this.storage.get("postos").then((postos) => {

      this.postos = postos;
      console.log(this.postos);
      
    });

    this.storage.get("sentidos").then((sentidos) => {
     
      this.storage.get("idPosto").then((id) => {

        for(let i = 0; i< sentidos.length; i++){
          this.sentidos.push({'sentidos':'','idPosto':''});
          this.sentidos[count]['sentidos'] = sentidos[i];
          this.sentidos[count]['idPosto'] = id[i];
          
          count++;
        }
        console.log(this.sentidos);
        
     });
      
    });
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
      this.storage.set("PostoSelecionado", dadosLogin.sentido).then(()=>{
        this.storage.set("pesquisador", dadosLogin.pesquisador.toLowerCase()).then(()=>{
          this.storage.set("supervisor", dadosLogin.supervisor.toLowerCase()).then(()=>{  
            this.storage.get("pesquisador").then((val) => {
              this.storage.get("supervisor").then((data) => {

                if(data == "" || val == ""){
                  console.log(this.presentAlert());
                }else{
                
                  this.navCtrl.navigateRoot("/tabs/tab1");
                 //console.log(dadosLogin.sentido);
                
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
