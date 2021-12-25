const { Listener } = require('discord-akairo');
class GuildCreateAddListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }
    async exec(guild) {
        this.client.guildSettings.create(guild);
    }
}
module.exports = GuildCreateAddListener;