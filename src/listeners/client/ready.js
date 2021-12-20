const { Listener } = require('discord-akairo');
class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }
    exec() { //Pas besoin d'emettre client  étant dans le discord akairo
        console.log('Je suis en Ligne !');
    }
}
module.exports = ReadyListener;