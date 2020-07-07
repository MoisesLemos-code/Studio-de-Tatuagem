const { Schema, model } = require('mongoose');

const TattooSchema = new Schema({
    tattoo_id: {
        type: Schema.Types.Number,
        required: false
    },
},
    {
        timestamps: true
    });

module.exports = model('TattooFoto', TattooSchema);	