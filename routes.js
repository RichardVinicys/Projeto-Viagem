const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')
const pontosController = require('./src/controllers/pontoController')
const mapaController = require('./src/controllers/mapaController')

route.get('/', homeController.index);
route.get('/cadastro', loginController.login)
route.get('/ponto', pontosController.cadastro)
route.get('/mapa', mapaController.mapa)



module.exports = route;