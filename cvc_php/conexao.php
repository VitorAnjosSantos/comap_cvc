<?php
define("host","127.0.0.1");
define("usuario","root");
define("senha","");
define("db","cvc");

$conexao= mysqli_connect(host,usuario,senha,db) or die("NÃO FOI POSSIVEL CONECTAR");

if($conexao){
    echo("CONECTADO!");
}


?>