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
    $data = $_POST;

    var_dump($data);
}


echo json_encode($result);

?>