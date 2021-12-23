const { Command } = require('discord-akairo');
class BotInfoCommand extends Command {
    constructor() {
        super('botinfo', {
            category: 'Misc',
            aliases: ['botinfo'],
            channel: 'guild',
            description: {
                content: `Affiche les informations d'Opal.`,
                usage: 'botinfo',
                exemples: ['botinfo']
            }
        });
    }
    exec(message) {
        const botUser = this.client;
        const humanBotUsers = this.client.users.cache.filter(user => !user.bot);
        return message.channel.send({
            embeds: [
                botUser.functions.embed()
                .setAuthor(botUser.user.username, botUser.user.displayAvatarURL())
                .setDescription(`
                    Createur [Dr_AtsiSama](https://github.com/DarekaSama/Opal_BotDiscord)
                    Session: ${botUser.uptime}
                    **------------**
                    **Utilisateurs** : ${humanBotUsers.size}
                    **Serveurs** : ${botUser.guilds.cache.size}
                    **Salons** : ${botUser.channels.cache.size}
                  `)
            ]
        });
    }
}
module.exports = BotInfoCommand;