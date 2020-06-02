<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Content-Type");
    header('Content-Type: application/json; charset=utf-8');
    include("./conexao_usuario.php");

    $idDevice = $_POST["idDevice"];
    $pesquisador = $_POST["pesquisador"];
    $supervisor = $_POST["supervisor"];
    $json = $_POST["contagem"];
    $fk = $_POST["fk"];
    $contagem = json_decode($json,true);

    $dados= false;
    $id = "";

    if($conexao){

        $dados= true;
            
        $query= "INSERT INTO tb_usuarios (pesquisador,supervisor,idDevice) VALUES ('{$pesquisador}','{$supervisor}','{$idDevice}')";        
        $result= mysqli_query($conexao,$query);

        if($result){
            $id = mysqli_insert_id($conexao); 
        }

    }

    $aux = json_encode($contagem);
    $sql = "INSERT INTO tb_veiculos (contagem,tb_usuarios_id_usuario,tb_formularios_id_formulario) 
            VALUES ('{$aux}', '{$id}', '{$fk}')";
    $resultado = mysqli_query($conexao,$sql);

    if($resultado){
        $dados = array("id"=>$id,"fk"=>$fk);
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
        //print_r($contagem);

    }
   
        
    
    

?>