import { CadastrarService } from '../services/cadastro/cadastrar.service';
import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage {
  
  pesquisador: any;
  supervisor: any;

  formCadastrar = new FormGroup({
    pesquisador: new FormControl('', Validators.required),
    supervisor: new FormControl('', Validators.required),

  });

  constructor(private toastCtrl: ToastController, 
              private cadastrarService: CadastrarService, 
              private alertCtrl: AlertController, 
              private navCtrl: NavController,
              private storage: Storage
              ) { }

  async alerta() {
    const alerta = await this.alertCtrl.create({
      header: 'Atençâo!',
      subHeader: 'Erro!',
      message: 'Preencha todos os campos corretamente',
      buttons: ['OK']
    });    

    await alerta.present();
    
  }

  async conexao() {
    const conexao = await this.alertCtrl.create({
      header: 'Atençâo!',
      subHeader: 'Erro!',
      message: 'Falha ao tentar inserir dados no banco',
      buttons: ['OK']
    });

    await conexao.present();
    
  }

  async pesqui() {
    const conexao = await this.alertCtrl.create({
      header: 'Atençâo!',
      subHeader: 'Erro!',
      message: 'Pesquisador já existe no banco de dados',
      buttons: ['OK']
    });

    await conexao.present();
    
  }

  async toastCadastro() {
    const toast = await this.toastCtrl.create({
      message: 'Usuário criado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  cadastrar(dadosCadastro: any) {

    this.storage.set("pesquisador", dadosCadastro.pesquisador).then((val)=>{

      this.pesquisador = val;

        this.storage.set("supervisor", dadosCadastro.supervisor).then((val)=>{
          this.supervisor = val;
        });
    });
    
    const formData = new FormData();
    formData.append("pesquisador", dadosCadastro.pesquisador);
    formData.append("supervisor", dadosCadastro.supervisor);
    

    this.cadastrarService.postCadastrar(formData).subscribe((data: any) => {
      console.log(data);
    
      if (data.sucesso === true) {
        
        this.toastCadastro();
        this.navCtrl.navigateRoot("/login");
       
      }
      else if(data.sucesso === false){
        console.log(this.alerta());
      }

      if (data.conexao === false) {
        console.log(this.conexao());
      }

      if(data.pesquisador === false){
        console.log(this.pesqui());
      }
    
    });
  }

  

}
