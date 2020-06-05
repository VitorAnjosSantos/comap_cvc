<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Content-Type");
    header('Content-Type: application/json');
	include("./Classes/PHPExcel/IOFactory.php");   


    include("./conexao_usuario.php");

	$id = $_POST['id'];
	$fk = $_POST['fk'];
	//$pesquisador = $_POST["pesquisador"];

	$sql = "SELECT * FROM tb_veiculos v 
			JOIN tb_usuarios u
			ON v.tb_usuarios_id_usuario = u.id_usuario
			WHERE u.id_usuario = {$id}";	

	$idDevice = '';

	$result = mysqli_query($conexao,$sql); 
	$resultadoDaConsulta = $result; 

	if ($resultadoDaConsulta) {
		
			// Gera arquivo CSV
		$fp = fopen("planilha.csv", "w +"); // o "a" indica que o arquivo será sobrescrito sempre que esta função for executada.
		$escreve = fwrite($fp, "Pesquisador,Supervisor,Latitude,Longitude,Data,Hora,");
		$data = '';
		$hora = '';
		$date = '';
		$time = '';
		$botao = '';
		$count = 0;
		$count2 = 0;
		$aux = [];
		$totalVertical = 0;
		$totalHorizontal = "\n,,,,,Total,";
		$array = [];
		$auxTotal = [];

		$query = "SELECT * FROM tb_botoes WHERE tb_formularios_id_formulario =  {$fk}";
		$resultQuery = mysqli_query($conexao,$query); 
		$resultadoQuery = $resultQuery; 

		foreach($resultadoQuery as $value) 
			{
				$escreve = fwrite($fp, "$value[nome_relatorio],");
			}

		$escreve = fwrite($fp, "TOTAL,TRANSITO,SIGA E PARE,CHUVA");

		foreach($resultadoDaConsulta as $registro) 
			{ 	
				$contagem = json_decode($registro['contagem'], true);
				$teste = $contagem;			
				
				foreach($teste as $key ) 
				{
					
					unset($key['latitude'],$key['longitude'],$key['date'],$key['time']);

					$latitude = json_encode($contagem[$count]['latitude']);
					$longitude = json_encode($contagem[$count]['longitude']);
					$date = $contagem[$count]['date'];
					$time = $contagem[$count]['time'];

					$escreve = fwrite($fp, "\n $registro[pesquisador],$registro[supervisor],".$latitude.",".$longitude.",".$date.",".$time.",");
					
					$aux = $key;
					unset($key['transito']);	
					unset($key['sigapare']);
					unset($key['chuva']);  

					foreach($key as $k => $v) 
					{

						$totalVertical = array_sum($key);
						$auxTotal[$k] = 0;
							
						$escreve = fwrite($fp, "".$key[$k].",");
						
					}

					$escreve = fwrite($fp, "".$totalVertical.",".$aux['transito'].",".$aux['sigapare'].",".$aux['chuva']);
					echo($totalVertical);
					var_dump($key);

					$array[$count] = $key;

					
					$count++;
				}

				foreach($array as $key) 
					{

						foreach($key as $k => $v) 
						{
							$auxTotal[$k] += $key[$k];
							
								
						}
						
					}

				foreach($auxTotal as $key) 
					{

						$totalHorizontal .= $key.",";
						
					}
				
	
				$dateCorrigida = str_replace("/","-", $date );
				$timeCorrigido = str_replace(":","-", $time );
				
				$data= $dateCorrigida;
				$hora = $timeCorrigido;

				$idDevice = $registro["idDevice"];
			}
			$escreve = fwrite($fp, $totalHorizontal);
			var_dump($auxTotal);
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