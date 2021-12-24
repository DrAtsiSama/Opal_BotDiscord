const { Command } = require('discord-akairo');
class KickCommand extends Command {
    constructor() {
        super('kick', {
            category: 'Modération',
            aliases: ['kick'],
            channel: 'guild',
            description: {
                content: `Eject un utilisateur du Serveur.`,
                usage: 'kick <membre> <raison>',
                exemples: ['kick @Chausette', 'kick @Chausette Car je le peux !']
            },
            args: [
                { id: 'member', type: 'member' },
                { id: 'raison', type: 'string', match: 'restContent' }
            ],
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS']
        });
    }
    async exec(message, { member, raison }) {
        const logChannel = this.client.channels.cache.get('805091401900752936');
        if (!raison) raison = 'Raison non spécifiée !';
        member ? member.kick(raison) : message.channel.send("L'utilisateur n'existe plus.");
        const embed = this.client.functions.embed()
            .setAuthor(`${member.user.username} (${member.user.id})`, member.user.displayAvatarURL())
            .setDescription("Kick !")
            .setTimestamp();
        await logChannel.send({ embeds: [embed] })
            .catch(() => console.log(`Un problème est survenue lors de l'envoie du message (commande kick).`));
    }
}
module.exports = KickCommand;