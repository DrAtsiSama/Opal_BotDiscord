const { Command } = require('discord-akairo');
class BanCommand extends Command {
    constructor() {
        super('ban', {
            category: 'Modération',
            aliases: ['ban'],
            channel: 'guild',
            description: {
                content: `Bannis un utilisateur du Serveur.`,
                usage: 'ban <membre> <raison>',
                exemples: ['ban @Chausette', 'ban @Chausette Car je le peux !']
            },
            args: [
                { id: 'member', type: 'member' },
                { id: 'raison', type: 'string', match: 'restContent' }
            ],
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS']
        });
    }
    async exec(message, { member, raison }) {
        const logChannel = this.client.channels.cache.get('805091401900752936');
        if (!raison) raison = 'Raison non spécifiée !';
        member ? member.ban({ days: 7, reason: raison }) : message.channel.send("L'utilisateur n'existe plus.");
        const embed = this.client.functions.embed()
            .setAuthor(`${member.user.username} (${member.user.id})`, member.user.displayAvatarURL())
            .setDescription("Bannissement !")
            .setTimestamp();
        await logChannel.send({ embeds: [embed] })
            .catch(() => console.log(`Un problème est survenue lors de l'envoie du message (commande ban).`));
    }
}
module.exports = BanCommand;