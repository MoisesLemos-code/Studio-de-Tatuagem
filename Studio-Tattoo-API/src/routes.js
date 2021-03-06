const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const ClienteController = require('./controllers/ClienteController')
const TattooController = require('./controllers/TattooController')
const SessaoController = require('./controllers/SessaoController')
const FotoController = require('./controllers/FotoController')
const ClienteFotoController = require('./controllers/ClienteFotoController')
const TattooFotoController = require('./controllers/TattooFotoController')

const routes = express.Router();

routes.post('/cliente/:id/fotos', multer(multerConfig).single('foto'), FotoController.storeFotoCliente);
routes.post('/tattoo/:id/fotos', multer(multerConfig).single('foto'), FotoController.storeFotoTattoo);
routes.get("/clientefoto/:id/show/", FotoController.showCliente);
routes.get("/tattoofoto/:id/show/", FotoController.showTattoo);


routes.get("/clientefoto/:id", ClienteFotoController.index);
routes.get("/tattoofoto/:id", TattooFotoController.index);
routes.get("/clientefoto/list/", ClienteFotoController.list);
routes.get("/tattoofoto/list/", TattooFotoController.list);


routes.post('/cliente/insert', ClienteController.store)
routes.get('/cliente/list', ClienteController.list)
routes.get('/cliente/index/:id', ClienteController.index)
routes.get('/cliente/index/nome/:nome', ClienteController.indexNome)
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

module.exports = routes;
