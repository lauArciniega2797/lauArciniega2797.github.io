<?php
session_start();
header('Content-Type: application/json');
header('Accept: application/json');
header('Cache-Control: no-cache');
include('../config/db.php');

$result = array("error" => false);

if(isset($_GET['action'])) {
    $action = $_GET['action'];
}

if($action == 'register') {
    if(isset($_GET['opc'])){
        $opc = $_GET['opc'];
    }
    $data = json_decode(file_get_contents('php://input'), true);

    if($opc == 'i'){
        $sql = "INSERT INTO jobs(nombre_comercial, calle, colonia, municipio, estado, no_ext, no_int, codigo_postal, 
        nombre_jefe, referencia, tel_referencia, tel_empresa, motivo_salida, puesto, descr, 
        p_inicio, p_fin, curriculum, ult_actualizacion) 
        VALUES(
            '". $data['nombre_comercial'] ."',
            '". $data['calle']."',
            '". $data['colonia']."',
            '". $data['municipio']."',
            '". $data['estado']."',
            '".  $data['no_ext']."',
            '".  $data['no_int']."',
            ".  $data['codigo_postal'].",
            '". $data['nombre_jefe'] ."',
            '". $data['referencia'] ."',
            '". $data['tel_referencia'] ."',
            '". $data['tel_empresa'] ."',
            '". $data['motivo_salida'] ."',
            '". $data['puesto'] ."',
            '". $data['descr'] ."',
            '". $data['p_inicio'] ."',
            '". $data['p_fin'] ."',
            '". $data['curriculum'] ."',
            NOW()
        )";
    }
    else if ($opc == 'u') {
        $sql = "UPDATE jobs SET 
            nombre_comercial = '". $data['nombre_comercial'] ."',
            calle = '". $data['calle']."',
            colonia = '". $data['colonia']."',
            municipio = '". $data['municipio']."',
            estado = '". $data['estado']."',
            no_ext = ".  $data['no_ext'].",
            no_int = ".  $data['no_int'].",
            codigo_postal = ".  $data['codigo_postal'].",
            nombre_jefe = '". $data['nombre_jefe'] ."',
            referencia = '". $data['referencia'] ."',
            tel_referencia = '". $data['tel_referencia'] ."',
            tel_empresa = '". $data['tel_empresa'] ."',
            motivo_salida = '". $data['motivo_salida'] ."',
            puesto = '". $data['puesto'] ."',
            descr = '". $data['descr'] ."',
            p_inicio = '". $data['p_inicio'] ."',
            p_fin = '". $data['p_fin'] ."',
            curriculum = '". $data['curriculum'] ."',
            ult_actualizacion = NOW()
            WHERE id = '" . $data['id'] . "'";
    } 
    else if ($opc == 'c'){ 
        $curriculum = $data['curriculum'] == 0 ? 1 : 0; 
        $sql = "UPDATE jobs SET 
            curriculum = '$curriculum'
            WHERE id = '" . $data['id'] . "'";
    }

    // var_dump($sql);

    if(!$consulta = $conn->query($sql)) {
        $result['error'] = true;
    }
}

if($action == 'editRegister') {
    $datos = array();
    if(isset($_GET['trabajo'])){
        $sql = "SELECT * FROM jobs WHERE id = '" . $_GET['trabajo'] . "'";
        $consulta = $conn->query($sql);

        if($consulta) {
            while($fila = $consulta->fetch(PDO::FETCH_ASSOC)){
                array_push($datos, $fila);
            }
            $result['datos'] = $datos;
        } else {
            $result['error'] = true;
        }
    }
}

if ($action == 'getJobsData') {
    $datos = array();
    $consulta = $conn->query("SELECT * FROM jobs");

    if($consulta){
        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            array_push($datos, $fila);
        }

        $result['datos'] = $datos;
    } else {
        $result['error'] = true;
    }
}

$conn = null;
echo json_encode($result);
die();
?>