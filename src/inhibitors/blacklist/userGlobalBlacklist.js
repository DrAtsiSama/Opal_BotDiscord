const { Inhibitor } = require('discord-akairo');
class UserGlobalBlacklistInhibitor extends Inhibitor {
    constructor() {
        super(
            'userGlobalBlacklist', {
                reason: 'Vous êtes sur ma blacklist.', //raison du blocage (ex: Vous êtes blacklister)
                type: 'post',
                priority: 2
            }
        )
    }
    async exec(message) {
        const userGlobalBlacklist = await this.client.moderation.get(message.guild);
        return userGlobalBlacklist.blacklist.users.includes(message.author.id);
    }
}
module.exports = UserGlobalBlacklistInhibitor;