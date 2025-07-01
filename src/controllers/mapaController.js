const Pontos = require('../models/PontosModel')

exports.mapa = async(req,res) => {
    const pontos = await Pontos.buscaPontos(req)
    res.render('mapa', {pontos: pontos, user: req.session.user})
    
}

exports.mostraMapa = async(req, res) =>{
    const pontos = await Pontos.buscaPontos(req)
    res.json(pontos)

}

exports.delete = async(req, res) =>{
    await Pontos.delete(req)
    res.redirect('/mapa');
}

exports.edit = async(req,res) =>{
    const ponto = await Pontos.edit(req);
    if (!ponto) return res.redirect('/mapa');
    res.render('pontos', { ponto: ponto });
}