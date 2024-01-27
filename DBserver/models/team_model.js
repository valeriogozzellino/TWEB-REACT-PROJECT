const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema(
    {
        team: {
            id: { type: Number, required: true },
            name: { type: String, required: true, max: 100 },
            code: { type: String, required: true, max: 10 },
            country: { type: String, required: true, max: 100 },
            founded: { type: Number, required: true },
            national: { type: Boolean, required: true },
            logo: { type: String, required: true },
        },
        venue: {
            id: { type: Number, required: true },
            name: { type: String, required: true, max: 100 },
            address: { type: String, required: true, max: 200 },
            city: { type: String, required: true, max: 100 },
            capacity: { type: Number, required: true },
            surface: { type: String, required: true, max: 50 },
            image: { type: String, required: true },
        },
    },
    { _id: false }
);

TeamSchema.set('toObject', { getters: true, virtuals: true });

const TeamModel = mongoose.model('teams', TeamSchema);
module.exports.TeamModel = TeamModel;
