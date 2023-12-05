const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    idMarket: { type: mongoose.Schema.Types.ObjectId, ref: 'Market' },
    expire: { type: Date, required: true },
    quantity: { type: Number, required: true },
    state: { type: Number, required: true }, //
}, {
    timestamps: true
});

module.exports = mongoose.model('Store', StoreSchema);
