const { stripIndents } = require('common-tags/lib');
const { Command } = require('discord-akairo');
class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            category: 'Misc',
            args: [
                { id: 'command', type: 'commandAlias' }
            ],
            description: {
                content: `Afficher la liste des commande d'Opal.`,
                usage: 'h(elp) <commande>',
                exemples: ['help', 'help ping']
            }
        });
    }
    async exec(message, args) {
            const prefix = await this.handler.prefix(message);
            const command = args.command;
            if (!command) {
                let embed = this.client.functions.embed()
                    .setAuthor(
                        `Mon pseudo est \`${this.client.user.username}\`.`,
                        this.client.user.displayAvatarURL()
                    )
                    .setDescription(
                        `
            Retrouvez la liste de mes commandes ci-dessous !\nEn cas de soucis, rejoignez [notre Discord](url.lienInvite)
            **------------**
            `)
                for (const category of this.handler.categories.values()) {
                    embed.addField(
                            `# ${category.id}`,
                            `
                ${category
                  .filter(cmd => cmd.aliases.length > 0)
                  .map(cmd => `\`${cmd.aliases[0]}\``)
                  .join(', ')
                }
              `
            )
          }
          embed.addField(
            `------------`,
            `
              **\`${prefix}help <command>\` pour afficher l'aide sur une commande spécifique.**
              Exemple : \`${prefix}help ping\`
            `
          )
        return message.channel.send({ embeds: [embed]});
      }
      return message.channel.send(stripIndents
        `
        \`\`\`makefile
        [help: Commande -> ${command.aliases[0]}] ${command.ownerOnly ? '[!] Commande utilisable seulement par les Administrateurs [!]' : '' }
        ------------
        ${command.description.content}
        ${command.description.subCommand == '' || command.description.subCommand == undefined ? "Aucune sous-commande disponible" : `Sous-commandes: ${command.description.subCommand}`}
        Utilisation: ${prefix}${command.description.usage}
        Exemples: ${prefix}${command.description.exemples.join(` | ${prefix}`)}
        ------------
         ${prefix}  = prefix à utiliser sur le bot
        () = alias  
        {} = sous-commande(s) disponible(s)
        <> = argument(s) optionnel(s)
        [] = argument(s) obligatoire
        📝 Ne pas inclure les carractères suivants dans vos commandes : [], () et <>
        Si vous avez un problème, rejoingez le serveur support !
        \`\`\`
        `
        );

    }
}
module.exports = HelpCommand;