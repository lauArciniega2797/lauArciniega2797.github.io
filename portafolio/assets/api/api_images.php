<?php
if(isset($_FILES['image'])){
    $carpeta_imagenes = '../img/admin/';
    $nombre_img = $_FILES['image']['name'];
    $temp_img = $_FILES['image']['tmp_name'];
    $nombre_user = str_replace(' ', '_', $_POST['name_user']);
    $extension = '.' . explode('.', $nombre_img)[1];

    $name_foto_usuario = 'img_'.$nombre_user.$extension;

    // var_dump('after conditional');
    if(move_uploaded_file($temp_img, $carpeta_imagenes.$name_foto_usuario)){
        echo json_encode(array('error' => false, 'name_img' => $name_foto_usuario));
        // var_dump('true conditional');
    } else {
        echo json_encode(array('error' => true));
        // var_dump('false conditional');
    }

}

?>