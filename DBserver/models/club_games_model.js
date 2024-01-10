const mongoose = require('mongoose');

const ClubGamesSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        game_id: { type: Number, required: true },
        club_id: { type: Number, required: true },
        own_goals: { type: Number, required: true },
        own_manager_name: { type: String, required: true },
        opponent_id: { type: Number, required: true },
        opponent_goals: { type: Number, required: true },
        opponent_manager_name: { type: String, required: true },
        hosting: { type: String, required: true, enum: ['Home', 'Away'] },
        is_win: { type: Number, required: true }
    }
);

ClubGamesSchema.set('toObject', { getters: true, virtuals: true });

const ClubGamesModel = mongoose.model('ClubGame', ClubGamesSchema, 'club_games');


module.exports.ClubGamesModel = ClubGamesModel;
