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

	$arquivo = 'contagem.xlsx';
		
	// Criamos uma tabela HTML com o formato da planilha
	$html = '';
	$html .= '<table border="1">';
	$html .= '<tr>';
	$html .= '<td colspan="6">Contagem</tr>';
	$html .= '</tr>';
	
	
	$html .= '<tr>';
	$html .= '<td><b>ID</b></td>';
	$html .= '<td><b>auto</b></td>';
	$html .= '<td><bmotos/b></td>';
	$html .= '<td><b>onibus</b></td>';
	$html .= '<td><b>caminhao</b></td>';
	$html .= '</tr>';

    if($result){
		echo "{sucesso: true}";

			$html .= '<tr>';
			$html .= '<td>'.$auto.'</td>';
			$html .= '<td>'.$motos.'</td>';
			$html .= '<td>'.$onibus.'</td>';
            $html .= '<td>'.$caminhao.'</td>';
            $html .= '<td>'.$data_hora.'</td>';
			$html .= '</tr>';
			
    }
    else{
        echo"{sucesso: false}";
    }
        
        header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
		header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
		header ("Cache-Control: no-cache, must-revalidate");
		header ("Pragma: no-cache");
		header ("Content-type: application/x-msexcel");
		header ("Content-Disposition: attachment; filename=\"{$arquivo}\"" );
		header ("Content-Description: PHP Generated Data" );
		// Envia o conteúdo do arquivo
		echo $html;
        exit;
        
?>