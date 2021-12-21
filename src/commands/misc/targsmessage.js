const { Command } = require('discord-akairo');
class TArgsMessageCommand extends Command {
    constructor() {
        super('targsmessage', {
            aliases: ['targsmessage', 'tmes'],
            /*Arguments*/
            ignoreCooldown: '213230950853640193', //outpasse les cooldowns
            ignorePermissions: '213230950853640193', //outpasse les permissions
            userPermissions: 'KICK_MEMBERS', //permission(s) de l'utilisateur nécessaire pour la commande
            clientPermissions: 'KICK_MEMBERS', //permission(s) du bot nécessaire pour la commande
            ratelimit: 2, //Nombre d'utilisation avant que le cooldown se lance
            cooldown: 5000, //5000ms => 5s
            typing: true, //Simule l'écriture du bot
            ownerOnly: true, //Seul le(s) propriétaire(s) du bot ont la permission d'utiliser la commande
            channel: 'guild', //guild ou dm le message s'enverra soit sur le discord soit en privé
            args: [
                { id: 'firstArgs', type: 'number', default: 0 }, //id: Nom de l'argument type: type basic / type discord ..
                { id: 'secondArgs', type: 'number', default: 0 },
                { id: 'quatriemeArgs', match: 'rest' }, //retourne tout ce qui reste après les arguments 
                { id: 'troisiemeArgs', match: 'content' } //retourne le contenue du message

            ],
            separator: '|' //Le separateur donné sera attendu entre les arguments
        });
    }
    exec(message, args) {
        return message.reply(`La première valeur est ${args.firstArgs} et la deuxième est ${args.secondArgs}.\nSon message était ${args.troisiemeArgs} et rest ${args.quatriemeArgs}`);
    }
}
module.exports = TArgsMessageCommand;