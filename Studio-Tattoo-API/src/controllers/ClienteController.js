const Cliente = require('../models/Cliente')

module.exports = {
  async store(req, res) {
    const { nome, endereco, email } = req.body;
    const obj = await Cliente.create({ nome, endereco, email });

    return res.json(obj);
  },
  async index(req, res) {
    const obj = await Cliente.findByPk(req.params.id);

    return res.json(obj)
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
  }, async destroy(req, res) {
    try {
      await Cliente.destroy({
        where: { id: req.params.id }
      });
    } catch (err) {
      return res.json({ status: 505, mensagem: "Não foi possível excluir, verfique se o cliente possui sessões!" })
    }
    return res.json({ mensagem: "ok" });
  },
};