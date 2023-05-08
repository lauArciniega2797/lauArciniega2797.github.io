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

    $consulta = $conn->query("SELECT nombre, apellidos, username, email FROM usuarios WHERE username = '" . $data['user'] . "' AND password = '" . $data['pass'] . "'");

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
            array_push($datos, $fila['estado']);
        }

        $result['datos'] = $datos;
    } else {
        $result['error'] = true;
    }
}

if($action == 'cps') {
    $datos = array();
    if(isset($_GET['estado'])) {
        $estado = str_replace("%20", " ", $_GET['estado']);;
        // $estado = ($_GET['estado']);

        $consulta = $conn->query("SELECT codigo_postal FROM estados_municipios WHERE estado = '$estado' GROUP BY codigo_postal");
        if($consulta) {
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                array_push($datos, $fila['codigo_postal']);
            }

            $result['datos'] = $datos;
        } else {
            $result['error'] = true;
        }
    }
}

if($action == 'municipios') {
    $datos = array();
    if(isset($_GET['estado']) and isset($_GET['cp'])) {
        $estado = str_replace("%20", " ", $_GET['estado']);
        $cp = str_replace("%20", " ", $_GET['cp']);

        $consulta = $conn->query("SELECT municipio FROM estados_municipios WHERE estado = '$estado' and codigo_postal = $cp GROUP BY municipio");
        if($consulta) {
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                array_push($datos, $fila['municipio']);
            }

            $result['datos'] = $datos;
        } else {
            $result['error'] = true;
        }
    }
}

if($action == 'colonias') {
    $datos = array();
    if(isset($_GET['estado']) and isset($_GET['cp'])) {
        $estado = str_replace("%20", " ", $_GET['estado']);
        $cp = $_GET['cp'];
        $municipio = str_replace("%20", " ", $_GET['municipio']);

        $result['sql'] = "SELECT colonia FROM estados_municipios WHERE estado = '$estado' and codigo_postal = $cp and municipio = '$municipio'";
        $consulta = $conn->query("SELECT colonia FROM estados_municipios WHERE estado = '$estado' and codigo_postal = $cp and municipio = '$municipio'");
        if($consulta) {
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                array_push($datos, $fila['colonia']);
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