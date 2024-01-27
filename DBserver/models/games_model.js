const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema(
    {
            game_id: { type: Number, required: true },
            competition_id: { type: String, required: true },
            season: { type: Number, required: true },
            round: { type: String, required: true },
            date: { type: Date, required: true },
            home_club_id: { type: Number, required: true },
            away_club_id: { type: Number, required: true },
            home_club_goals: { type: Number, required: true },
            away_club_goals: { type: Number, required: true },
            home_club_position: { type: Number, required: true },
            away_club_position: { type: Number, required: true },
            home_club_manager_name: { type: String, required: true, max: 100 },
            away_club_manager_name: { type: String, required: true, max: 100 },
            stadium: { type: String, required: true, max: 100 },
            attendance: { type: Number, required: true },
            referee: { type: String },
            url: { type: String },
            home_club_name: { type: String, required: true, max: 100 },
            away_club_name: { type: String, required: true, max: 100 },
            aggregate: { type: String },
            competition_type: { type: String },
    }
);

GameSchema.set('toObject', { getters: true, virtuals: true });

const GameModel = mongoose.model('Game', GameSchema, 'games');

module.exports.GameModel = GameModel;