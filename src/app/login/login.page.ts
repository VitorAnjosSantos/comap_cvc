import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/logar/login.service';
import { NavController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  

  formLogin = new FormGroup({
    pesquisador: new FormControl('', Validators.required),
    supervisor: new FormControl('', Validators.required)
  });

  constructor(private alertCtrl: AlertController, private loginService: LoginService, private navCtrl: NavController) { 
    
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

    const formData = new FormData();
    formData.append("pesquisador", dadosLogin.pesquisador);
    formData.append("supervisor", dadosLogin.supervisor);

    this.loginService.postLogin(formData).subscribe((data: any) => {
      console.log(data);

      if (data.sucesso) {
        
          this.navCtrl.navigateRoot("/tabs/tab1");
       
      }
      else{
        console.log(this.presentAlert());
      }

    });
  }

  cadastrar(){
   this.navCtrl.navigateRoot("/cadastrar");
  }
}
