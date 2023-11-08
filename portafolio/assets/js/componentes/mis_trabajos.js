Vue.component('trabajos', {
    props:[''],
    data(){
        return {
            nuevo: false,
            edit:false,
            trabajo: [],
            trabajos:[],
            message:'',
            registrated: false,

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
            <article class="modal flex align-items-center justify-content-center" v-if="nuevo || edit">
                <div class="modal_content">
                    <div class="header-modal flex justify-content-space-between align-items-center">
                        <h4>Registrar trabajo</h4>
                        <button @click="nuevo ? nuevo = false : edit = false" class="btn is-btn-xs">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="body-modal">
                        <p v-if="message" class="note" :class="{ 'note-success':registrated, 'note-danger':!registrated }">{{ message }}</p>
                        <div class="input-box">
                            <label for="">Empresa</label>
                            <input type="text" placeholder="Ingresa nombre" name="nombre" id="nombre" v-model="trabajo.nombre_comercial">
                        </div>
                        <div class="input-box">
                            <label>Estado</label>
                            <select v-model="trabajo.estado" @change="estado_change">
                                <option v-for="item in estados" :value="item">{{ item }}</option>
                            </select>
                        </div>
                        <div class="input-box">
                            <label>C.P.</label>
                            <select v-model="trabajo.codigo_postal" v-if="estado_selected || trabajo.estado != ''" @change="cp_change">
                                <option v-for="item in cps" :value="item">{{ item }}</option>
                            </select>
                            <select v-else v-model="trabajo.codigo_postal" disabled>
                                <option></option>
                            </select>
                        </div>
                        <div class="input-box">
                            <label>Municipio</label>
                            <select v-model="trabajo.municipio" v-if="trabajo.codigo_postal != '' || cp_selected" @change="municipio_change">
                                <option v-for="item in municipios" :value="item">{{ item }}</option>
                            </select>
                            <select v-model="trabajo.municipio" v-else disabled>
                                <option></option>
                            </select>
                        </div>
                        <div class="input-box">
                            <label>Colonia</label>
                            <select v-model="trabajo.colonia" v-if="trabajo.municipio != '' || municipio_selected">
                                <option v-for="item in colonias" :value="item">{{ item }}</option>
                            </select>
                            <select v-model="trabajo.colonia" v-else disabled>
                                <option></option>
                            </select>
                        </div>
                        <div class="input-box">
                            <label>Calle</label>
                            <input type="text" name="calle_trabajo" id="calle_trabajo" v-model="trabajo.calle">
                        </div>
                        <div class="input-box">
                            <label>Numero Ext.</label>
                            <input type="text" placeholder="" name="no_ext" id="no_ext" v-model="trabajo.no_ext">
                        </div>
                        <div class="input-box">
                            <label>Numero Int.</label>
                            <input type="text" placeholder="" name="no_int" id="no_int" v-model="trabajo.no_int">
                        </div>
                        <div class="input-box">
                            <label for="">Nombre Jefe</label>
                            <input type="text" placeholder="Nombre jefe directo" name="nombre_jefe" id="nombre_jefe" v-model="trabajo.nombre_jefe">
                        </div>
                        <div class="input-box">
                            <label for="">Referencias</label>
                            <input type="text" placeholder="Nombre referencia" name="referencia" id="referencia" v-model="trabajo.referencia">
                        </div>
                        <div class="input-box">
                            <label>Telefono referencia</label>
                            <input type="text" placeholder="" name="tel_referencia" id="te_referencia" v-model="trabajo.tel_referencia">
                        </div>
                        <div class="input-box">
                            <label>Teléfono de la empresa</label>
                            <input type="text" placeholder="" name="tel_empresa" id="tel_empresa" v-model="trabajo.tel_empresa">
                        </div>
                        <div class="input-box">
                            <label>Motivo salida</label>
                            <textarea placeholder="" name="motivo_salida" id="motivo_salida" v-model="trabajo.motivo_salida" style="resize: none"></textarea>
                        </div>
                        <div class="input-box">
                            <label>Puesto desempeñado</label>
                            <input type="text" placeholder="" name="puesto" id="puesto" v-model="trabajo.puesto">
                        </div>
                        <div class="input-box">
                            <label>Descripción del puesto</label>
                            <textarea placeholder="" name="descr" id="descr" v-model="trabajo.descr" style="resize: none"></textarea>
                        </div>                        
                        <div class="input-box">
                            <label>Periodo inicio</label>
                            <input type="date" placeholder="selecciona" name="p_inicio" id="p_inicio" v-model="trabajo.p_inicio">
                        </div>
                        <div class="input-box">
                            <label>Periodo fin</label>
                            <input type="date" placeholder="selecciona" name="p_fin" id="p_fin" v-model="trabajo.p_fin">
                        </div>
                        <div class="input-box">
                            <label>Poner en curriculum</label>
                            <input type="checkbox" name="curriculum" id="curriculum" v-model="trabajo.curriculum">
                        </div>
                    </div>

                    <div class="footer-modal flex" :class="{ 'flex justify-content-end':nuevo, 'justify-content-space-between':edit }">
                        <p v-if="edit" class="is-sm">{{ trabajo.ult_actualizacion }}</p>
                        <div>
                            <button @click="nuevo ? nuevo = false : edit = false" class="btn is-btn-md" style="margin-right:.4em;">Cancelar</button>
                            {{nuevo}}}
                            <button @click="nuevo ? save_job() : save_job('u')" class="btn btn-success is-btn-md">Guardar</button>
                        </div>
                    </div>
                </div>
            </article>

            <button class="" @click="nuevo = true">
                <span class="is-lg">Nuevo Registro</span>
            </button>
            <article id="trabajos_content">
                <table>
                    <thead>
                        <tr>
                            <th>Puesto</th>
                            <th>Descripción del puesto</th>
                            <th>Periodo</th>
                            <th>Jefe directo</th>
                            <th>Empresa</th>
                            <th>Tel. empresa</th>
                            <th>Ciudad</th>
                            <th>Referencia</th>
                            <th>Tel. referencia</th>
                            <th>Motivo salida</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in trabajos">
                            <td>{{ item.puesto }}</td>
                            <td>{{ item.descr }}</td>
                            <td>{{ item.p_inicio }} - {{ item.p_fin }}</td>
                            <td>{{ item.nombre_jefe }}</td>
                            <td>{{ item.nombre_comercial }}</td>
                            <td>{{ item.tel_empresa }}</td>
                            <td>{{ item.ciudad }}</td>
                            <td>{{ item.referencia }}</td>
                            <td>{{ item.tel_referencia }}</td>
                            <td>{{ item.motivo_salida }}</td>
                            <td>
                                <input type="checkbox" v-model="item.curriculum" @change="update_curriculum(item.id, item.curriculum)">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </article>
        </div>
    `,
    watch:{
        nuevo(nv){
            if(nv){
                this.trabajo = {
                    nombre_comercial:'',
                    estado:'',
                    codigo_postal:'',
                    municipio:'',
                    colonia:'',
                    calle:'',
                    no_ext:'',
                    no_int:'',
                    nombre_jefe:'',
                    referencia:'',
                    tel_referencia:'',
                    tel_empresa:'',
                    motivo_salida:'',
                    puesto:'',
                    descr:'',
                    p_inicio:'',
                    p_fin:'',
                    curriculum:false
                }

                this.getEstados()
                if(this.trabajo.estado != ''){
                    this.getCodigosPostales()
                }
                if(this.trabajo.codigo_postal != '') {
                    this.getMunicipios()
                }
                if(this.trabajo.municipio != '') {
                    this.getColonias()
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

            fetch('assets/api/api_trabajos.php?action=getJobsData')
            .then(res => res.json())
            .then(res => {
                if(!res.error){
                    app.trabajos = res.datos
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
            fetch('./assets/api/api.php?action=cps&estado=' + this.trabajo.estado)
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
            fetch('./assets/api/api.php?action=municipios&estado=' + this.trabajo.estado + '&cp=' + this.trabajo.codigo_postal)
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
            fetch('./assets/api/api.php?action=colonias&estado=' + this.trabajo.estado + '&cp=' + this.trabajo.codigo_postal + '&municipio=' + this.trabajo.municipio)
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
        editTrabajo: function(id){
            let app = this

            fetch('assets/api/api_trabajos.php?action=editRegister&trabajo=' + id)
            .then(data => data.json())
            .then(data => {
                if(!data.error) {
                    app.trabajo = data.datos[0]

                    app.edit = true
                }
            })
        },
        save_job: function(tipo){
            let app = this,
                opc = (tipo == 'u') ? '&opc=u' : '&opc=i'

            app.registrated = false

            fetch('assets/api/api_trabajos.php?action=register' + opc, {
                method:'POST',
                body: JSON.stringify(app.trabajo)
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

            fetch('assets/api/api_trabajos.php?action=register&opc=c', {
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