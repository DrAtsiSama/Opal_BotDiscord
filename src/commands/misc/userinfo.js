const { Command } = require('discord-akairo');
class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
            category: 'Misc',
            aliases: ['userinfo'],
            channel: 'guild',
            description: {
                content: `Affiche les informations de l'utilisateur.`,
                usage: 'user(info) <membre>',
                exemples: ['userinfo', 'userinfo @member']
            },
            args: [
                { id: 'member', type: 'member', default: message => message.member } //Personne mentionné ou soit par defaut
            ],
        });
    }
    exec(message, { member }) {
        return message.channel.send({
            embeds: [
                this.client.functions.embed()
                .setAuthor(`\`${member.displayName}\` (${member.id})`, member.user.displayAvatarURL())
                .setDescription(`
                    Compte créé le : ${member.user.createdAt}
                    A rejoint le Discord le : ${member.joinedAt}
                    Bot : ${member.user.bot}
                    Role(s) : ${member.roles.cache.map(role => role.name).join(', ')}
                `)
            ]
        });
    }
}
module.exports = UserInfoCommand;