<?php

    header('Access-Control-Allow-Origin: *');
    //header("Access-Control-Allow-Headers: Content-Type");
    //header('Content-Type: application/json');

    include("./conexao.php");

    $json = $_POST["contagem"];

    $contagem = json_decode($json);

    foreach ($contagem as $value){

        $date = $value->{"date"};
        $time = $value->{"time"};
        $auto = $value->{'auto'};
        $motos = $value->{'motos'};
        $onibus = $value->{'onibus'};
        $caminhao = $value->{'caminhao'};

        $sql = "INSERT INTO tb_veiculos (auto, motos, onibus, caminhao, date, time) VALUES ('$auto', '$motos', '$onibus', '$caminhao', '$date', '$time')";
        $result = mysqli_query($conexao,$sql);

    }
	
        
?>