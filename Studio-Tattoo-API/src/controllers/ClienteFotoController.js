const ClienteFoto = require('../models/ClienteFoto');


module.exports = {
  async index(req, res) {
    const cliente = await ClienteFoto.findOne({ cliente_id: req.params.id });
    return res.json(cliente);
  },
  async list(req, res) {
    const ClienteFotos = await ClienteFoto.find({});
    return res.json(ClienteFotos);
  },
  async store(obj) {
    //Inserir no banco de dados
    const cliente = await ClienteFoto.create({
      cliente_id: obj.id
    });
    return cliente;
  },
  async destroy(id) {
    await ClienteFoto.deleteOne({ cliente_id: id });
  },
  async update(req, res) {
    const cliente = await ClienteFoto.updateOne({ cliente_id: obj.id }, req.body);
    return res.json(cliente);
  },

}