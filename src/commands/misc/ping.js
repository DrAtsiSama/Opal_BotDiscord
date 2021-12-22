const { Command } = require('discord-akairo');
class PingCommand extends Command {
    constructor() {
        super('ping', {
            category: 'Misc',
            aliases: ['ping'],
            description: {
                content: `Affiche la latence d'Opal.`,
                usage: 'ping',
                exemples: ['ping']
            }
        });
    }
    exec(message) {
        return message.reply('Pong !');
    }
}
module.exports = PingCommand;