const { Inhibitor } = require('discord-akairo');
class UserBlacklistInhibitor extends Inhibitor {
    constructor() {
        super(
            'userBlacklist', {
                reason: 'blacklist', //raison du blocage (ex: Vous êtes blacklister)
                type: 'post',
                priority: 2
            }
        )
    }
    exec(message) {
        const userBlacklist = ['300288760766267392'];
        return userBlacklist.includes(message.author.id);
    }
}
module.exports = UserBlacklistInhibitor;