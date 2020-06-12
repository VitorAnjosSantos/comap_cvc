<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');
include('./conexao_usuario.php');

$tablet = $_POST["tablet"];
$senha = $_POST["senha"];

$query = "SELECT * FROM tb_tablets WHERE tablet = '{$tablet}' AND senha = md5('{$senha}')";

$result = mysqli_query($conexao,$query);
$id = 0;
$row = mysqli_num_rows($result);
/* $dados_usuario = mysqli_fetch_assoc($result);
$_SESSION["id"] = $dados_usuario['id_usuario']; */
$json = ['posto'=> [],'sentido'=> [],'rodovia'=> [],'km'=> [],'idPosto'=> []];
$count = 0;

if($row > 0 ){
    foreach($result as $value) 
			{
                $id = $value['tb_projetos_id_projeto'];
				
			}

    $sql = "SELECT * FROM tb_config_projeto v 
                JOIN tb_projetos u ON v.tb_projetos_id_projeto = u.id_projeto
                JOIN tb_tablets t ON v.tb_projetos_id_projeto = t.tb_projetos_id_projeto
                WHERE t.tb_projetos_id_projeto = {$id}";

    $resultSql = mysqli_query($conexao,$sql);

    foreach($resultSql as $value) 
			{
                $json['idPosto'][] .= $value['id_config_projeto'];
                $json['posto'][] .= $value['posto'];
                $json['sentido'][] .= $value['sentido'];
                $json['rodovia'][] .= $value['rodovia'];
                $json['km'][] .= $value['km'];
			}

    $posto['posto'] = array_unique($json['posto']);
    $sentido['sentido'] = array_unique($json['sentido']);
    $rodovia['rodovia'] = array_unique($json['rodovia']);
    $km['km'] = array_unique($json['km']);
    $fk['id'] = $id;
    $idPosto['idPosto'] = $json['idPosto'];

    $array = array_merge($posto,$sentido,$rodovia,$km,$fk,$idPosto);

    echo json_encode($array);
    
}
else{
    echo json_encode("Erro");

}
    


?>