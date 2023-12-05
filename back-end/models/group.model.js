const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    idLeader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    markets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Market' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Group', GroupSchema);