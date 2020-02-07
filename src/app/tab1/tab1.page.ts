import { GerarPlanilhaService } from '../services/api/gerar-planilha.service';
import { Component} from '@angular/core';
import { NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  
  count: any;
  listaForm: any;

  constructor(private navCtrl: NavController, 
              private storage: Storage,
             private inserir: GerarPlanilhaService,
            ) {

    this.count= {
      auto: 0,
      motos: 0,
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

  limpar(){
    let limpa = {
      auto: 0,
      motos: 0,
      onibus: 0,
      caminhao: 0};

    this.storage.set("listaForm", JSON.stringify(limpa)).then((data: any) => {
      console.log(data);
      alert(data);
            
      });  
  }

  salvar(){
    let form = this.count;

    this.listaForm = [form];
    this.storage.get("listaForm").then((val: any) => {

      let objeto = JSON.parse(val);
      this.listaForm = this.listaForm.concat(objeto);

      this.storage.set("listaForm", JSON.stringify(this.listaForm )).then((data: any) => {


      console.log(data);
      alert(data);
      });
    });


  }

  enviar(){
    //setInterval(() => { 

   
    this.storage.get("listaForm").then(() => {


      let dNow = new Date();
      let localdate = dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':';    
    
      if(dNow.getMinutes() < 10){
        let i = '0';
        localdate += i + dNow.getMinutes();

      }else{
        localdate += dNow.getMinutes();
      }
      
      const formData = new FormData();
      formData.append("contagem", JSON.stringify(this.listaForm ));
      formData.append("data_hora", localdate);

      this.inserir.inserirDados(formData).subscribe((data: any) => {
        this.storage.set("usuario", data.id).then(()=>{
          console.log(data.id);
        });  

      });
      
    });
   
    
  
 // }, 10000); 
      
  }

  
}

