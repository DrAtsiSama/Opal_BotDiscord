const { Listener } = require('discord-akairo');
class MissingPermissionsListener extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }
    async exec(message, command, type, missing) {
        if (type == 'client') {
            return await message.reply(`Je n'ai pas ll${missing.length > 1 ? 'es' : 'a'} permission${missing.length > 1 ? 's' : ''} : \`${missing}\`.\nPour la commande : \`${command.id}\`.`);
        } else {
            return await message.reply(`Tu n'as pas l${missing.length > 1 ? 'es' : 'a'} permission${missing.length > 1 ? 's' : ''} : \`${missing}\`.\nPour la commande : \`${command.id}\`.`);
        }
    }
}
module.exports = MissingPermissionsListener;