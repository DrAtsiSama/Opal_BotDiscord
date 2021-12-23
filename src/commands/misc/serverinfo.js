const { Command } = require('discord-akairo');
class ServerInfoCommand extends Command {
    constructor() {
        super('serverinfo', {
            category: 'Misc',
            aliases: ['serverinfo'],
            channel: 'guild',
            description: {
                content: `Affiche les informations du Serveur.`,
                usage: 'serverinfo',
                exemples: ['serverinfo']
            }
        });
    }
    async exec(message) {
        const guild = message.guild;
        const owner = await guild.fetchOwner();
        return message.channel.send({
            embeds: [
                this.client.functions.embed()
                .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
                .setDescription(`
                    Propriètaire : ${owner.displayName} (${owner.id})
                    Créer le : ${guild.createdAt}
                    **Utilisateurs** : ${guild.memberCount}
                    **Salons** : ${guild.channels.cache.size}
                  `)
            ]
        });
    }
}
module.exports = ServerInfoCommand;