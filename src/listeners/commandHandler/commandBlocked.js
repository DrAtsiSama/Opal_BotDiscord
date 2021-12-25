const { Listener } = require('discord-akairo');
class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }
    async exec(message, command, reason) {
        message.reply(`Votre command \`${command}\` a été bloqué pour la raison suivante : **${reason}**.`)
    }
}
module.exports = CommandBlockedListener;