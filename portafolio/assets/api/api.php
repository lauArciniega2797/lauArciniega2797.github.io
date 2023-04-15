<?php

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