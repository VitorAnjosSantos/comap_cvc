<?php
	header('Access-Control-Allow-Origin: *');
    include("./Classes/PHPExcel/IOFactory.php");   
    //header("Access-Control-Allow-Headers: Content-Type");
    //header('Content-Type: application/json');

    include("./conexao.php");

    
		$sql = 'SELECT * FROM tb_veiculos';				
		$result = mysqli_query($conexao,$sql); 
		$resultadoDaConsulta = $result; 
	
	if ($resultadoDaConsulta) {
			
			// Gera arquivo CSV
		$fp = fopen("planilha.csv", "w +"); // o "a" indica que o arquivo será sobrescrito sempre que esta função for executada.
		$escreve = fwrite($fp, "Data,Hora,Auto,Motos,Onibus,Caminhao");
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
				$escreve = fwrite($fp, "\n$registro[date],$registro[time],$registro[auto],$registro[motos],$registro[onibus],$registro[caminhao]");			  
				
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
		  $dia .= $data. '_'. $hora.".xls";
		  echo $dia;

    
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