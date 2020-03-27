<?php
	header('Access-Control-Allow-Origin: *');
    include("./Classes/PHPExcel/IOFactory.php");   
    //header("Access-Control-Allow-Headers: Content-Type");
    //header('Content-Type: application/json');

    include("./conexao_usuario.php");

	$id = $_POST['id'];
	$posto = $_POST["posto"];
	//$pesquisador = $_POST["pesquisador"];

	$sql = "SELECT pesquisador, supervisor, auto, motos, onibus, caminhao, date, time FROM tb_veiculos v 
			JOIN tb_usuarios u
			ON v.tb_usuarios_id_usuario = u.id_usuario
			WHERE u.id_usuario = {$id}";	

	$idDevice = "SELECT idDevice FROM tb_usuarios WHERE id_usuario = {$id}";

	$result = mysqli_query($conexao,$sql); 
	$resultadoDaConsulta = $result; 
	
	if ($resultadoDaConsulta) {
			
			// Gera arquivo CSV
		$fp = fopen("planilha.csv", "w +"); // o "a" indica que o arquivo será sobrescrito sempre que esta função for executada.
		$escreve = fwrite($fp, "Pesquisador,Supervisor,Data,Hora,Auto,Motos,Onibus,Caminhao");
		$pesquisador = "";
		$supervisor = "";
		$data = "";
		$hora = "";
		$date = '';
		$time = '';
		$auto = '';
		$motos = '';
		$onibus = '';
		$caminhao = '';

		foreach($resultadoDaConsulta as $registro) 
			{ 		  			
				$escreve = fwrite($fp, "\n $registro[pesquisador],$registro[supervisor],$registro[date],$registro[time],$registro[auto],$registro[motos],$registro[onibus],$registro[caminhao]");			  
				
				$pesquisador = $registro["pesquisador"];
				$supervisor = $registro["supervisor"];
				$date = $registro["date"];
				$time = $registro["time"];
				$auto = $registro['auto'];
				$motos = $registro['motos'];
				$onibus = $registro['onibus'];
				$caminhao = $registro['caminhao'];
				
				'"' . $date . '",';
				'"' . $time . '",';
				'"' . $auto . '",';
				'"' . $motos . '",';	
			 	'"' . $onibus . '",';	
				'"' . $caminhao . '"';

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
		  $dia .= $posto. '_'.$data. '_'.$hora.'_'.$idDevice.".xls";
		  

    
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