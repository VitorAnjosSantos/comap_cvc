<?php

    header('Access-Control-Allow-Origin: *');
    //header("Access-Control-Allow-Headers: Content-Type");
    //header('Content-Type: application/json');

    include("./conexao.php");

    $json = $_POST["contagem"];
    

    $contagem = json_decode($json);

    foreach ($contagem as $value) {
        
        $auto = $value->{'auto'};
        $motos = $value->{'motos'};
        $onibus = $value->{'onibus'};
        $caminhao = $value->{'caminhao'};
        $data_hora = $value->{"data_hora"};

        $sql = "INSERT INTO tb_veiculos (auto, motos, onibus, caminhao, data_hora) VALUES ('$auto', '$motos', '$onibus', '$caminhao', '$data_hora')";
        $result = mysqli_query($conexao,$sql);

    }

	if($result){
        echo '{"sucesso": true}';
        //print_r($contagem);

    }
    else{
        echo'{"sucesso": false}';
	}
	
	
        
?>