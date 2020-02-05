<?php

    header('Access-Control-Allow-Origin: *');
    //header("Access-Control-Allow-Headers: Content-Type");
    //header('Content-Type: application/json');

    include("./conexao.php");


    $json = $_POST["contagem"];
    $data_hora = $_POST["data_hora"];

    $contagem = json_decode($json);

    $auto = $contagem->{'auto'};
    $motos = $contagem->{'motos'};
    $onibus = $contagem->{'onibus'};
    $caminhao = $contagem->{'caminhao'};

    $sql = "INSERT INTO tb_veiculos (auto, motos, onibus, caminhao, data_hora) VALUES ('$auto', '$motos', '$onibus', '$caminhao', '$data_hora')";

	$result = mysqli_query($conexao,$sql);

	if($result){
		echo "{sucesso: true}";

    }
    else{
        echo"{sucesso: false}";
	}
	
	
        
?>