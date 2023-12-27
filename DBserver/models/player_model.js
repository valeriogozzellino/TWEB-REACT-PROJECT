const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema(
    {
            id: { type: Number, required: true },
            team_id: { type: Number, required: true },
            name: { type: String, required: true, max: 100 },
            age: { type: Number, required: true },
            number: { type: Number, required: true },
            position: { type: String, required: true, max: 100 },
            photo: { type: String, required: true },
    },
    { _id: false }
);

PlayerSchema.set('toObject', { getters: true, virtuals: true });

module.exports = mongoose.model('Player', PlayerSchema);


const PlayerModel = mongoose.model('players', PlayerSchema);
module.exports.PlayerModel = PlayerModel;
