const { Inhibitor } = require('discord-akairo');
class UserGuildBlacklistInhibitor extends Inhibitor {
    constructor() {
        super(
            'userGuildBlacklist', {
                reason: 'Vous êtes dans la blacklist de ce Serveur.', //raison du blocage (ex: Vous êtes blacklister)
                type: 'post',
                priority: 2
            }
        )
    }
    async exec(message) {
        const userGuildBlacklist = await this.client.guildSettings.get(message.guild);
        return userGuildBlacklist.blacklist.users.includes(message.author.id);
    }
}
module.exports = UserGuildBlacklistInhibitor;