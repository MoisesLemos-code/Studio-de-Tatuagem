const ClienteFoto = require('../models/ClienteFoto');
const TattooFoto = require('../models/TattooFoto');
const Foto = require('../models/Foto');
const fs = require('fs');
const path = require('path');

module.exports = {

  async storeFotoCliente(req, res) {
    const obj = await ClienteFoto.findOne({ cliente_id: req.params.id });

    const fotoFind = await Foto.findOne({ cliente_id: req.params.id });
    let foto = null;
    if (fotoFind) {
      await Foto.deleteOne({ _id: fotoFind._id })
      try {
        const caminho = path.resolve(__dirname, '..', '..', 'tmp', fotoFind.path)
        fs.unlinkSync(caminho)
      } catch (err) {
        console.log(err)
      }
      foto = await Foto.create({
        cliente_id: obj.cliente_id,
        title: req.file.originalname,
        path: req.file.key,
      });
    } else {
      foto = await Foto.create({
        cliente_id: obj.cliente_id,
        title: req.file.originalname,
        path: req.file.key,
      });
    }
    return res.json(foto);
  },
  async storeFotoTattoo(req, res) {
    const obj = await TattooFoto.findOne({ tattoo_id: req.params.id });

    const fotoFind = await Foto.findOne({ tattoo_id: req.params.id });
    let foto = null;
    if (fotoFind) {
      await Foto.deleteOne({ _id: fotoFind._id })
      try {
        const caminho = path.resolve(__dirname, '..', '..', 'tmp', fotoFind.path)
        fs.unlinkSync(caminho)
      } catch (err) {
        console.log(err)
      }
      foto = await Foto.create({
        tattoo_id: obj.tattoo_id,
        title: req.file.originalname,
        path: req.file.key,
      });
    } else {
      foto = await Foto.create({
        tattoo_id: obj.tattoo_id,
        title: req.file.originalname,
        path: req.file.key,
      });
    }
    return res.json(foto);
  },
  async showCliente(req, res) {
    const foto = await Foto.findOne({ cliente_id: req.params.id });

    return res.json(foto);
  },
  async showTattoo(req, res) {
    const foto = await Foto.findOne({ tattoo_id: req.params.id });

    return res.json(foto);
  },
}
