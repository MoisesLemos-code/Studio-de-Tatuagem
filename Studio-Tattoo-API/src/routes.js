const express = require('express');

const ClienteController = require('./controllers/ClienteController')
const TattooController = require('./controllers/TattooController')
const SessaoController = require('./controllers/SessaoController')


const routes = express.Router();

routes.post('/cliente/insert', ClienteController.store)
routes.get('/cliente/list', ClienteController.list)
routes.get('/cliente/index/:id', ClienteController.index)
routes.put('/cliente/update/:id', ClienteController.update)
routes.delete('/cliente/delete/:id', ClienteController.destroy)

routes.post('/tattoo/insert', TattooController.store)
routes.get('/tattoo/list', TattooController.list)
routes.get('/tattoo/index/:id', TattooController.index)
routes.put('/tattoo/update/:id', TattooController.update)
routes.delete('/tattoo/delete/:id', TattooController.destroy)

routes.post('/sessao/insert/', SessaoController.store)
routes.post('/sessao/insert/item/:id', SessaoController.storeItems)
routes.get('/sessao/list', SessaoController.list)
routes.get('/sessao/list/page', SessaoController.listPage)
routes.get('/sessao/index/:id', SessaoController.index)
routes.put('/sessao/update/:id', SessaoController.update)
routes.delete('/sessao/delete/:id', SessaoController.destroy)
routes.delete('/delete/sessao/:id_sessao/item/:id_item',
  SessaoController.destroyItemSessao)

module.exports = routes;
