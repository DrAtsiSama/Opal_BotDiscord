const mongoose = require('mongoose');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { TOKEN, MONGOSTRING } = require('../util/config');
const { GuildsProvider } = require('../structures/Providers');
const { embed } = require('../util/functions');
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
                    intents: 32767 //Indique les événements que l'on peut recevoir (intents calculator ou écrire à la main)
                }
            );
            this.CommandHandler = new CommandHandler(this, {
                allowMention: true,
                prefix: async message => {
                    const guildPrefix = await this.guildSettings.get(message.guild);
                    if (guildPrefix) return guildPrefix.prefix;
                    return config.prefix;
                },
                defaultCooldown: 2000, // 2000 ms => 2s
                directory: './src/commands' //Localisation des commandes
            }); //Creation du handler
            this.listenerHandler = new ListenerHandler(this, {
                directory: './src/listeners',
            }); //Creation des événements
            //Creation des variables globales
            this.functions = {
                embed: embed //this.client.functions.embed*
            }
            this.guildSettings = new GuildsProvider();
        } //Constructor
        /*Base de Données*/
    async init() {
        this.CommandHandler.useListenerHandler(this.listenerHandler); //Execute listenerHandler
        await this.CommandHandler.loadAll(); //Chargement des commandes
        console.log(`Commandes -> ${this.CommandHandler.modules.size}`);
        await this.listenerHandler.loadAll(); //Chargement des événements
        console.log(`Evénements -> ${this.listenerHandler.modules.size}`);
    }
    async start() { //Methode asynchrone => 
            try {
                await mongoose.connect(MONGOSTRING, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                console.log("Base de données connectée.");
            } catch (e) {
                console.log("Echec de la connection.\n\nErreur : ", e);
            }
            await this.init();
            return this.login(TOKEN);
        } //Lancement du BOT
}