<?php

    header('Access-Control-Allow-Origin: *');
    //header("Access-Control-Allow-Headers: Content-Type");
    //header('Content-Type: application/json');

    include("./conexao.php");


    $json = $_POST["contagem"];

    $contagem = json_decode($json);

    $auto = $contagem->{'auto'};
    $motos = $contagem->{'motos'};
    $onibus = $contagem->{'onibus'};
    $caminhao = $contagem->{'caminhao'};

    $sql = "INSERT INTO tb_veiculos (auto, motos, onibus, caminhao) VALUES ('$auto', '$motos', '$onibus', '$caminhao')";

    $result = mysqli_query($conexao,$sql);

    if($result){
        echo "{sucesso: true}";
    }
    else{
        echo"{sucesso: false}";
    }












?>