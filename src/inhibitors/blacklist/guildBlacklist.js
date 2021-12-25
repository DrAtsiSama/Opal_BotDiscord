const { Inhibitor } = require('discord-akairo');
class GuildBlacklistInhibitor extends Inhibitor {
    constructor() {
        super(
            'GuildBlacklist', {
                reason: 'Ce Serveur est sur ma blacklist.', //raison du blocage (ex: Vous êtes blacklister)
                type: 'post',
                priority: 2
            }
        )
    }
    async exec(message) {
        const GuildBlacklist = await this.client.moderation.get(message.guild);
        return GuildBlacklist.blacklist.guild.includes(message.guild.id);
    }
}
module.exports = GuildBlacklistInhibitor;