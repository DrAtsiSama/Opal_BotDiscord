/* Création des différents modèles (Schéma) de données que l'on retrouvera dans la Base De Donnée */
const { Schema, model } = require('mongoose');
// Schema Discord
const guildSchema = Schema({
    id: String,
    prefix: {
        type: String,
        default: '?'
    }
});
module.exports = {
    Guild: model('Guild', guildSchema)
}