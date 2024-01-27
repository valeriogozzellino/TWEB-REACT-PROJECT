const mongoose = require('mongoose');

// Define the schema for the game events documents
const GameEventSchema = new mongoose.Schema(
    {
        game_event_id: { type: String, required: true },
        date: { type: Date, required: true },
        game_id: { type: Number, required: true },
        minute: { type: Number, required: true },
        type: { type: String, required: true },
        club_id: { type: Number, required: true },
        player_id: { type: Number, required: true },
        description: { type: String, required: true }
    }
);

GameEventSchema.set('toObject', { getters: true, virtuals: true });

const GameEventModel = mongoose.model('GameEvent', GameEventSchema, 'game_events');

module.exports.GameEventModel = GameEventModel;