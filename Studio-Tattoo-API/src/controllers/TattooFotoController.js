const TattooFoto = require('../models/TattooFoto');


module.exports = {
  async index(req, res) {
    const tattoo = await TattooFoto.findOne({ tattoo_id: req.params.id });
    return res.json(tattoo);
  },
  async list(req, res) {
    const TattooFotos = await TattooFoto.find({});
    return res.json(TattooFotos);
  },
  async store(obj) {
    //Inserir no banco de dados
    const tattoo = await TattooFoto.create({
      tattoo_id: obj.id
    });

    return tattoo;
  },
  async destroy(id) {
    await TattooFoto.deleteOne({ tattoo_id: id });
  },
  async update(req, res) {
    const tattoo = await TattooFoto.updateOne({ tattoo_id: obj.id }, req.body);
    return res.json(tattoo);
  },

}