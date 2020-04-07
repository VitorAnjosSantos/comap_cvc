<?php
define("host","ec2-18-211-204-199.compute-1.amazonaws.com");
define("usuario","Vitor");
define("senha","3AnfNRUQKcR");
define("db","comap_cvc_usuario");

$conexao= mysqli_connect(host,usuario,senha,db) or die("NÃO FOI POSSIVEL CONECTAR");


?>