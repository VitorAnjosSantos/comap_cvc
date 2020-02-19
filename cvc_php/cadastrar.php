<?php
header('Access-Control-Allow-Origin: *');

include('./conexao.php');

$json1 = $_POST["pesquisador"];
$json2 = $_POST["supervisor"];

$pesqui= json_decode($json1);
$super= json_decode($json2);
$pesquisador= "";
$supervisor= "";

foreach($pesqui as $value){
    $a = $value->{"pesquisador"};
    $pesquisador = $a;
}
foreach($super as $value){
    $b = $value->{"supervisor"};
    $supervisor = $b;
}

$dados= false;

if($conexao){
    
    $sql= $conexao->query("SELECT * FROM tb_usuario WHERE pesquisador= '$pesquisador', supervisor= '$supervisor'");
    

    if(mysqli_num_rows($sql) > 0){
        echo '{"pesquisador": false}';
    }else{
        $dados= true;
        if ($dados) {
            
            $query= "INSERT INTO tb_usuario (pesquisador,supervisor) 
                     VALUES ('".$pesquisador."','".$supervisor."'";        
            $result= mysqli_query($conexao,$query);
    
            if(empty($result)){
                echo '{"conexao": false}'; 
            }
            else{
                
                echo '{"sucesso": true}'; 
            }
    
            
        }
        
        
    }

}










?>