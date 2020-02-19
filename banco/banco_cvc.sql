create database comap_cvc;

use  comap_cvc;

create table tb_veiculos(

id_veiculo int auto_increment not null,
auto int,
motos int,
onibus int,
caminhao int,
date varchar(30),
time varchar(30),
primary key(id_veiculo) 
);

select * from tb_veiculos;

truncate tb_veiculos;

drop table tb_veiculos;