let app_login = new Vue({
    el: '#app_login',
    data: {
        login: false,
        name_user: '',
        pass_user: '',
        message: '',
        usuario_name:'',
        usuario_apellido:'',
        usuario_email:'',

        register: false,

        current_view:'Dashboard',
        menu_collapsed: false
    },
    created(){
        if(location.href.includes('?')){
            this.current_view = localStorage.getItem('current_view')
        }

        let logued = document.querySelector('body').getAttribute('data_login')

        if(logued == true) this.login = true
    },
    watch: {
        login(val){
            if(val){
                this.login_user()
            }
        },
        current_view(){
            if(localStorage.getItem('current_view')){
                localStorage.removeItem('current_view')
            }
            localStorage.setItem('current_view', this.current_view)
        }
    },
    methods: {
        login_user: function(){
            if(!this.login){
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
                            localStorage.setItem('usuario', JSON.stringify(response.datos))
    
                            app.login = true
                            app.message = 'Ingresando...'
    
                            setTimeout(() => {
                                location.reload()
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
            } else {
                let user_info = JSON.parse(localStorage.getItem('usuario'))

                this.usuario_name = user_info[0]['nombre']
                this.usuario_apellido = user_info[0]['apellido']
                this.usuario_email = user_info[0]['email']
                this.name_user = user_info[0]['username']

                this.setUserAvatar()
            }
        },
        setUserAvatar: function(){
            let avatar_box = document.querySelector("#user_avatar"),
                avatar_box_txt = document.querySelector("#user_avatar span"),
                random_color = [
                    "#27ae60",
                    "#2980b9",
                    "#9b59b6",
                    "#e67e22",
                    "#e74c3c",
                    "#1abc9c",
                    "#f39c12",
                ]

            avatar_box.style.backgroundColor = random_color[Math.floor(Math.random() * 7) + 1];
            
            avatar_box_txt.innerHTML = this.usuario_name.substring(0, 1)
        },
        changeView: function(txt, event){
            event.preventDefault()
            this.current_view = txt

            history.pushState(null, "", "admin?");
        },
        collapse_menu: function(){
            let menu = document.querySelector('aside')


            this.menu_collapsed = this.menu_collapsed ? false : true

            menu.classList.toggle('collapsed')
        }
    }
})