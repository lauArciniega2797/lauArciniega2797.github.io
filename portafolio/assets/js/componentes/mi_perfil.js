Vue.component('mi-perfil', {
    props:['use','usuario'],
    data(){
        return {
            message_image: '',
            img_selected: '',
            user: {},

            cps:[],
            estados: [],
            municipios: [],
            colonias: [],
            estado_selected: false,
            cp_selected: false,
            municipio_selected: false,
        }
    }, 
    template:`
        <div class="flex is-bg-white" :class="{ 'justify-content-space-evenly':use != 'register', 'justify-content-space-between':use == 'register' }" id="profile_component" ref="mi_perfil">
            <!-- esto puede ser un componente ya que se va a usar varias veces lo de subir imagen -->
            <div id="image">
                <figure>
                    <img id="img_visualizer" :src="user.image">
                </figure>
                <p id="message" v-if="message_image" class="is-bold">{{ message_image }}</p>
                <button @click="select_image" class="btn btn-success btn-block">Subir foto</button>
                <input type="file" id="image_selector" name="image" @change="changing_img">
            </div>
            <!-- -->

            <div id="user_info">
                <div class="input-box">
                    <label for="">Nombre</label>
                    <input type="text" placeholder="Ingresa nombre" name="nombre" id="nombre" v-model="user.nombre">
                </div>
                <div class="input-box">
                    <label>Apellidos</label>
                    <input type="text" placeholder="Ingresa apellidos" name="apellidos" id="apellidos" v-model="user.apellidos">
                </div>
                <div class="input-box">
                    <label>Email</label>
                    <input type="text" placeholder="example@example.com" name="email" id="email" v-model="user.email">
                </div>
                <div class="input-box">
                    <label>Username</label>
                    <input type="text" name="username" id="username" v-model="user.username" :disabled="use != 'register'">
                </div>
                <div class="input-box">
                    <label>Contraseña</label>
                    <input type="text" placeholder="" name="password" id="password" v-model="user.password">
                </div>
                <div class="input-box">
                    <label>Teléfono</label>
                    <input type="text" placeholder="000 000 0000" name="telefono" id="telefono" v-model="user.telefono">
                </div>
                <div class="input-box">
                    <label>Celular</label>
                    <input type="text" placeholder="000 000 0000" name="celular" id="celular" v-model="user.celular">
                </div>
                <div class="input-box">
                    <label>Estado</label>
                    <select v-model="user.estado" @change="estado_change">
                        <option v-for="item in estados" :value="item">{{ item }}</option>
                    </select>
                </div>
                <div class="input-box">
                    <label>C.P.</label>
                    <select v-model="user.codigo_postal" v-if="estado_selected || user.estado != ''" @change="cp_change">
                        <option v-for="item in cps" :value="item">{{ item }}</option>
                    </select>
                    <select v-else v-model="user.codigo_postal" disabled>
                        <option></option>
                    </select>
                </div>
                <div class="input-box">
                    <label>Municipio</label>
                    <select v-model="user.municipio" v-if="user.codigo_postal != '' || cp_selected" @change="municipio_change">
                        <option v-for="item in municipios" :value="item">{{ item }}</option>
                    </select>
                    <select v-model="user.municipio" v-else disabled>
                        <option></option>
                    </select>
                </div>
                <div class="input-box">
                    <label>Colonia</label>
                    <select v-model="user.colonia" v-if="user.municipio != '' || municipio_selected">
                        <option v-for="item in colonias" :value="item">{{ item }}</option>
                    </select>
                    <select v-model="user.colonia" v-else disabled>
                        <option></option>
                    </select>
                </div>
                <div class="input-box">
                    <label>Calle</label>
                    <input type="text" name="calle_user" id="calle_user" v-model="user.calle">
                </div>
                <div class="input-box">
                    <label>Numero Ext.</label>
                    <input type="text" placeholder="" name="no_ext" id="no_ext" v-model="user.no_ext">
                </div>
                <div class="input-box">
                    <label>Numero Int.</label>
                    <input type="text" placeholder="" name="no_int" id="no_int" v-model="user.no_int">
                </div>
                <div class="input-box">
                    <label>Profesion</label>
                    <input type="text" placeholder="" name="profesion" id="profesion" v-model="user.profesion">
                </div>
                <div class="input-box">
                    <label>Descripción personal</label>
                    <textarea placeholder="" name="descr" id="descr" v-model="user.descr" style="resize: none"></textarea>
                </div>
                <div class="input-box">
                    <label>Objetivo profesional</label>
                    <textarea placeholder="" name="objetivo_profesional" id="objetivo_profesional" v-model="user.objetivo_profesional" style="resize: none"></textarea>
                </div>
                <div class="input-box">
                    <label>Github</label>
                    <input type="text" placeholder="" name="github" id="github" v-model="user.github">
                </div>
                <div class="input-box">
                    <label>Linkedin</label>
                    <input type="text" placeholder="" name="linkedin" id="linkedin" v-model="user.linkedin">
                </div>
                <div class="input-box">
                    <label>Portafolio Profesional</label>
                    <input type="text" placeholder="" name="portafolio_url" id="portafolio_url" v-model="user.portafolio_url">
                </div>

                <div v-if="use != 'register'" style="width:85%" class="ml-auto mt-5">
                    <button class="btn btn-success is-btn-xl mr-3" @click="createUser('u')">Guardar</button>
                    <span style="color: #969696" class="is-sm">Última actualización: {{ user.ult_actualizacion }}</span>
                </div>
            </div>
        </div>
    `,
    created(){
        // "#27ae60",   //verde
        // "#2980b9",   //azul
        // "#9b59b6",   //morado
        // "#e67e22",   //naranja
        // "#e74c3c",   //rojo
        // "#1abc9c",   //verde mas claro
        // "#f39c12",   //naranja
        
        if(this.use == 'register'){
            this.user = {
                image: '',
                nombre: '',
                apellidos: '',
                telefono: '',
                celular: '',
                email: '',
                estado: '',
                codigo_postal: '',
                municipio: '',
                colonia: '',
                calle: '',
                no_ext: '',
                no_int: '',
                profesion: '',
                descr: '',
                objetivo_profesional: '',
                github: '',
                linkedin: '',
                portafolio_url: '',
                username: '',
                password: ''
            }

            this.getEstados()
            if(this.user.estado != ''){
                this.getCodigosPostales()
            }
            if(this.user.codigo_postal != '') {
                this.getMunicipios()
            }
            if(this.user.municipio != '') {
                this.getColonias()
            }
        } else {
            this.getData()
        }
    },
    watch:{
    },
    methods: {
        select_image: function(){
            document.querySelector('#image_selector').click()
        },
        changing_img: function(){
            let fileInput = document.getElementById('image_selector'),
                inputValue = fileInput.value,
                extAllowed = /(.jpg|.jpeg|.png|.gif)$/i,
                previsualizador = document.getElementById('img_visualizer')
                app = this
                // message_image_box = document.getElementById('message')

            if (extAllowed.exec(inputValue)) {
                app.message_image = ''
                // message_image_box.style.display = 'none'

                previsualizador.src = URL.createObjectURL(fileInput.files[0])
                app.user.image_file = fileInput.files[0]
            } else {
                app.message_image = 'Sube solo imagenes o gifs'
                // message_image_box.style.display = 'block'
            }
        },
        getData: function(){
            let usuario_data, app = this

            if(localStorage.getItem('usuario')){
                usuario_data = JSON.parse(localStorage.getItem('usuario'))
            }
            fetch('./assets/api/api_profile.php?action=editRegister&user=' + usuario_data[0].username)
            .then(data => data.json())
            .then(data => {
                app.user = data.datos[0]

                app.user.image = 'assets/img/admin/' + app.user.image

                app.getEstados()
                if(app.user.estado != ''){
                    app.getCodigosPostales()
                }
                if(app.user.codigo_postal != '') {
                    app.getMunicipios()
                }
                if(app.user.municipio != '') {
                    app.getColonias()
                }
            })
        },
        getEstados: function(){
            fetch('./assets/api/api.php?action=estado')
            .then(data => data.json())
            .then(data => {
                if(data.error){
                    console.warn('No se han podido cargar los estados')
                } else {
                    this.estados = data.datos
                }
            })
        },
        getCodigosPostales: function(){
            fetch('./assets/api/api.php?action=cps&estado=' + this.user.estado)
            .then(data => data.json())
            .then(data => {
                if(data.error){
                    console.warn('No se han podido cargar los códigos postales')
                } else {
                    this.cps = data.datos
                }
            })
        },
        getMunicipios: function(){
            fetch('./assets/api/api.php?action=municipios&estado=' + this.user.estado + '&cp=' + this.user.codigo_postal)
            .then(data => data.json())
            .then(data => {
                if(data.error){
                    console.warn('No se han podido cargar los municipios')
                } else {
                    this.municipios = data.datos
                }
            })
        },
        getColonias: function(){
            fetch('./assets/api/api.php?action=colonias&estado=' + this.user.estado + '&cp=' + this.user.codigo_postal + '&municipio=' + this.user.municipio)
            .then(data => data.json())
            .then(data => {
                if(data.error){
                    console.warn('No se han podido cargar las colonias')
                } else {
                    this.colonias = data.datos
                }
            })
        },
        estado_change: function(){
            this.estado_selected = true; 
            this.getCodigosPostales()
        },
        cp_change: function(){
            this.cp_selected = true; 
            this.getMunicipios()
            this.getColonias()
        },
        municipio_change: function(){
            this.municipio_selected = true
            this.getColonias()
        },
        createUser: function(opc){
            let app = this, nombre_imagen, url_api

            app.user.image_name = ''

            if(opc){
                let currentUser = JSON.parse(localStorage.getItem('usuario'))[0].username

                app.user.currentUser = currentUser
                url_api = '&opc=u'
            } else {
                url_api = '&opc=i'
            }

            if (app.user.image_file){
                console.log('enviamos la imagen')
                let imagen = new FormData()
                imagen.append('name_user', app.user.nombre)
                imagen.append('image', app.user.image_file)

                fetch('assets/api/api_images.php', {
                    method: 'POST',
                    body: imagen,
                })
                .then(data => data.json())
                .then(data => {
                    if(!data.error) {
                        console.log('aqui el data: ' + data)
                        nombre_imagen = data.name_img
                        
                        if(nombre_imagen) {
                            console.log('aqui tienes la imagen: ' + nombre_imagen)
                            app.user.image_name = nombre_imagen

                            app.insertData(url_api)
                        }
                    }
                })
            } else {
                app.insertData(url_api)
            }

        },
        insertData:function(url_api){
            let app = this
            fetch('assets/api/api_profile.php?action=register'+url_api, {
                method: 'POST',
                body: JSON.stringify(app.user)
            })
            .then(data => data.json())
            .then(response => {
                console.log(response)
            })
        }
    }
})


