Vue.component('educacion', {
    props:[''],
    data(){
        return {
            nuevo: false,
            edit:false,
            escuela: [],
            escuelas:[],
            message:'',
            registrated: false
        }
    },
    template:`
        <div>
            <article class="modal flex align-items-center justify-content-center" v-if="nuevo || edit">
                <div class="modal_content">
                    <div class="header-modal flex justify-content-space-between align-items-center">
                        <h4>Registrar escuela</h4>
                        <button @click="nuevo ? nuevo = false : edit = false" class="btn is-btn-xs">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="body-modal">
                        <p v-if="message" class="note" :class="{ 'note-success':registrated, 'note-danger':!registrated }">{{ message }}</p>
                        <div class="input-box">
                            <label for="">Nombre institución</label>
                            <input type="text" placeholder="Ingresa nombre" name="nombre" id="nombre" v-model="escuela.institucion">
                        </div>
                        <div class="input-box">
                            <label for="">Página oficial</label>
                            <input type="text" placeholder="www.sitio.com" name="sitio" id="sitio" v-model="escuela.pagina_oficial">
                        </div>
                        <div class="input-box">
                            <label for="">Carrera cursada</label>
                            <input type="text" placeholder="Ingrese nombre carrera" name="carrera" id="carrera" v-model="escuela.carrera">
                        </div>
                        <div class="input-box">
                            <label>Periodo inicio</label>
                            <input type="date" placeholder="selecciona" name="p_inicio" id="p_inicio" v-model="escuela.p_inicio">
                        </div>
                        <div class="input-box">
                            <label>Periodo fin</label>
                            <input type="date" placeholder="selecciona" name="p_fin" id="p_fin" v-model="escuela.p_fin">
                        </div>
                        <div class="input-box">
                            <label>Poner en curriculum</label>
                            <input type="checkbox" name="curriculum" id="curriculum" v-model="escuela.curriculum">
                        </div>
                    </div>

                    <div class="footer-modal flex" :class="{ 'flex justify-content-end':nuevo, 'justify-content-space-between':edit }">
                        <p v-if="edit" class="is-sm">{{ escuela.ult_actualizacion }}</p>
                        <div>
                            <button @click="nuevo ? nuevo = false : edit = false" class="btn is-btn-md" style="margin-right:.4em;">Cancelar</button>
                            <button @click="nuevo ? save_educacion : save_educacion('u')" class="btn btn-success is-btn-md">Guardar</button>
                        </div>
                    </div>
                </div>
            </article>

            <article id="escuelas_content">
                <div v-for="item in escuelas" class="escuela_box flex flex-direction-column justify-content-space-between">
                    <div class="box-title">
                        <i class="fas fa-graduation-cap is-lg"></i>
                        <h4 class="mt-1" @click="editEscuela(item.id)">{{ item.institucion }}</h4>
                    </div>
                    <div class="box-content">
                        <p class="my-1">{{ item.carrera }}</p>
                        <a target="_blank" :href="item.pagina_oficial">Página oficial</a>
                    </div>
                    <div class="box-footer">
                        <p class="is-xs">Periodo: <span>{{ item.p_inicio }}  -  {{ item.p_fin }}</span></p>
                        <span>Curriculum <input type="checkbox" v-model="item.curriculum" @click="update_curriculum(item.id, item.curriculum)"></span>
                    </div>
                </div>
                <button class="escuela_box" @click="nuevo = true">
                    <span class="is-lg">Nuevo Registro</span>
                </button>
            </article>
        </div>
    `,
    watch:{
        nuevo(nv){
            if(nv){
                this.escuela = {
                    institucion:'',
                    pagina_oficial:'',
                    carrera:'',
                    p_inicio:'',
                    p_fin:'',
                    curriculum:false
                }
            }
        }
    },
    created(){
        this.get_data()
    },
    methods: {
        get_data: function(){
            let app = this
            fetch('assets/api/api_education.php?action=getAcademicData')
            .then(res => res.json())
            .then(res => {
                if(!res.error){
                    app.escuelas = res.datos
                }
            })
        },
        editEscuela: function(id){
            let app = this

            fetch('assets/api/api_education.php?action=editRegister&escuela=' + id)
            .then(data => data.json())
            .then(data => {
                if(!data.error) {
                    app.escuela = data.datos[0]

                    app.edit = true
                }
            })
        },
        save_educacion: function(tipo){
            let app = this,
                opc = (tipo == 'u') ? '&opc=u' : '&opc=i'

            app.registrated = false

            fetch('assets/api/api_education.php?action=register' + opc, {
                method:'POST',
                body: JSON.stringify(app.escuela)
            })
            .then(data => data.json())
            .then(data => {
                if(!data.error) {
                    this.message = (tipo != 'u') ? 'Registro exitoso!' : 'Se actualizo corretamente!'

                    this.registrated = true
                } else {
                    this.message = 'Algo salio mal'
                }

                setTimeout(() => {
                    if(tipo == 'u'){
                        app.edit = false
                    } else {
                        app.nuevo = false
                    }
                    app.message = ''

                    app.get_data()
                }, 3000);
            })
        },
        update_curriculum: function(id, curriculum){
            let app = this

            fetch('assets/api/api_education.php?action=register&opc=c', {
                method:'POST',
                body: JSON.stringify({'id':id, 'curriculum':curriculum})
            })
            .then(data => data.json())
            .then(data => {
                if(!data.error){
                    app.get_data()
                }
            })
        }
    }
})