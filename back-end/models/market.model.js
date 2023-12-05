const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateToBuy: { type: Date, required: true },
    dateBought: { type: Date },
    idUserBought: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    state: { type: Number, required: true }, //
    quantity: { type: Number, required: true },
    idFood: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Market', MarketSchema);
