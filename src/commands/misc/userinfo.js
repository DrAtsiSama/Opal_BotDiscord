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
    exec(message, args) {
        const guildMember = args.member;
        return message.channel.send({
            embeds: [
                this.client.functions.embed()
                .setAuthor(`\`${guildMember.displayName}\` (${guildMember.id})`, guildMember.user.displayAvatarURL())
                .setDescription(`
                    Compte créé le : ${guildMember.user.createdAt}
                    A rejoint le Discord le : ${guildMember.joinedAt}
                    Bot : ${guildMember.user.bot}
                    Role(s) : ${guildMember.roles.cache.map(role => role.name).join(', ')}
                `)
            ]
        });
    }
}
module.exports = UserInfoCommand;