const { MessageEmbed } = require("discord.js")

/* Fichier Afin d'exporter les fonctions qu'on utilisera le plus souvent*/
module.exports = {
    embed: function() {
        return new MessageEmbed().setColor('#dc143c');
    }
}