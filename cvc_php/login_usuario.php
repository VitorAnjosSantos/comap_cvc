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
$json = ['posto'=> [],'sentido'=> [],'rodovia'=> [],'km'=> [],'idPosto'=> [],  'id_formulario'=> []/* , 'id_botao'=> [],'nome_botao'=> [],'nome_relatorio'=> [], 'qtd_eixos'=> [], 'qtd_suspensos'=> [], 'seq_tablet'=> [], 'seq_relatorio'=> [], 'cor'=> [], 'tb_formularios_id_formulario'=> [] */];
$count = 0;

if($row > 0 ){
    foreach($result as $value) 
			{
                $id = $value['tb_config_projetos_id_config'];
				
			}

    $sql = "SELECT * FROM tb_config_projeto v 
                JOIN tb_projetos u ON v.tb_projetos_id_projeto = u.id_projeto
                JOIN tb_tablets t ON v.id_config_projeto = t.tb_config_projetos_id_config
                WHERE t.tb_config_projetos_id_config = {$id}";

    $resultSql = mysqli_query($conexao,$sql);

    foreach($resultSql as $value) 
			{
                $json['idPosto'][0] = $value['id_config_projeto'];
                $json['posto'][] .= $value['posto'];
                $json['sentido'][0] = $value['sentido'];
                $json['rodovia'][] .= $value['rodovia'];
                $json['km'][] .= $value['km'];
                $json['id_formulario'][] .= $value['tb_formularios_id_formulario'];
                
                /* $json['id_botao'][] .= $value['id_botao'];
                $json['nome_botao'][] .= $value['nome_botao'];
                $json['nome_relatorio'][] .= $value['nome_relatorio'];
                $json['qtd_eixos'][] .= $value['qtd_eixos'];
                $json['qtd_suspensos'][] .= $value['qtd_suspensos'];
                $json['seq_tablet'][] .= $value['seq_tablet'];
                $json['seq_relatorio'][] .= $value['seq_relatorio'];
                $json['cor'][] .= $value['cor'];
                $json['tb_formularios_id_formulario'] .= $value['tb_formularios_id_formulario']; */
			}

    $posto['posto'] = array_unique($json['posto']);
    $sentido['sentido'] = array_unique($json['sentido']);
    $rodovia['rodovia'] = array_unique($json['rodovia']);
    $km['km'] = array_unique($json['km']);
    $fk['id'] = $id;
    $idPosto['idPosto'] = array_unique($json['idPosto']);
    $idFormulario['id_formulario'] = $json['id_formulario'][0];

    $array = array_merge($posto,$sentido,$rodovia,$km,$fk,$idPosto,$idFormulario);

    echo json_encode($array);
    
}
else{
    echo json_encode("Erro");

}
    


?>