const Cliente = require('../models/Cliente')
const ClienteFotoController = require('./ClienteFotoController')
const { Op } = require('sequelize');

module.exports = {
  async store(req, res) {
    const { nome, endereco, email } = req.body;
    const obj = await Cliente.create({ nome, endereco, email });
    ClienteFotoController.store(obj)
    return res.json(obj);
  },
  async index(req, res) {
    const obj = await Cliente.findByPk(req.params.id);

    return res.json(obj)
  },
  async indexNome(req, res) {
    try {
      const obj = await Cliente.findAll({
        where: {
          nome: {
            [Op.like]: req.params.nome + '%'
          }
        },
      })
      return res.status(200).json(obj)
    } catch (err) {
      console.log(err)
      return res.json({ status: 505, mensagem: "Não foi possível localizar o cliente!" })
    }
  },
  async list(req, res) {
    const obj = await Cliente.findAll({
      order: [
        ['id', 'DESC']
      ]
    });
    return res.json(obj)
  },
  async update(req, res) {
    const obj = await Cliente.update(
      req.body,
      {
        where: { id: req.params.id }
      }
    )
    return res.status(200).json(obj)
  },
  async destroy(req, res) {
    try {
      await Cliente.destroy({
        where: { id: req.params.id }
      });
      ClienteFotoController.destroy(req.params.id)
    } catch (err) {
      return res.json({ status: 505, mensagem: "Não foi possível excluir, verfique se o cliente possui sessões!" })
    }
    return res.json({ mensagem: "ok" });
  },
};