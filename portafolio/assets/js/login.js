let app_login = new Vue({
    el: '#app_login',
    data: {
        login: false,
        name_user: '',
        pass_user: ''
    },
    created(){},
    watch: {},
    methods: {
        login_user: function(){
            fetch('../api/api.php?action=login')
        }
    }
})