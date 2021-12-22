const { Command } = require('discord-akairo');
class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
            category: 'Misc',
            aliases: ['userinfo', 'info'],
            /*Arguments*/
            ignoreCooldown: '213230950853640193', //outpasse les cooldowns
            ignorePermissions: '213230950853640193', //outpasse les permissions
            userPermissions: 'KICK_MEMBERS', //permission(s) de l'utilisateur nécessaire pour la commande
            clientPermissions: 'KICK_MEMBERS', //permission(s) du bot nécessaire pour la commande
            ratelimit: 2, //Nombre d'utilisation avant que le cooldown se lance
            cooldown: 5000, //5000ms => 5s
            typing: true, //Simule l'écriture du bot
            ownerOnly: false, //Seul le(s) propriétaire(s) du bot ont la permission d'utiliser la commande (par defaut false)
            channel: 'guild', //guild ou dm le message s'enverra soit sur le discord soit en privé
            args: [
                { id: 'member', type: 'member', default: message => message.member } //Personne mentionné ou soit par defaut
            ],
            description: {
                content: `Affiche les informations de l'utilisateur.`,
                usage: 'user(info) <membre>',
                exemples: ['userinfo', 'info @member']
            }
        });
    }
    exec(message, args) {
        return message.reply({
            embeds: [
                this.client.functions.embed()
                .setTitle(`\`${args.member.displayName}\` (${args.member.id})`)
                .setThumbnail(args.member.user.displayAvatarURL())
                .setDescription(`Compte créé le : ${args.member.user.createdAt}`)
            ]
        });
    }
}
module.exports = UserInfoCommand;