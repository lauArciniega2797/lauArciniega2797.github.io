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

    $consulta = $conn->query("SELECT * FROM usuarios WHERE username = '" . $data['user'] . "' AND password = '" . $data['pass'] . "'");

    if($consulta) {
        if($consulta->rowCount() > 0){
            $result['login'] = true;
            $datos = array();
            while($fila = $consulta->fetch(PDO::FETCH_ASSOC)){
                array_push($datos, $fila);
            }
            $_SESSION['user_info'] = $datos;
        } else {
            $result['login'] = false;
        }
    } else {
        $result['error'] = false;
    }
}
$conn = null;
echo json_encode($result);
die();
?>