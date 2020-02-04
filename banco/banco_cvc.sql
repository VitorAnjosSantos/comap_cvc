create database comap_cvc;

use  comap_cvc;

create table tb_veiculos(

id_veiculo int auto_increment not null,
auto int,
motos int,
onibus int,
caminhao int,
primary key(id_veiculo) 


);

select * from tb_veiculos;