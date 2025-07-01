const Ponto = require('../models/PontosModel')

exports.cadastro = async (req, res) => {
    res.render('pontos', {
        ponto: {}
    })
}

exports.pontos = async (req, res) => {
    try {
        const ponto = new Ponto(req.body)
        await ponto.criar(req.session.user._id)

        if (ponto.errors.length > 0) {
            req.flash('errors', ponto.errors)
            req.session.save(function () {
                return res.redirect('/ponto');
            })
            return;
        }

        req.flash('success', 'Ponto Cadastrado com sucesso')
        req.session.save(function () {
            return res.redirect('/ponto');
        })


    } catch (e) {
        console.log(e)
        res.render('404')
    }


}

exports.editIndex = async (req, res) => {
    try{
        const ponto = new Ponto(req.body)
        await ponto.editando(req.params.id, req.session.user._id);

        if(ponto.errors.length > 0){
            req.flash('errors', ponto.errors)
            req.session.save(()=> res.redirect(`/ponto/index/${req.params.id}`))
            return;
        }
        

        req.flash('success', 'Ponto editado com sucesso')
        req.session.save(()=> res.redirect(`/ponto/index/${req.params.id}`))
        return

    }catch(e){
        console.log(e)
        res.render('404')
    }

}