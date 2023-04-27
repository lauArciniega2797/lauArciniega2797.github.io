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

if($action == 'login') {
    $data = json_decode(file_get_contents('php://input'), true);

    $consulta = $conn->query("SELECT nombre, apellido, username, email FROM usuarios WHERE username = '" . $data['user'] . "' AND password = '" . $data['pass'] . "'");

    if($consulta) {
        if($consulta->rowCount() > 0){
            $result['login'] = true;
            $datos = array();
            while($fila = $consulta->fetch(PDO::FETCH_ASSOC)){
                array_push($datos, $fila);
            }
            $result['datos'] = $datos;
            $_SESSION['user_info'] = true;
        } else {
            $result['login'] = false;
        }
    } else {
        $result['error'] = false;
    }
}

if($action == 'estado') {
    $datos = array();
    $consulta = $conn->query("SELECT estado FROM estados_municipios GROUP BY estado");

    if($consulta) {
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