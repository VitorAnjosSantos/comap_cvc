<!--**
 * @author Cesar Szpak - Celke -   cesar@celke.com.br
 * @pagina desenvolvida usando framework bootstrap,
 * o código é aberto e o uso é free,
 * porém lembre -se de conceder os créditos ao desenvolvedor.
 *-->
 <?php
	include_once('./conexao.php');
	include("./Classes/PHPExcel/IOFactory.php");   
?>
<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta charset="utf-8">
		<title>Contato</title>
	<head>
	<body>
		<?php
		// Definimos o nome do arquivo que será exportado		
		// Criamos uma tabela HTML com o formato da planilha
		$html = '';
		$html .= '<table border="1">';		
		$html .= '<tr>';
		$html .= '<td><b>Data</b></td>';
		$html .= '<td><b>Hora</b></td>';
		$html .= '<td><b>Auto</b></td>';
		$html .= '<td><b>Motos</b></td>';
		$html .= '<td><b>Onibus</b></td>';
		$html .= '<td><b>Caminha</b></td>';
		$html .= '</tr>';
		
		//Selecionar todos os itens da tabela 
		$result_msg_contatos = "SELECT * FROM tb_veiculos";
		$resultado_msg_contatos = mysqli_query($conexao , $result_msg_contatos);
		$data = "";
		
		while($row_msg_contatos = mysqli_fetch_assoc($resultado_msg_contatos)){
			$html .= '<tr>';
			$html .= '<td>'.$row_msg_contatos["date"].'</td>';
			$html .= '<td>'.$row_msg_contatos["time"].'</td>';
			$html .= '<td>'.$row_msg_contatos["auto"].'</td>';
			$html .= '<td>'.$row_msg_contatos["motos"].'</td>';
			$html .= '<td>'.$row_msg_contatos["onibus"].'</td>';
			$html .= '<td>'.$row_msg_contatos["caminhao"].'</td>';
			$html .= '</tr>';

			$data = $row_msg_contatos["date"];
			$hora = $row_msg_contatos["time"];
		}

		
		// $dia= "D:".DIRECTORY_SEPARATOR.$date;
		// $horas= $row_msg_contatos["time"];
		// echo $data= $dia. '_'. $horas.".xls";
		$data.="_". $hora.".xls";
		$dia= "D:".DIRECTORY_SEPARATOR.$data;

		// Configurações header para forçar o download
		header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
		header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
		header ("Cache-Control: no-cache, must-revalidate");
		header ("Pragma: no-cache");
		header ("Content-type: application/x-msexcel");
		header ("Content-Disposition: attachment; filename=\"{$data}\"" );
		header ("Content-Description: PHP Generated Data" );

		
		$objReader = new PHPExcel_Reader_CSV();
		$objPHPExcel = $objReader->load('teste.csv'); //indica qual o arquivo CSV que será convertido
		$objReader->setDelimiter(";"); // define que a separação dos dados é feita por ponto e vírgula
		$objReader->setInputEncoding('UTF-8'); // habilita os caracteres latinos.
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
		$objWriter->save($dia); // Resultado da conversão; um arquivo do EXCEL 
		// Envia o conteúdo do arquivo
		echo $html;
		exit; ?>
	</body>
</html>