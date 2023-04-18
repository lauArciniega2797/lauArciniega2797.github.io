Vue.component('lenguajes', {
    props:[''],
    data(){
        return {}
    },
    template:`
        <div>
            <p>Aquí irán los lenguajes que manejo, se pueden mostrar en manera de recuadros los lenguajes que actualmente estan en la bd y debe haber una opción que me permita agregar un nuevo lenguaje.</p>
            <ol>
                <li>Mostrar las tecnologías que manejo actualmente en manera de recuadros</li>
                <li>Poner una opción para agregar una nueva</li>
                <li>Cada tecnologia nueva debe llevar: nombre, descripción, imagen, nivel de conocimiento</li>
            </ol>
        </div>
    `,
    created(){},
    methods: {}
})