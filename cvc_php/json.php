<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include("./conexao_usuario.php");

$sql = "SELECT * FROM tb_botoes";
$result = mysqli_query($conexao,$sql);
$count = 0;
$json= array();
foreach ($result as $key) {
    $json[$count]['id'] = $key['id_botao'];
    $json[$count]['nome_botao'] = $key['nome_botao'];
    $json[$count]['nome_relatorio'] = $key['nome_relatorio'];
    $json[$count]['qtd_eixos'] = $key['qtd_eixos'];
    $json[$count]['qtd_suspensos'] = $key['qtd_suspensos'];
    $json[$count]['seq_tablet'] = $key['seq_tablet'];
    $json[$count]['seq_relatorio'] = $key['seq_relatorio'];
    $json[$count]['cor'] = $key['cor'];
    $json[$count]['tb_formularios_id_formulario'] = $key['tb_formularios_id_formulario'];
    $count++;
}

return print_r(json_encode($json));

