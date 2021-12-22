const GotoClient = require('./structures/GotoClient');
let client = new GotoClient({
    prefix: '?'
});
client.start();