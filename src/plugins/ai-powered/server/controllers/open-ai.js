'use strict';

module.exports = ({ strapi }) => ({
  async updateSettings(ctx) {
    try {
      return await strapi
        .plugin('ai-powered')
        .service('openAi')
        .updateSettings(ctx.request.body);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
});
