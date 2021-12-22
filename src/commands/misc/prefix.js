const { Command } = require('discord-akairo');
class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            category: 'Misc',
            aliases: ['prefix'],
            cooldown: 5000,
            ownerOnly: true,
            channel: 'guild',
            args: [
                { id: 'newPrefix', type: 'string' }
            ],
            description: {
                content: `Modifie le Prefix du Serveur.`,
                usage: 'prefix <newPrefix>',
                exemples: ['prefix', 'prefix !']
            }
        });
    }
    async exec(message, args) {
        if (!args.newPrefix) return message.channel.send(`Prefix actuel -> \`${await this.handler.prefix(message)}\``);
        await this.client.guildSettings.update(message.guild, { prefix: args.newPrefix });
        return message.channel.send(`Le prefix du serveur vient de changer. Nouveau prefix : \`${args.newPrefix}\`.`)
    }
}
module.exports = PrefixCommand;