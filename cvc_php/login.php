<?php
header('Access-Control-Allow-Origin: *');

include('./conexao.php');

$pesquisador = $_POST["pesquisador"];
$supervisor = $_POST["supervisor"];

$query = "SELECT id_usuario, pesquisador FROM tb_usuarios
            WHERE pesquisador = '".$pesquisador."' and supervisor = '".$supervisor."'";

$result = mysqli_query($conexao,$query);

$row= mysqli_num_rows($result);

if($row > 0 ){
    echo '{"sucesso": true}';
}
else{
    echo '{"sucesso": false}';

}


?>