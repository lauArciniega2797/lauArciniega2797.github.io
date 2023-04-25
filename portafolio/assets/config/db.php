<?php
    try {
        // $conn = new PDO('mysql:host=localhost;dbname=laura_jobs;charset=utf8', 'root', '');
        $conn = new PDO('mysql:host=sql9.freemysqlhosting.net;dbname=sql9614248;charset=utf8', 'sql9614248', 'aINJ1KAzyJ');
    } catch (PDOException $e) {
        echo "No se pudo conectar a la base de datos: " . $e;
    }
?>