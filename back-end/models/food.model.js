const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    unit: { type: String, required: true },
    createdByAdmin: { type: Number, required: true }, // 0 or 1
    image: { type: String, required: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: Number, required: true }, // Meal or Ingredient
    quantity: { type: Number, required: true }, // use for Recipe
    isDeleted: { type: Number, required: true } // 0 or 1
}, {
    timestamps: true
});

module.exports = mongoose.model('Food', FoodSchema);
