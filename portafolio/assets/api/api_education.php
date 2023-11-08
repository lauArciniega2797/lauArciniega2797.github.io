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
        $sql = "INSERT INTO academic_data(institucion, carrera, p_inicio, p_fin, curriculum, pagina_oficial, ult_actualizacion) 
        VALUES(
            '". $data['institucion'] ."',
            '". $data['carrera'] ."',
            '". $data['p_inicio'] ."',
            '". $data['p_fin'] ."',
            '". $data['curriculum'] ."',
            '". $data['pagina_oficial'] ."',
            NOW()
        )";
    }
    else if ($opc == 'u') {
        $sql = "UPDATE academic_data SET 
            institucion = '".$data['institucion']."', 
            carrera = '".$data['carrera']."',
            p_inicio = '".$data['p_inicio']."', 
            p_fin = '".$data['p_fin']."', 
            curriculum = '".$data['curriculum']."', 
            pagina_oficial = '".$data['pagina_oficial']."',
            ult_actualizacion = NOW()
            WHERE id = '" . $data['id'] . "'";
    } 
    else if ($opc == 'c'){ 
        $curriculum = $data['curriculum'] == 0 ? 1 : 0; 
        $sql = "UPDATE academic_data SET 
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
    if(isset($_GET['escuela'])){
        $sql = "SELECT * FROM academic_data WHERE id = '" . $_GET['escuela'] . "'";
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

if($action == 'getAcademicData') {
    $datos = array();
    $consulta = $conn->query("SELECT * FROM academic_data");

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