//import { SQLite, SQLiteObject  } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

//   databaseName: string = 'comap_cvc';

constructor(/*private sqlite: SQLite*/) { }


//  public getDb(){
//     return this.sqlite.create({
//       name: "comap_cvc",
//       location: "default"
//     });
//   }

//   public createDatabase(){
//     return this.getDb().then((db : SQLiteObject)=>{
//       this.createTables(db);

//     }).catch(e => console.error(e));
//   }
  
//   private createTables(db : SQLiteObject){
//     return db.sqlBatch(

//       ["create table if not exists tb_veiculos(id_veiculo int auto_increment not null,auto int,motos int,onibus int,caminhao int,data_hora varchar(20),primary key(id_veiculo) );"]

//     ).then(()=> {
//       console.log("Tabela Criada com Sucesso");
//     }).catch(e => console.error(e));
//   }

}
