<?php

$directory = str_replace($_SERVER['DOCUMENT_ROOT'], '', str_replace('\\', '/', __FILE__));
$directory = str_replace(basename(__FILE__), '', $directory);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// echo '<pre>';
// print_r($_POST);
// print_r($_GET);
// die;
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
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?FTIPO=FORM&f_nivel=" . $param['nivel'];
        // echo '<pre>';
        // print_r($param);
        // die;
        break;
    case 'instituicao':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?FTIPO=END&FCTR=C&fnomeinst=" . $param['dado'];
        break;
    case 'cadastro_instituicao':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?FTIPO=END";
        break;
    case 'finalizar_cadastro_instituicao':
        $postData = http_build_query($param['dado']);
        $opts = [
            'http' => [
                'method' => 'POST',
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'content' => $postData
            ]
        ];

        $context = stream_context_create($opts);

        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'];
        break;
    default:
        return false;
}
if(!isset($context)){
    $response = mb_convert_encoding(file_get_contents($urlGet), 'UTF-8', 'ISO-8859-1');
} else {
    $response = mb_convert_encoding(file_get_contents($urlGet, false, $context), 'UTF-8', 'ISO-8859-1');
}

$response = strpos($response, "/images/estatico") !== false? str_replace('/images/estatico', $directory . 'assets', $response) : $response;

echo $response;
