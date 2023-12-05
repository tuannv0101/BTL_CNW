const mongoose = require('mongoose');

const CookSchema = new mongoose.Schema({
    idRecipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    state: { type: Number, required: true }, //
    date: { type: Date, required: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cook', CookSchema);
