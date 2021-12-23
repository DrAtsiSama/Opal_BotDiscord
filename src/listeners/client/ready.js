const { Listener } = require('discord-akairo');
class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }
    exec() { //Pas besoin d'emettre client  étant dans le discord akairo
        this.client.user.setPresence({
            activities: [{
                name: 'Dr_AtsiSamaGames',
                type: 'COMPETING'
            }],
            status: 'dnd'
        });
        const humanUsers = this.client.users.cache.filter(user => !user.bot); // Utilisateurs Humains
        const textChannel = this.client.channels.cache.filter(channel => channel.type == "GUILD_TEXT"); // Salons textuels
        console.log(`Parfaitement en marche. \n${this.client.guilds.cache.size} Serveur(s).\n${humanUsers.size} utilisateur(s).\n${textChannel.size} salon(s).`);
    }
}
module.exports = ReadyListener;