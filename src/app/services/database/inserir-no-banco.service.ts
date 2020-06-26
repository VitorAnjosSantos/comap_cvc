import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InserirNoBancoService {
  url: string="http://ec2-18-211-204-199.compute-1.amazonaws.com/cvc_php";
  //url: string="http://10.131.45.40:8081/cvc_php";

  constructor(public http: HttpClient) { }

  inserirDados(dados: any){
    return this.http.post(this.url + '/inserir_usuario.php', dados);
    
  }

  gerarDados(dados: any){
    return this.http.post(this.url + '/excel_usuario.php', dados);
    
  }

  botoesJson(dados: any){
    return this.http.post('http://ec2-18-211-204-199.compute-1.amazonaws.com/site-comap-cvc/objetos/json.php', dados);
    
  }
  
}
