import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastrarService {
  url: string="http://ec2-18-211-204-199.compute-1.amazonaws.com/cvc_php";

  constructor(private http: HttpClient) { }

  postCadastrar(dados: any) {
    return this.http.post(this.url + "/cadastrar.php", dados);
}

}
