const { Command } = require('discord-akairo');
const { Guild } = require('../../structures/Models');
class UpdateAllCommand extends Command {
    constructor() {
        super('updateall', {
            category: 'dev',
            aliases: ['updateall', 'upall'],
            ownerOnly: true,
            description: {
                content: `Commande Propriètaire -> permet de mettre à jour les collections existantes dans la Base De Données.`,
                usage: 'updateall',
                exemples: ['updateall', 'upall']
            }
        });
    }
    async exec(message) {
        await Guild.updateMany({}, { blacklist: { channels: [], users: [] } }, { upsert: true })
            .then(c => console.log(`Serveurs trouvés : ${c.matchedCount}. Serveurs modifiés : ${c.modifiedCount}`))
    }
}
module.exports = UpdateAllCommand;
/* Modification type 
[1] : Modifier le Model (structures/Models.js)
[2] : Modifier updateall (src/commands/dev/updateall)
[3] : Verifier que tout s'est bien passé */