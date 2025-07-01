const Cadastro = require('../models//CadastroModel')

exports.index = (req, res) => {
    res.render('login')
}

exports.cadastro = async (req, res) => {
    try {
        const cadastro = new Cadastro(req.body)
        await cadastro.register()

        if (cadastro.errors.length > 0) {
            req.flash('errors', cadastro.errors)
            req.session.save(function () {
                return res.redirect('/cadastro')
            })
            return;
        }

        req.flash('success', 'Usuario cadastrado com sucesso')
        req.session.save(function () {
            return res.redirect('/cadastro')
        })
    } catch (e) {
        console.log(e)
        res.send(`ERROR 404`)
    }

}

exports.login = async (req, res) => {
    try {
        const cadastro = new Cadastro(req.body)
        await cadastro.login()

        if (cadastro.errors.length > 0) {
            req.flash('errors', cadastro.errors)
            req.session.save(function () {
                return res.redirect('/cadastro')
            })
            return;
        }

        req.flash('success', 'Voce entrou no sistema!')
        req.session.user = cadastro.user
        req.session.save(function () {
            return res.redirect('/cadastro')
        })


    } catch (e) {
        console.log(e)
        res.send(`ERROR 404`)
    }

}

exports.logout = (req, res) =>{
    req.session.destroy(() =>{
        res.redirect('/')
    });
    
}