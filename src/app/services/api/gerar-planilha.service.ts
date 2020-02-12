import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GerarPlanilhaService {
  url: string="http://192.168.1.88:8081/cvc_php";
  //url: string="http://10.131.45.40:8081/cvc_php";

  constructor(public http: HttpClient) { }

  inserirDados(dados: any){
    return this.http.post(this.url + '/inserir.php', dados);
    
  }











  
}
