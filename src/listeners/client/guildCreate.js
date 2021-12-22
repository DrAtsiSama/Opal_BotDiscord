const { Listener } = require('discord-akairo');
const { Guild } = require('../../structures/Models');
class GuildCreateAddListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }
    async exec(guild) {
        await Guild.create({ id: guild.id }, err => {
            if (err) return console.log(`Erreur lors de l'ajout d'une Guild : `, err);
            console.log(`Nouveau serveur -> ${guild.name} (${guild.id}) !`);
        });
    }
}
module.exports = GuildCreateAddListener;