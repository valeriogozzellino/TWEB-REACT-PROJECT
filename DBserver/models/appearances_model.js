const mongoose = require('mongoose');

const AppearancesSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    appearance_id: { type: String, required: true },
    game_id: { type: Number, required: true },
    player_id: { type: Number, required: true },
    player_club_id: { type: Number, required: true },
    player_current_club_id: { type: Number, required: true },
    date: { type: Date, required: true },
    player_name: { type: String, required: true },
    competition_id: { type: String, required: true },
    yellow_cards: { type: Number, required: true },
    red_cards: { type: Number, required: true },
    goals: { type: Number, required: true },
    assists: { type: Number, required: true },
    minutes_played: { type: Number, required: true }
});

AppearancesSchema.set('toObject', { getters: true, virtuals: true });

const AppearancesModel = mongoose.model('Appearance', AppearancesSchema, 'appearances');

module.exports.AppearancesModel = AppearancesModel;
