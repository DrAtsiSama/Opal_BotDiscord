const { AkairoClient, CommandHandler } = require('discord-akairo');
const { Presence } = require('discord.js');
module.exports = class GotoClient extends AkairoClient {
    constructor(config = {}) {
        super( //options du client
            { ownerID: ['213230950853640193', '300288760766267392'] }, // proprietaire
            {
                allowedMentions: {
                    parse: ['roles', 'everyone', 'users'],
                    repliedUser: false // Empeche de mentionner l'utilisateur (ex : dans un message.reply)
                },
                partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'], // souvenir 
                presence: {
                    status: 'dnd',
                    activities: [{
                        name: 'Dr_AtsiSama',
                        type: 'WATCHING',
                        //url : 'url'
                    }]
                },
                intents: 32767 //indique les événements que l'on peut recevoir (intents calculator ou écrire à la main)
            }
        );
        this.CommandHandler = new CommandHandler(this, {
            allowMention: true,
            prefix: config.prefix,
            defaultCooldown: 2000, // 2000 ms => 2s
            directory: './src/commands' //ou se trouve les commandes
        }); //creation du handler
        this.CommandHandler.loadAll();
    }
}