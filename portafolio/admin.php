<?php 
session_start();
$logued = false;
if(isset($_SESSION['user_info'])){
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
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400&family=Overlock:wght@400;700&family=PT+Sans:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/admin.css">
    
    <script src="https://kit.fontawesome.com/fc8db0068f.js" crossorigin="anonymous"></script>
</head>
<body data_login="<?= $logued?>">
    <section id="app_login" :class="{ 'loging':!login }">
        <article class="modal" v-if="register">
            <div class="header-modal">
                <h4>Registrar usuario</h4>
                <button @click="register = false">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="body-modal">
                <mi-perfil use="register" ref="user_info_modal"></mi-perfil>
            </div>
            <div class="footer-modal">
                <button @click="register = false">Cancelar</button>
                <button @click="">Guardar</button>
            </div>
        </article>
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
                <a @click="register = true">Registrate</a>
            </div>
        </article>        
        <article v-else>
            <aside>
                <div id="user">
                    <p id="user_avatar"><span></span></p>
                    <p v-if="!menu_collapsed"><span>{{ usuario_name }} <br> {{ usuario_apellido }}</span></p>
                </div>
                <div id="options">
                    <ul>
                        <li>
                            <a @click="changeView('Mi perfil', $event)" :class="{ 'active':current_view == 'Mi perfil' }" href="">
                                <i class="fa-solid fa-user"></i><span v-if="!menu_collapsed">Mi perfil</span>
                            </a>
                        </li>
                        <li>
                            <a @click="changeView('Mi educacion', $event)" :class="{ 'active':current_view == 'Mi educacion' }" href="">
                                <i class="fa-solid fa-graduation-cap"></i><span v-if="!menu_collapsed">Mi educación</span>
                            </a>
                        </li>
                        <li>
                            <a @click="changeView('Mis trabajos', $event)" :class="{ 'active':current_view == 'Mis trabajos' }" href="">
                                <i class="fa-solid fa-briefcase"></i><span v-if="!menu_collapsed">Mis trabajos</span>
                            </a>
                        </li>
                        <li>
                            <a @click="changeView('Mis diplomas', $event)" :class="{ 'active':current_view == 'Mis diplomas' }" href="">
                                <i class="fa-solid fa-trophy"></i><span v-if="!menu_collapsed">Mis diplomas</span>
                            </a>
                        </li>
                        <li>
                            <a @click="changeView('Mis páginas', $event)" :class="{ 'active':current_view == 'Mis páginas' }" href="">
                                <i class="fa-solid fa-code"></i><span v-if="!menu_collapsed">Mis páginas</span>
                            </a>
                        </li>
                        <li>
                            <a @click="changeView('Tecnologías', $event)" :class="{ 'active':current_view == 'Tecnologías' }" href="">
                                <i class="fa-solid fa-computer-mouse"></i><span v-if="!menu_collapsed">Tecnologías</span>
                            </a>
                        </li>
                        <li>
                            <a @click="changeView('Lenguajes', $event)" :class="{ 'active':current_view == 'Lenguajes' }" href="">
                                <i class="fa-solid fa-globe"></i><span v-if="!menu_collapsed">Lenguajes</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <main>
                <div id="menu">
                    <button title="Colapsar menu" @click="collapse_menu"><i class="fa-solid fa-bars"></i></button>
                    <span>{{ current_view }}</span>
                    <a><span>L</span></a>
                </div>
                <div id="content">
                    <p v-if="current_view == 'Dashboard'">¡Hola Laurencia! ¿Qué quieres hacer hoy?</p>
                    <mi-perfil v-if="current_view == 'Mi perfil'"></mi-perfil>
                </div>
            </main>
        </article>        
    </section>


    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="assets/js/componentes/lenguajes.js"></script>
    <script src="assets/js/componentes/mi_educacion.js"></script>
    <script src="assets/js/componentes/mi_perfil.js"></script>
    <script src="assets/js/componentes/mis_diplomas.js"></script>
    <script src="assets/js/componentes/mis_paginas.js"></script>
    <script src="assets/js/componentes/mis_trabajos.js"></script>
    <script src="assets/js/componentes/tecnologias.js"></script>
    <script src="assets/js/admin.js"></script>
</body>
</html>