<?php
	header('Access-Control-Allow-Origin: *');
    include("./Classes/PHPExcel/IOFactory.php");   
    //header("Access-Control-Allow-Headers: Content-Type");
    //header('Content-Type: application/json');

    include("./conexao_usuario.php");

	$id = $_POST['id'];
	//$pesquisador = $_POST["pesquisador"];

	$sql = "SELECT * FROM tb_veiculos v 
			JOIN tb_usuarios u
			ON v.tb_usuarios_id_usuario = u.id_usuario
			WHERE u.id_usuario = {$id}";	

	$idDevice = "SELECT idDevice FROM tb_usuarios WHERE id_usuario = {$id}";

	$result = mysqli_query($conexao,$sql); 
	$resultadoDaConsulta = $result; 
	
	if ($resultadoDaConsulta) {
			
			// Gera arquivo CSV
		$fp = fopen("planilha.csv", "w +"); // o "a" indica que o arquivo será sobrescrito sempre que esta função for executada.
		$escreve = fwrite($fp, "Pesquisador,Supervisor,Data,Hora,Auto,Motos,Onibus,Caminhao,Transito,Siga e Pare,Chuva ");
		$data = "";
		$hora = "";
		$date = '';
		$time = '';

		foreach($resultadoDaConsulta as $registro) 
			{ 		  			
				$escreve = fwrite($fp, "\n $registro[pesquisador],$registro[supervisor],$registro[date],$registro[time],$registro[auto],$registro[motos],$registro[onibus],$registro[caminhao],$registro[transito],$registro[sigapare],$registro[chuva]");			  
				
				$date = $registro["date"];
				$time = $registro["time"];

				$dateCorrigida = str_replace("/","-", $date );
				$timeCorrigido = str_replace(":","-", $time );

				$data= $dateCorrigida;
				$hora = $timeCorrigido;
			}
		
		// Exibe o vettor JSON
		
		fclose($fp);

		// $date = substr($StringJson, 2 , 10);
		 $dia= "D:".DIRECTORY_SEPARATOR;
		// $horas= substr($StringJson, 16 , 8);
		  $dia .= $data. '_'.$hora.'_'.$idDevice.".xls";
		  

    
    //salva csv
    // Envia o conteúdo do arquivo   
		
		$objReader = new PHPExcel_Reader_CSV();
		$objPHPExcel = $objReader->load('planilha.csv'); //indica qual o arquivo CSV que será convertido
		$objReader->setDelimiter(";"); // define que a separação dos dados é feita por ponto e vírgula
		$objReader->setInputEncoding('UTF-8'); // habilita os caracteres latinos.
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
		
		$objWriter->save($dia); // Resultado da conversão; um arquivo do EXCEL 
		
	}

?>