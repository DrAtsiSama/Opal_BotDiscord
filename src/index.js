const { TOKEN } = require('./util/config')
const GotoClient = require('./structures/GotoClient');
let client = new GotoClient({
    prefix: '?'
});
client.login(TOKEN);