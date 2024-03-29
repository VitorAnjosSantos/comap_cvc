import { GerarPlanilhaService } from './services/api/gerar-planilha.service';
import { InserirNoBancoService } from './services/database/inserir-no-banco.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { SQLite } from '@ionic-native/sqlite/ngx';
//import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
//import { DatabaseService } from './services/database/database.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(),HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    GerarPlanilhaService,
    InserirNoBancoService,
    //DatabaseService,
    //SQLite,
    //SQLitePorter
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
