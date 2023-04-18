Vue.component('educacion', {
    props:[''],
    data(){
        return {}
    },
    template:`
        <div>
            <p>Aquí se va a mostrar las escuelas en donde he estado siempre y cuando tengan que ver con mi profesion, por ejemplo solo cuentan las universidades</p>
            <ol>
                <li>Mostrar las escuelas en donde estuve puede ser en forma de tabla esta información</li>
                <li>Cada nueva escuela deberá tener: carrera, escuela, periodo fin, periodo inicio y ultima actualizacion, aunque este ultimo campo se actualiza cuando se ha modificado el registo.</li>
                <li></li>
            </ol>
        </div>
    `,
    created(){},
    methods: {}
})