/* Création des différents modèles (Schéma) de données que l'on retrouvera dans la Base De Donnée */
const { Schema, model } = require('mongoose');
// Schema Discord
const guildSchema = Schema({
    id: String,
    prefix: {
        type: String,
        default: '?'
    },
    blacklist: {
        channels: [],
        users: []
    }
});
//Schema Moderation
const moderationSchema = Schema({
    id: { type: Number, default: 1 },
    blacklist: {
        guild: [],
        users: []
    }
});
module.exports = {
    Guild: model('Guild', guildSchema),
    Moderation: model('Moderation', moderationSchema),
}