const { Command } = require('discord-akairo');
class RestartCommand extends Command {
    constructor() {
        super('restart', {
            category: 'dev',
            aliases: ['restart', 'rs'],
            ownerOnly: true,
            description: {
                content: `Redemarre Opal.`,
                usage: 'restart',
                exemples: ['restart']
            }
        });
    }
    exec(message) {
        require('child_process').execSync('pm2 restart 0'); //redemarre le process 0
    }
}
module.exports = RestartCommand;