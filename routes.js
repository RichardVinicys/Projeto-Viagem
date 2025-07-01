const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')
const pontosController = require('./src/controllers/pontoController')
const mapaController = require('./src/controllers/mapaController')

const {loginRequire} = require('./src/middlewares/middleware')

route.get('/', homeController.index);

route.get('/cadastro', loginController.index)

route.get('/ponto', loginRequire, pontosController.cadastro)
route.get('/logout', loginController.logout)
route.get('/ponto/delete/:id', loginRequire, mapaController.delete)

route.get('/mapa', loginRequire,  mapaController.mapa)
route.get('/mapa/ponto', loginRequire, mapaController.mostraMapa)
route.get('/ponto/index/:id',loginRequire, mapaController.edit)
route.post('/ponto/edit/:id', loginRequire, pontosController.editIndex)


route.post('/cadastro/cadastro', loginController.cadastro)
route.post('/cadastro/login', loginController.login)
route.post('/ponto/cadastro', loginRequire, pontosController.pontos)



module.exports = route;