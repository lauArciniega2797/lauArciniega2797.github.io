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
        <div>
            <!-- esto puede ser un componente ya que se va a usar varias veces lo de subir imagen -->
            <div id="image">
                <img id="img_visualizer" :src="user.image">
                <p id="message">{{ message_image }}</p>
                <button @click="select_image">Subir foto</button>
                <input type="file" id="image_selector" name="image" @change="changing_img">
            </div>
            <!-- -->

            <div id="user_info">
                <fieldset>
                    <label>Nombre</label>
                    <input type="text" placeholder="Ingresa nombre" name="nombre" id="nombre" v-model="user.nombre">
                </fieldset>
                <fieldset>
                    <label>Apellidos</label>
                    <input type="text" placeholder="Ingresa apellidos" name="apellidos" id="apellidos" v-model="user.apellidos">
                </fieldset>
                <fieldset>
                    <label>Teléfono</label>
                    <input type="text" placeholder="000 000 0000" name="telefono" id="telefono" v-model="user.telefono">
                </fieldset>
                <fieldset>
                    <label>Teléfono</label>
                    <input type="text" placeholder="000 000 0000" name="celular" id="celular" v-model="user.celular">
                </fieldset>
                <fieldset>
                    <label>Email</label>
                    <input type="text" placeholder="example@example.com" name="email" id="email" v-model="user.email">
                </fieldset>
                <hr>
                <fieldset>
                    <label>Estado</label>
                    <select v-model="user.estado" @change="estado_change">
                        <option v-for="item in estados" :value="item">{{ item }}</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label>C.P.</label>
                    <select v-model="user.codigo_postal" v-if="estado_selected || user.estado != ''" @change="cp_change">
                        <option v-for="item in cps" :value="item">{{ item }}</option>
                    </select>
                    <select v-else v-model="user.codigo_postal" disabled>
                        <option></option>
                    </select>
                </fieldset>
                <fieldset>
                    <label>Municipio</label>
                    <select v-model="user.municipio" v-if="user.codigo_postal != '' || cp_selected" @change="municipio_change">
                        <option v-for="item in municipios" :value="item">{{ item }}</option>
                    </select>
                    <select v-model="user.municipio" v-else disabled>
                        <option></option>
                    </select>
                </fieldset>
                <fieldset>
                <label>Colonia</label>
                    <select v-model="user.colonia" v-if="user.municipio != '' || municipio_selected">
                        <option v-for="item in colonias" :value="item">{{ item }}</option>
                    </select>
                    <select v-model="user.colonia" v-else disabled>
                        <option></option>
                    </select>
                </fieldset>
                <fieldset>
                    <label>Calle</label>
                    <input type="text" name="calle_user" id="calle_user" v-model="user.calle">
                </fieldset>
                <fieldset>
                    <label>Numero Ext.</label>
                    <input type="text" placeholder="" name="no_ext" id="no_ext" v-model="user.no_ext">
                </fieldset>
                <fieldset>
                    <label>Numero Int.</label>
                    <input type="text" placeholder="" name="no_int" id="no_int" v-model="user.no_int">
                </fieldset>
                <hr>
                <fieldset>
                    <label>Profesion</label>
                    <input type="text" placeholder="" name="profesion" id="profesion" v-model="user.profesion">
                </fieldset>
                <fieldset>
                    <label>Descripción personal</label>
                    <textarea placeholder="" name="descr" id="descr" v-model="user.descr" style="resize: none"></textarea>
                </fieldset>
                <fieldset>
                    <label>Objetivo profesional</label>
                    <textarea placeholder="" name="objetivo_profesional" id="objetivo_profesional" v-model="user.objetivo_profesional" style="resize: none"></textarea>
                </fieldset>
                <fieldset>
                    <label>Github</label>
                    <input type="text" placeholder="" name="github" id="github" v-model="user.github">
                </fieldset>
                <fieldset>
                    <label>Linkedin</label>
                    <input type="text" placeholder="" name="linkedin" id="linkedin" v-model="user.linkedin">
                </fieldset>
                <fieldset>
                    <label>Portafolio Profesional</label>
                    <input type="text" placeholder="" name="portafolio_url" id="portafolio_url" v-model="user.portafolio_url">
                </fieldset>
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
                estado: 'Hidalgo',
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
                portafolio_url: ''
            }
        } else {
            this.getData()
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
                extAllowed = /(.jpg|.jpeg|.png)$/i,
                previsualizador = document.getElementById('img_visualizer')
                app = this,
                message_image = app.message_image,
                message_image_box = document.getElementById('message')

            if (extAllowed.exec(inputValue)) {
                message_image = ''
                message_image_box.style.display = 'none'

                previsualizador.src = URL.createObjectURL(fileInput.files[0])
            }
        },
        getData: function(){
            this.user.image = 'ad'
            this.user.nombre = 'asd'
            this.user.apellidos = 'asd'
            this.user.telefono = 'asd'
            this.user.celular = 'asd'
            this.user.email = 'asd'
            this.user.estado = 'asd'
            this.user.codigo_postal = 'asd'
            this.user.municipio = 'ad'
            this.user.colonia = 'ads'
            this.user.calle = 'ad'
            this.user.no_ext = 'ads'
            this.user.no_int = 'asd'
            this.user.profesion = 'asd'
            this.user.descr = 'asd'
            this.user.objetivo_profesional = 'asd'
            this.user.github = 'asd'
            this.user.linkedin = 'asd'
            this.user.portafolio_url = 'asd'
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
        }
    }
})


