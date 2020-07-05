const Sessao = require('../models/Sessao')
const Cliente = require('../models/Cliente')
const Tattoo = require('../models/Tattoo')
const Tattoo_item = require('../models/Tattoo_item');

module.exports = {
  async store(req, res) {
    const {
      status,
      total_acrescimo,
      total_desconto,
      total_liquido,
      cliente_id
    } = req.body;

    if (cliente_id != null) {
      const cliente = await Cliente.findByPk(cliente_id)

      if (!cliente) {
        return res.status(400).json({ error: 'Cliente não encontrado!' })
      }
    }
    const obj = await Sessao.create({
      status,
      total_acrescimo,
      total_desconto,
      total_liquido,
      cliente_id
    });

    return res.json(obj);
  },
  async storeItems(req, res) {
    const { tattoos } = req.body

    const sessao = await Sessao.findByPk(req.params.id);
    if (!sessao) {
      return res.status(400).json({ error: 'Sessao não encontrada!', id: req.params.id })
    }

    if (tattoos && tattoos.length > 0) {

      let tattoo = null;

      for (let i = 0; i < tattoos.length; i++) {
        tattoo = await Tattoo.findByPk(tattoos[i].tattoo_id)
        if (!tattoo) {
          return res.status(400).json({ error: 'Tattoo não encontrado!', id: tattoos[i].tattoo_id })
        }
        sessao.addTattoos(tattoo, {
          through: {
            desconto: tattoos[i].desconto,
            acrescimo: tattoos[i].acrescimo,
            quantidade: tattoos[i].quantidade,
            valor: tattoos[i].valor,
            total: tattoos[i].total
          }
        })
      }
    }
    return res.json(tattoos)
  },
  async index(req, res) {
    const obj = await Sessao.findByPk(req.params.id, {
      include: [
        {
          model: Cliente,
          as: 'cliente'
        },
        {
          model: Tattoo,
          as: 'tattoos'
        }
      ],
    });

    return res.json(obj)
  },
  async list(req, res) {
    const obj = await Sessao.findAll({
      order: [
        ['id', 'DESC']
      ],
      include: [
        {
          model: Cliente,
          as: 'cliente'
        }
      ]
    });

    return res.json(obj)
  },
  async update(req, res) {
    try {
      const { tattoos, ...data } = req.body;

      const sessao = await Sessao.findByPk(req.params.id);
      sessao.update(data)
      for (let i = 0; i < tattoos.length; i++) {
        tattoo = await Tattoo.findByPk(tattoos[i].tattoo_id)
        if (!tattoo) {
          return res.status(400).json({ error: 'Tattoo não encontrada!', id: tattoos[i].tattoo_id })
        }
        sessao.addTattoos(tattoo, {
          through: {
            desconto: tattoos[i].desconto,
            acrescimo: tattoos[i].acrescimo,
            quantidade: tattoos[i].quantidade,
            valor: tattoos[i].valor,
            total: tattoos[i].total
          }
        })
      }
      return res.status(200).json(sessao);
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Falha ao atualizar sessao!' })
    }
  },
  async destroy(req, res) {
    await Sessao.destroy({
      where: { id: req.params.id }
    });
    return res.json({ success: "ok" });
  },
  async destroyItemSessao(req, res) {

    const sessao = await Sessao.findByPk(req.params.id_sessao);
    if (!sessao) {
      return res.status(400).json({ error: 'Sessao não encontrada!', id: req.params.id })
    }
    item_sessao = await Tattoo_item.findOne({
      where: { sessao_id: req.params.id_sessao, tattoo_id: req.params.id_item }
    })
    if (!item_sessao) {
      return res.status(400).json({ error: 'Item não encontrado!', id: req.params.id_item })
    }
    await Tattoo_item.destroy({
      where: { sessao_id: req.params.id_sessao, tattoo_id: req.params.id_item }
    })
    return res.json({ success: "ok" });
  }
};