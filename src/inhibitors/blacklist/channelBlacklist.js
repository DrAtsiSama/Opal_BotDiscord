const { Inhibitor } = require('discord-akairo');
class ChannelBlacklistInhibitor extends Inhibitor {
    constructor() {
        super(
            'channelBlacklist', {
                reason: 'Opal ne peut vous aider dans ce Salon', //raison du blocage (ex: Vous êtes blacklister)
                type: 'post', //Qu'elle événement va enclencher une vérification
                priority: 1 //Sur les différentes autorisations laquelle primes (ordre) fonctionne par défaut dans l'ordre des fichiers
            }
        )
    }
    async exec(message) {
        const channelBlacklist = await this.client.guildSettings.get(message.guild);
        return channelBlacklist.blacklist.channels.includes(message.channel.id);
    }
}
module.exports = ChannelBlacklistInhibitor;