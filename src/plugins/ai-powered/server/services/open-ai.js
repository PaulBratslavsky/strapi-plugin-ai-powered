'use strict';

module.exports = ({ strapi }) => ({
  async updateSettings(payload) {
    const settings = await strapi.entityService.findMany("plugin::ai-powered.setting");
    if (!settings) {
      return await strapi.entityService.create("plugin::ai-powered.setting", payload);
    } else {
      return await strapi.entityService.update("plugin::ai-powered.setting", settings.id, payload);
    }
  },
});
