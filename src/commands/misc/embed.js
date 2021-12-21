const { Command } = require('discord-akairo');
class EmbedCommand extends Command {
    constructor() {
        super('embed', {
            aliases: ['embed']
        });
    }
    exec(message) {
        return message.channel.send({
            embeds: [
                this.client.functions.embed()
                .setDescription('Embed fonction')
                .addField("Champ 1", "Valeur 1er champ")
            ]
        }); //Embed template
    }
}
module.exports = EmbedCommand;