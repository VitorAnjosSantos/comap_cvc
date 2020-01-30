import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  dados: string;
  count: any;
  contagem: any;

  constructor(private navCtrl: NavController, private storage: Storage) {
    this.count= {
      auto: 0,
      motos:0,
      onibus: 0,
      caminhao: 0

      /* 
      auto: 0,
      utilitario: 0,
      auto3E: 0,
      auto4E: 0,
      onibus2E: 0,
      onibus3E: 0,
      onibus4E: 0,
      veiculoOficial: 0,
      veiculoEspecial: 0,
      motos: 0,
      cLeve2E: 0,
      c2E: 0,
      c3R: 0,
      c31S:0,
      c4R: 0,
      c41S:0,
      c42S:0,
      c5R: 0,
      c51S:0,
      c52S:0,
      c6R: 0,
      c61S:0,
      c62S:0,
      c63S:0,
      c7R: 0,
      c71S:0,
      c72S:0,
      c73S:0,
      c8R: 0,
      c81S:0,
      c82S:0,
      c83S:0,
      c84S:0,
      c9R: 0,
      c91S:0,
      c92S:0,
      c93S:0,
      c94S:0
      */

    };

  }
  
  contador(tipo: string){
    this.count[tipo]++;  
    

  }

  contados(tipo: string){
    return this.count[tipo];

  }

  saveStorage(){
    this.storage.set("dados", JSON.stringify(this.count));
  }

  loadStorage(){

    this.storage.get("dados").then((val) => {
     this.contagem = console.log(val);

    }

    );
    
  }



  
}

