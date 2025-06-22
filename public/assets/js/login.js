const login = document.querySelector('.login');
        const cadastro = document.querySelector('.cadastro');
        const p = document.querySelector('.info-text');
        const button = document.querySelector('#info-btn')

        let flag = true;

        button.addEventListener('click', () =>{
            if(flag){
                cadastro.classList.remove('oculta')
                login.classList.add('oculta')
                p.innerHTML = 'Já tem conta? <br> Faça login';
                button.innerHTML = 'Login'
                return flag = false
            }
            else{
                cadastro.classList.add('oculta')
                login.classList.remove('oculta')
                p.innerHTML = 'Se não tem conta,<br> cadastre-se';
                button.innerHTML = 'Cadastre-se'
                return flag = true
            }
        })