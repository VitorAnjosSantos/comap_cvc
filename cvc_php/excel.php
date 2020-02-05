<?php

    header('Access-Control-Allow-Origin: *');
    //header("Access-Control-Allow-Headers: Content-Type");
    //header('Content-Type: application/json');

    include("conexao.php");

    $select = "SELECT * FROM tb_veiculo";

	$resultadoSelect = mysqli_query($conexao,$select);

	$arquivo = 'contagem.xls';
		
	// Criamos uma tabela HTML com o formato da planilha
	$html = '';
	$html .= '<table border="1">';
	$html .= '<tr>';
	$html .= '<td colspan="6">Contagem</tr>';
	$html .= '</tr>';
	
	
	$html .= '<tr>';
	$html .= '<td><b>ID</b></td>';
	$html .= '<td><b>auto</b></td>';
	$html .= '<td><b>motos</b></td>';
	$html .= '<td><b>onibus</b></td>';
	$html .= '<td><b>caminhao</b></td>';
	$html .= '</tr>';

    
	
	while($rowSelect = mysqli_fetch_assoc($resultadoSelect)){

		$html .= '<tr>';
		$html .= '<td>'.$$rowSelect["id"].'</td>';
		$html .= '<td>'.$$rowSelect["auto"].'</td>';
		$html .= '<td>'.$$rowSelect["motos"].'</td>';
		$html .= '<td>'.$$rowSelect["onibus"].'</td>';
		$html .= '<td>'.$$rowSelect["caminhao"].'</td>';
		$html .= '</tr>';
		
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