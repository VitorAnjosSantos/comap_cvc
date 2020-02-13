<?php

    header('Access-Control-Allow-Origin: *');
    //header("Access-Control-Allow-Headers: Content-Type");
    //header('Content-Type: application/json');

    include("./conexao.php");


    $json = $_POST["contagem"];
    $data_hora = $_POST["data_hora"];

    $contagem = json_decode($json);

    foreach ($contagem as $value) {
        
        $auto = $value->{'auto'};
        $motos = $value->{'motos'};
        $onibus = $value->{'onibus'};
        $caminhao = $value->{'caminhao'};

        $sql = "INSERT INTO tb_veiculos (auto, motos, onibus, caminhao, data_hora) VALUES ('$auto', '$motos', '$onibus', '$caminhao', '$data_hora')";
        $result = mysqli_query($conexao,$sql);

    }

	if($result){
        $id = mysqli_insert_id($conexao);
        echo '{"sucesso": true}';
        print_r($contagem);

    }
    else{
        echo'{"sucesso": false}';
	}
	
	
        
?>