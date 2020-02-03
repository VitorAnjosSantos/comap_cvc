import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GerarPlanilhaService {
  url: string="http://localhost:8081/comap_cvc/cvc_php";

  constructor(public http: HttpClient) { }

  inserirDados(dados: any){
    return this.http.post(this.url + '/inserir.php', dados);
    
  }








  
}
