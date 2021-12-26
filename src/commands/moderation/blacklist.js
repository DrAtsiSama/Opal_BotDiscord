const { stripIndents } = require('common-tags/lib');
const { Command } = require('discord-akairo');
const { Guild, Moderation } = require('../../structures/Models');
class BlackListCommand extends Command {
    constructor() {
        super('blacklist', {
            category: 'Modération',
            aliases: ['blacklist', 'bl'],
            channel: 'guild',
            description: {
                content: `Permet la gestion de la BlackList du Serveur. (consultation, ajout, suppression)`,
                usage: 'blacklist <channel|guild|user|global> {add|rm} <idToBlacklist>',
                subCommand: 'channel|guild|user|global\nAction: add|rm',
                exemples: ['blacklist', 'bl guild', 'bl channel add 790924720589242369', 'blacklist guild rm 790924720589242369']
            },
            args: [
                { id: 'target', type: 'string' },
                { id: 'action', type: 'string' },
                { id: 'idToBlacklisted', type: 'string' },
            ],
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS']
        });
    }
    async exec(message, { target, action, idToBlacklisted }) {
        const local = await this.client.guildSettings.get(message.guild); // Salons | Utilisateurs
        const global = await this.client.moderation.get(); // Serveur | Global
        const guildBlacklistId = global.blacklist.guild.length == 0 ? "Aucun ID pour le moment" : global.blacklist.guild.join(', ');
        const userGlobalBlacklistId = global.blacklist.users.length == 0 ? "Aucun ID pour le moment" : global.blacklist.users.join(', ');
        const userBlacklistId = local.blacklist.users.length == 0 ? "Aucun ID pour le moment" : local.blacklist.users.join(', ');
        const channelBlacklistId = local.blacklist.channels.length == 0 ? "Aucun ID pour le moment" : local.blacklist.channels.join(', ');
        /* Blacklist - retourne les ID présent dans la blacklist (ranger par catégorie) */
        if (!target) {
            return message.channel.send(stripIndents `\`\`\`
            Serveur : ${guildBlacklistId}
            Utilisateur Global : ${userGlobalBlacklistId}
            Utilisateur : ${userBlacklistId}
            Salon : ${channelBlacklistId}
          \`\`\``);
        }
        /* Blacklist [channel|guild|user|global] - retourne tous les ID présent dans la catégorie voulue (target) */
        target = target.toLowerCase(); // Pour avoir la même convention dans nos tests
        if (!target.match(/^(channel|guild|user|global)$/)) return message.reply('Je ne connais pas cette **catégorie** essayez plutôt -> \`channel|guild|user|global\`.');
        let idFromTarget; // Gestion selon la catégorie voulue
        let targetBlacklist;
        switch (target) {
            case 'guild':
                idFromTarget = guildBlacklistId;
                targetBlacklist = global.blacklist.guild;
                break;
            case 'global':
                idFromTarget = userGlobalBlacklistId;
                targetBlacklist = global.blacklist.users;
                break;
            case 'user':
                idFromTarget = userBlacklistId;
                targetBlacklist = local.blacklist.users;
                break;
            case 'channel':
                idFromTarget = channelBlacklistId;
                targetBlacklist = local.blacklist.channels;
                break;
        };
        if (target && !action) return message.channel.send(`\`\`\`${target.charAt(0).toUpperCase() + target.slice(1).toLowerCase()}: ${idFromTarget}\`\`\``);
        /* Blacklist [channel|guild|user|global] {add|rm} - Ajoute/retire un ID présent dans la blacklist voulue */
        action = action.toLowerCase();
        if (!action.match(/^(add|rm)$/)) return message.reply('Je ne connais pas cette **action** essayez plutôt -> \`add|rm\`');
        if (!idToBlacklisted) return message.reply(`Veuillez entrer un ID pour réaliser cette **action**.`);
        if (/[^0-9]/i.test(idToBlacklisted)) return message.reply(`L'ID doit être un nombre ! \`${idToBlacklisted}\` n'est pas valide.`);
        if (action === "add") {
            targetBlacklist.push(idToBlacklisted);
        } else {
            const idToRemove = targetBlacklist.findIndex(d => d == idToBlacklisted);
            if (idToRemove == -1) return message.reply(`Cet ID n'est pas dans la blacklist`);
            targetBlacklist.splice(idToRemove, 1);
        }
        /* Vérification de l'utilisateur faisant la commande (blacklist Global / Administration)*/
        const adminId = ['213230950853640193'];
        if (target.match(/^(guild|global)$/) && !adminId.includes(message.author.id)) return message.reply(`Vous n'avez pas le droit d'ajouter un ID dans cette blacklist.`);
        /*Récupération de la liste Blacklist et modification */
        switch (target) {
            case 'guild':
                await Moderation.findOne({ id: 1 })
                    .then(doc => {
                        doc.blacklist["guild"] = targetBlacklist;
                        doc.save();
                    });
                break;
            case 'global':
                await Moderation.findOne({ id: 1 })
                    .then(doc => {
                        doc.blacklist["users"] = targetBlacklist;
                        doc.save();
                    });
                break;
            case 'user':
                await Guild.findOne({ id: message.guild.id })
                    .then(doc => {
                        doc.blacklist["users"] = targetBlacklist;
                        doc.save();
                    });
                break;
            case 'channel':
                await Guild.findOne({ id: message.guild.id })
                    .then(doc => {
                        doc.blacklist["channels"] = targetBlacklist;
                        doc.save();
                    });
                break;
        };
        return message.channel.send(`Blacklist **${target}** mis à jour avec l'action **${action}** et l'ID \`${idToBlacklisted}\`.`);
    }
}
module.exports = BlackListCommand;