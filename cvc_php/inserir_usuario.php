<?php
    header('Access-Control-Allow-Origin: *');
    //header("Access-Control-Allow-Headers: Content-Type");
    //header('Content-Type: application/json');
    include("./conexao_usuario.php");

    $idDevice = $_POST["idDevice"];
    $pesquisador = $_POST["pesquisador"];
    $supervisor = $_POST["supervisor"];
    $json = $_POST["contagem"];

    $contagem = json_decode($json);

    $dados= false;
    $id = "";


    if($conexao){
    
        $dados= true;
            
        $query= "INSERT INTO tb_usuarios (pesquisador,supervisor) VALUES ('".$pesquisador."','".$supervisor."')";        
        $result= mysqli_query($conexao,$query);

        if($result){
            $id = mysqli_insert_id($conexao); 
        }

    }
    
    foreach ($contagem as $value) {

        $date = $value->{"date"};
        $time = $value->{"time"};
        $auto = $value->{'auto'};
        $motos = $value->{'motos'};
        $onibus = $value->{'onibus'};
        $caminhao = $value->{'caminhao'};

        $sql = "INSERT INTO tb_veiculos (auto, motos, onibus, caminhao, date, time, tb_usuarios_id_usuario) VALUES ('$auto', '$motos', '$onibus', '$caminhao', '$date', '$time', '$id')";
        $resultado = mysqli_query($conexao,$sql);

    }

	
    if($resultado){
        $dados = array("id"=>$id, "idDevice"=>$idDevice);
 
        //URL para onde vai ser enviado nosso POST
        $url = "http://ec2-18-211-204-199.compute-1.amazonaws.com/cvc_php/excel_usuario.php";
        
        // Aqui inicio a função CURL
        $curl = curl_init();
        //aqu eu pego a URL para onde será enviado o POST
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_POST, 1);
        //aqui eu pego os dados para enviar via POST
        curl_setopt($curl, CURLOPT_POSTFIELDS, $dados);
        curl_exec($curl);
        curl_close($curl);

        echo '{"sucesso": true}';
        //print_r($contagem);

    }
    else{
        echo'{"sucesso": false}';
    }
    
   

    
        
?>