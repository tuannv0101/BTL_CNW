const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    idFood: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', RecipeSchema);
