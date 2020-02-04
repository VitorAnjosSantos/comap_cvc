<?php
define("host","127.0.0.1");
define("usuario","root");
define("senha","");
define("db","comap_cvc");

$conexao= mysqli_connect(host,usuario,senha,db) or die("NÃO FOI POSSIVEL CONECTAR");


?>