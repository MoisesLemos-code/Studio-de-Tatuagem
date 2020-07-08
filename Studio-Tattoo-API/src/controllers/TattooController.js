const Tattoo = require('../models/Tattoo')
const Sessao = require('../models/Sessao')
const TattooFotoController = require('./TattooFotoController')

module.exports = {
  async store(req, res) {
    const tattoo = req.body;
    const obj = await Tattoo.create(tattoo);
    TattooFotoController.store(obj)
    const sessao = await Sessao.findByPk(tattoo.sessao_id);
    sessao.update({
      ...sessao,
      total_liquido: sessao.total_liquido + parseFloat(tattoo.valor)
    })
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
    const objTattoo = await Tattoo.findByPk(req.params.id);
    const objSessao = await Sessao.findByPk(objTattoo.sessao_id)

    if (objSessao.status === 'Concluída') {
      return res.json({ status: 505, mensagem: "Não é possível alterar uma tatuagem de um sessão fechada!" })
    }

    const obj = await Tattoo.update(
      req.body,
      {
        where: { id: req.params.id }
      }
    )
    const total = objSessao.total_liquido - objTattoo.valor
    objSessao.update({
      ...objSessao,
      total_liquido: total + req.body.valor
    })

    return res.json(obj)
  },
  async destroy(req, res) {
    const objTattoo = await Tattoo.findByPk(req.params.id);
    const objSessao = await Sessao.findByPk(objTattoo.sessao_id)

    if (objSessao.status === 'Concluída') {
      return res.json({ status: 505, mensagem: "Não é possível excluir uma tatuagem de um sessão fechada!" })
    }

    await Tattoo.destroy({
      where: { id: req.params.id }
    });
    TattooFotoController.destroy(req.params.id)
    return res.json({ success: "ok" });
  },
};