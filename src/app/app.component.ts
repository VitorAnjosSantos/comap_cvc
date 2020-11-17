//import { TabsPage } from './tabs/tabs.page';
import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

//import { DatabaseService } from './services/database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rootPage: any = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private storage: Storage
    //private dbService: DatabaseService
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('historico').then((historico)=>{
        if(historico == "" || historico == null){
          //alert('Historico vazio');
          this.navCtrl.navigateRoot('tablet');
        }else{
          //alert('Historico OK');
          this.navCtrl.navigateRoot('login');
        }
      });
    
     /* this.dbService.createDatabase().then(()=>{

        this.openTabsPage(this.splashScreen);
        alert("Banco Criado com Sucesso");

      }).catch(e => {
        alert("Algo deu errado");
        console.error(e);
        this.openTabsPage(this.splashScreen);

      });
       */
      
    });
  }

  /*public openTabsPage(splashScreen: SplashScreen){
    
    this.rootPage = TabsPage;
  }
  */
}
