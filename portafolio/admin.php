<?php 
session_start();
$logued = false;
if(isset($_SESSION['user_info'])){
    // var_dump($_SESSION['user_info']);
    // var_dump($_SESSION['user_info'][0]['username']);
    // var_dump($_SESSION['user_info'][0]['nombre']);
    // var_dump($_SESSION['user_info'][0]['apellido']);
    $logued = true;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrador | Laura Arciniega Roque</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400&family=Overlock:wght@400;700&family=PT+Sans:wght@700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body data_login="<?= $logued?>">
    <section id="app_login" :class="{ 'loging':!login }">
        <article v-if="!login">
            <div>
                <h4>Laura's Admin</h4>
                <p v-if="message" :class="{ 'failed_login':!login, 'success_login':login }">{{ message }}</p>
                <fieldset>
                    <label for="user">Usuario</label>
                    <input type="text" name="user" id="user" placeholder="Ingresa usuario" v-model="name_user">
                </fieldset>
                <fieldset>
                    <label for="pass">Contraseña</label>
                    <input type="password" name="pass" id="pass" placeholder="******" v-model="pass_user">
                </fieldset>
                <button id="send_btn" @click="login_user">Ingresar</button>
            </div>
        </article>        
        <article v-else>
            <aside>
                <div id="user">
                    <p>
                        <span>L</span>
                        <span><?= $_SESSION['user_info'][0]['nombre'] . ' ' . $_SESSION['user_info'][0]['apellido']?></span>
                    </p>
                </div>
                <div id="options">
                    <ul>
                        <li><a href=""><span>Mi perfil</span><i></i></a></li>
                        <li><a href=""><span>Mis trabajos</span><i></i></a></li>
                        <li><a href=""><span>Mi educación</span><i></i></a></li>
                        <li><a href=""><span>Mis diplomas</span><i></i></a></li>
                        <li><a href=""><span>Tecnologías</span><i></i></a></li>
                        <li><a href=""><span>Lenguajes</span><i></i></a></li>
                        <li><a href=""><span>Idiomas</span><i></i></a></li>
                    </ul>
                </div>
            </aside>
            <main>
                <div id="menu">
                    <span>Dashboard</span>
                    <a><span>L</span></a>
                </div>
                <div id="content">
                    <p>¡Hola Laurencia! ¿Qué quieres hacer hoy?</p>
                </div>
            </main>
        </article>        
    </section>

    <script src="assets/js/login.js"></script>
</body>
</html>