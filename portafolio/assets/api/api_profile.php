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
    $result['datos_recibo'] = $data;

    if($opc == 'i'){
        $sql = "INSERT INTO usuarios(nombre, apellidos, calle, colonia, municipio, estado, no_ext, no_int, codigo_postal, descr, email, image, telefono, celular, profesion, github, linkedin, objetivo_profesional, portafolio_url, username, password, alta, ult_actualizacion) 
        VALUES(
            '".$data['nombre']."',
            '".$data['apellidos']."',
            '".$data['calle']."',
            '".$data['colonia']."',
            '".$data['municipio']."',
            '".$data['estado']."',
            ".$data['no_ext'].",
            ".$data['no_int'].",
            ".$data['codigo_postal'].",
            '".$data['descr']."',
            '".$data['email']."',
            '".$data['image_name']."',
            '".$data['telefono']."',
            '".$data['celular']."',
            '".$data['profesion']."',
            '".$data['github']."',
            '".$data['linkedin']."',
            '".$data['objetivo_profesional']."',
            '".$data['portafolio_url']."',
            '".$data['username']."',
            '".$data['password']."',
            NOW(),
            NOW()
        )";
    }
    else if ($opc == 'u') {
        $image = $data['image_name'] <> '' ? "image = '".$data['image_name']."'," : '';
        $sql = "UPDATE usuarios SET 
                nombre = '".$data['nombre']."', 
                apellidos = '".$data['apellidos']."',
                calle = '".$data['calle']."', 
                colonia = '".$data['colonia']."', 
                municipio = '".$data['municipio']."', 
                estado = '".$data['estado']."', 
                no_ext = ".$data['no_ext'].", 
                no_int = ".$data['no_int'].", 
                codigo_postal = ".$data['codigo_postal'].", 
                descr = '".$data['descr']."', 
                email = '".$data['email']."', 
                $image 
                telefono = '".$data['telefono']."', 
                celular = '".$data['celular']."', 
                profesion = '".$data['profesion']."', 
                github = '".$data['github']."', 
                linkedin = '".$data['linkedin']."', 
                objetivo_profesional = '".$data['objetivo_profesional']."', 
                portafolio_url = '".$data['portafolio_url']."', 
                username = '".$data['username']."', 
                password = '".$data['password']."', 
                ult_actualizacion = NOW() 
                WHERE username = '" . $data['currentUser'] . "'";
    }

    if(!$consulta = $conn->query($sql)) {
        $result['error'] = true;
    }
}

if($action == 'editRegister') {
    $datos = array();
    if(isset($_GET['user'])){
        $sql = "SELECT * FROM usuarios WHERE username = '" . $_GET['user'] . "'";
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

$conn = null;
echo json_encode($result);
die();
?>