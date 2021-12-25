const { Guild, Moderation } = require('./Models');
// Provider Discord
class GuildsProvider {
    async get(guild) {
        const data = await Guild.findOne({ id: guild.id });
        if (data) return data;
    }
    async update(guild, settings) {
        let data = await this.get(guild);
        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key]
        }
        return data.updateOne(settings);
    }
};
//Provider Moderation
class ModerationProvider {
    async get() {
        const data = await Moderation.findOne({ id: 1 });
        if (data) return data;
    }
    async update(settings) {
        let data = await this.get(guild);
        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key]
        }
        return data.updateOne(settings);
    }
};
module.exports = {
    GuildsProvider,
    ModerationProvider
}