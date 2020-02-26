<?php
header('Access-Control-Allow-Origin: *');

include('./conexao.php');

$pesquisador = $_POST["pesquisador"];
$supervisor = $_POST["supervisor"];

$dados= false;

if($conexao){
    
    $sql= "SELECT id_usuario, pesquisador FROM tb_usuarios WHERE pesquisador = '".$pesquisador."' and supervisor = '".$supervisor."'";
    $resultado = mysqli_query($conexao,$sql);

    if(mysqli_num_rows($resultado) > 0){
        echo '{"pesquisador": false}';
    }else{
        $dados= true;
            
        $query= "INSERT INTO tb_usuarios (pesquisador,supervisor) VALUES ('".$pesquisador."','".$supervisor."')";        
        $result= mysqli_query($conexao,$query);

        if(mysqli_num_rows($result) > 0){
            echo '{"sucesso": true}'; 
        }
        else{
            
            echo '{"conexao": false}'; 
        }
        
        
    }

}










?>