const { Listener } = require('discord-akairo');
class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }
    async exec() { //Pas besoin d'emettre client  étant dans le discord akairo
        this.client.user.setPresence({
            activities: [{
                name: 'Dr_AtsiSamaGames',
                type: 'COMPETING'
            }],
            status: 'dnd'
        });
        const guild = [];
        this.client.guilds.cache.map(e => guild.push(e));
        guild.forEach(async g => {
            const data = await this.client.guildSettings.get(g);
            if (!data) this.client.guildSettings.create({ id: g.id });
        }); // Verifie les id 1 par 1 et ajoutes ceux inconnus (Correct tant qu'on est dans les 200 -300 serveurs si on redémarre pas trop souvent ~)
        const moderationDB = await this.client.moderation.get();
        console.log(` ~ file : ready.js ~ ligne 23 ~ ReadyListener ~ exec ~ moderationDB `, moderationDB);
        if (moderationDB == undefined) this.client.moderation.create();
        const humanUsers = this.client.users.cache.filter(user => !user.bot); // Utilisateurs Humains
        const textChannel = this.client.channels.cache.filter(channel => channel.type == "GUILD_TEXT"); // Salons textuels
        console.log(`Parfaitement en marche. \n${this.client.guilds.cache.size} Serveur(s).\n${humanUsers.size} utilisateur(s).\n${textChannel.size} salon(s).`);
    }
}
module.exports = ReadyListener;