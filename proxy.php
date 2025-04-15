<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

extract($_POST);
if (!isset($param)) {
    extract($_GET);

    if (empty($param)) {
        return false;
    }
    $param = json_decode($param, true);
}

// echo '<pre>';
// print_r($param);
// die;

switch ($param['tipo']) {
    case 'cep':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?p_cep=" . urlencode($param['dado']);
        break;
    case 'endereco':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?FTIPO=END";
        break;
    case 'form':
        echo '<pre>';
        print_r($param);
        die;
        break;
    case 'instituicao':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?FTIPO=END&FCTR=C&fnomeinst=" . $param['dado'];
        break;
    default:
        return false;
}

$response = mb_convert_encoding(file_get_contents($urlGet), 'UTF-8', 'ISO-8859-1');

echo $response;
