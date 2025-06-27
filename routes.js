const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')
const pontosController = require('./src/controllers/pontoController')
const mapaController = require('./src/controllers/mapaController')

route.get('/', homeController.index);
route.get('/cadastro', loginController.index)
route.get('/ponto', pontosController.cadastro)
route.get('/mapa', mapaController.mapa)
route.get('/logout', loginController.logout)


route.post('/cadastro/cadastro', loginController.cadastro)
route.post('/cadastro/login', loginController.login)


module.exports = route;