const Tattoo = require('../models/Tattoo')
const TattooFotoController = require('./TattooFotoController')

module.exports = {
  async store(req, res) {
    const tattoo = req.body;
    const obj = await Tattoo.create(tattoo);
    TattooFotoController.store(obj)
    return res.json(obj);
  },
  async index(req, res) {
    const obj = await Tattoo.findByPk(req.params.id);

    return res.json(obj)
  },
  async list(req, res) {
    const obj = await Tattoo.findAll({
      order: [
        ['id', 'DESC']
      ]
    });

    return res.json(obj)
  },
  async update(req, res) {
    const obj = await Tattoo.update(
      req.body,
      {
        where: { id: req.params.id }
      }
    )
    return res.status(200).json(obj)
  },
  async destroy(req, res) {
    await Tattoo.destroy({
      where: { id: req.params.id }
    });
    TattooFotoController.destroy(req.params.id)
    return res.json({ success: "ok" });
  },
};