<?php

    include("./Classes/PHPExcel/IOFactory.php");   

    header('Access-Control-Allow-Origin: *');
    //header("Access-Control-Allow-Headers: Content-Type");
    //header('Content-Type: application/json');

    include("conexao.php");

    $conecta = new PDO("mysql:host=ec2-18-211-204-199.compute-1.amazonaws.com;dbname=comap_cvc", "Vitor" , "Cp052739");
		$conecta->exec("set names utf8"); // Permite caracteres latinos.
		$consulta = $conecta->prepare('SELECT * FROM tb_veiculos');				
        $consulta->execute(array());  
		$resultadoDaConsulta = $consulta->fetchAll();

	$StringJson = "["; 
	
	if ( count($resultadoDaConsulta) ) {
			
			// Gera arquivo CSV
		$fp = fopen("teste.csv", "w +"); // o "a" indica que o arquivo será sobrescrito sempre que esta função for executada.
		$escreve = fwrite($fp, "Data,Hora,Auto,Motos,Onibus,Caminhao");


		foreach($resultadoDaConsulta as $registro) 
			{ 		  			
				$escreve = fwrite($fp, "\n$registro[date],$registro[time],$registro[auto],$registro[motos],$registro[onibus],$registro[caminhao]");			  
				if ($StringJson != "[") {$StringJson .= ",";}
				$StringJson .= '"' . $registro['date'] . '",';
				$StringJson .= '"' . $registro['time'] . '",';
				$StringJson .= '"' . $registro['auto'] . '",';
				$StringJson .= '"' . $registro['motos'] . '",';	
			 	$StringJson .= '"' . $registro['onibus'] . '",';	
				$StringJson .= '"' . $registro['caminhao'] . '"}';
		      }
		
		echo $StringJson . "]"; // Exibe o vettor JSON
		
		fclose($fp);

		$date = substr($StringJson, 2 , 10);
		$dia= "D:".DIRECTORY_SEPARATOR.$date;
		$horas= substr($StringJson, 16 , 8);
		echo $data= $dia. '_'. $horas.".xls";
		

    
    //salva csv
    // Envia o conteúdo do arquivo
    
		
		$objReader = new PHPExcel_Reader_CSV();
		$objPHPExcel = $objReader->load('teste.csv'); //indica qual o arquivo CSV que será convertido
		$objReader->setDelimiter(";"); // define que a separação dos dados é feita por ponto e vírgula
		$objReader->setInputEncoding('UTF-8'); // habilita os caracteres latinos.
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
		$objWriter->save($data); // Resultado da conversão; um arquivo do EXCEL 
		
	}

?>