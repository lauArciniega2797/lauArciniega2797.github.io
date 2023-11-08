<?php
    try {
        $conn = new PDO('mysql:host=localhost;dbname=laura_jobs;charset=utf8', 'root', '');
        // $conn = new PDO('mysql:host=sql.freedb.tech;dbname=freedb_laura_jobs;charset=utf8', 'freedb_laura', 'wQ8#Kx6pZCcxMXk');
    } catch (PDOException $e) {
        echo "No se pudo conectar a la base de datos: " . $e;
    }
?>