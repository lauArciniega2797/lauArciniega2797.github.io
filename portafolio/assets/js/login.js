let app_login = new Vue({
    el: '#app_login',
    data: {
        login: false,
        name_user: '',
        pass_user: '',
        message: '',
    },
    created(){},
    watch: {},
    methods: {
        login_user: function(){
            let data = {
                user: this.name_user,
                pass: this.pass_user
            }

            let app = this

            fetch('./assets/api/api.php?action=login', {
                method: 'POST',
                redirect: 'follow',
                body: JSON.stringify(data)
            })
            .then(data => data.json())
            .then(response => {
                if(!response.error) {
                    if(response.login) {
                        app.message = 'Ingresando...'
                        setTimeout(() => {
                            app.login = true
                        }, 5000);
                    } else {
                        app.login = false
                        app.message = 'Los datos son incorrectos.'
                    }
                } else {
                    app.login = false
                    app.message = 'No se pudo hacer la petición.'
                }
            })
            .catch(err => console.log('Solicitud fallida: ' + err))
        }
    }
})