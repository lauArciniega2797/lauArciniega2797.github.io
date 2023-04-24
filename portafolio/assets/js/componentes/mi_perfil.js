Vue.component('mi-perfil', {
    props:[],
    data(){
        return {
            message_image: '',
            img_selected: '',

            nombre_user: ''
        }
    }, 
    template:`
        <div>
            <!-- esto puede ser un componente ya que se va a usar varias veces lo de subir imagen -->
            <div id="image">
                <img id="img_visualizer">
                <p id="message">{{ message_image }}</p>
                <button @click="select_image">Subir foto</button>
                <input type="file" id="image_selector" name="image_selector" @change="changing_img">
            </div>

            <div id="user_info">
                <fieldset>
                    <label>Nombre</label>
                    <input type="text" placeholder="Ingresa nombre" name="nombre_user" id="nombre_user" v-model="nombre_user">
                </fieldset>
                <fieldset>
                    <label>Apellidos</label>
                    <input type="text" placeholder="Ingresa apellidos" name="apellidos_user" id="apellidos_user" v-model="apellidos_user">
                </fieldset>
                <fieldset>
                    <label>Teléfono</label>
                    <input type="text" placeholder="000 000 0000" name="tel_user" id="tel_user" v-model="tel_user">
                </fieldset>
                <fieldset>
                    <label>Email</label>
                    <input type="text" placeholder="example@example.com" name="email_user" id="email_user" v-model="email_user">
                </fieldset>
                <hr>
                <fieldset>
                    <label>Estado</label>
                    <select v-model="cp_user">
                        <options v-for="item y cps" value="item.codigo">{{ item.codigo }}</options>
                    </select>>
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
        }
    }
})