const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: Number, required: true },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
