const { Schema, model } = require('mongoose');

const ClienteSchema = new Schema({
    cliente_id: {
        type: Schema.Types.Number,
        required: true
    },
    // fotos: [
    //     { type: Schema.Types.ObjectId, ref: "Foto" }
    // ]
},
    {
        timestamps: true
    });

module.exports = model('ClienteFoto', ClienteSchema);	