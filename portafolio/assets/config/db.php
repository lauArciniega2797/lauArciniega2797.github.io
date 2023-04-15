<?php
    try {
        $conn = new PDO('mysql:host=localhost;dbname=laura_jobs;charset=utf8', 'root', '');
    } catch (PDOException $e) {
        echo "No se pudo conectar a la base de datos: " . $e;
    }
?>