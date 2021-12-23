const { Listener } = require('discord-akairo');
const { cp } = require('fs');
class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }
    async exec(member) {
        const logChannel = this.client.channels.cache.get('805091401900752936');
        const embed = this.client.functions.embed()
            .setDescription(`**${member.user.tag}** à rejoint le serveur.`)
            .setFooter(`Members : ${member.guild.memberCount.toLocaleString()}`)
            .setColor('#42d6ff')
        await logChannel.send({ embeds: [embed] })
            .then(() => console.log(`guildMemberAdd -> Message envoyé pour ${member.user.tag}.`))
            .catch(() => console.log(`guildMemberAdd -> Le massage n'a pas été envoyé pour ${member.user.tag}.`))
    }
}
module.exports = GuildMemberAddListener;