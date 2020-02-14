<?php

    include("Classes/PHPExcel/IOFactory.php");   

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

    echo $html;    
    
    //salva csv
    // Envia o conteúdo do arquivo
    
	
    $objReader = PHPExcel_IOFactory::createReader('CSV');
    $objReader->setDelimiter(";"); // define que a separação dos dados é feita por ponto e vírgula
    $objReader->setInputEncoding('UTF-8'); // habilita os caracteres latinos.
    $objPHPExcel = $objReader->load('arquivo.csv'); //indica qual o arquivo CSV que será convertido
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
    $objWriter->save('arquivo.xls'); // Resultado da conversão; um arquivo do EXCEL 
	
    exit;

?>