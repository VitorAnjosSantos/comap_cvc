import { TabsPage } from './tabs/tabs.page';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from './services/database/database.service';

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
    private dbService: DatabaseService
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
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
    splashScreen.hide();
    this.rootPage = TabsPage;
  }
  */
}
