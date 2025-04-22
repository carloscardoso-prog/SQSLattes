<?php

$directory = str_replace($_SERVER['DOCUMENT_ROOT'], '', str_replace('\\', '/', __FILE__));
$directory = str_replace(basename(__FILE__), '', $directory);

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

switch ($param['tipo']) {
    case 'cep':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?p_cep=" . urlencode($param['dado']);
        break;
    case 'endereco':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?FTIPO=END";
        break;
    case 'form':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?FTIPO=FORM&f_nivel=" . $param['nivel'];
        break;
    case 'area':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?f_cod_rh=" . $param['f_cod_rh'];
        break;
    case 'curso':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?f_cod=" . $param['f_cod'] . "&f_pgm=" . $param['f_pgm'] . "&f_nivel=" . $param['f_nivel'] . "&f_inst=" . $param['f_inst'] . "&f_ciencia=";
        break;
    case 'cadastro_curso':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?f_cod=" . $param['f_cod'] . "&f_pgm=" . $param['f_pgm'] . "&f_nivel=" . $param['f_nivel'] . "&f_inst=" . $param['f_inst'] . "&f_sta_area=" . $param['f_sta_area'];
        break;
    case 'tipo_cadastro_curso':
        parse_str($param['dados'], $param['dados']);
        $param = array_merge($param, $param['dados']);
        unset($param['dados']);
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?F_COD_RH=" . $param['F_COD_RH'] . "&F_GR=" . $param['F_GR'];
        $urlGet = isset($param['F_AR'])? $urlGet . '&F_AR=' . $param['F_AR'] : $urlGet;
        $urlGet = isset($param['F_SB'])? $urlGet . '&F_SB=' . $param['F_SB'] : $urlGet;
        break;
    case 'instituicao':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?f_cod=E5537246Y&FTIPO=END&FCTR=C&fnomeinst=" . $param['dado'];
        break;
    case 'cadastro_instituicao':
        $urlGet = "https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr." . $param['url_action'] . "?f_cod=E5537246Y&FTIPO=END";
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
// if (!isset($context)) {
//     $response = mb_convert_encoding(file_get_contents($urlGet), 'UTF-8', 'ISO-8859-1');
// } else {
//     $response = mb_convert_encoding(file_get_contents($urlGet, false, $context), 'UTF-8', 'ISO-8859-1');
// }

$response = tentarRequest($urlGet, $context ?? null); 

if($response === false) {
    echo json_encode([
        'erro' => true,
        'mensagem' => 'Esse erro não deveria ocorrer, se ocorrer, o site inteiro quebrou',
        'detalhes' => 'Timeout na solicitação',
        'status_http' => 0
    ]);
    exit;
}

$response = strpos($response, "/images/estatico") !== false ? str_replace('/images/estatico', $directory . 'assets', $response) : $response;
$response = strpos($response, "/assets/imagens/") !== false ? str_replace('/assets/imagens/', '/assets/files/', $response) : $response;

echo $response;

function tentarRequest($url, $context = null, $timeout = 60){
    $start = time();
    $response = false;

    while((time() - $start) < $timeout){
        if($context){
            $response = @file_get_contents($url, false, $context);
        } else {
            $response = @file_get_contents($url);
        }

        if($response !== false){
            return mb_convert_encoding($response, 'UTF-8', 'ISO-8859-1');
        }

        sleep(1);
    }

    return false;
}