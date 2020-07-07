const { Schema, model } = require('mongoose');

const Foto = new Schema({
  cliente_id: {
    type: Schema.Types.Number,
    ref: 'ClienteFoto',
    required: false
  },
  tattoo_id: {
    type: Schema.Types.Number,
    ref: 'TattooFoto',
    required: false
  },
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

Foto.virtual('url').get(function () {
  const url = process.env.URL || 'http://localhost:3333';

  return `${url}/fotos/${encodeURIComponent(this.path)}`;
})

module.exports = model('Foto', Foto);