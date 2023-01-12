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
  

  // TODO: Question about proper error handling and using ApplicationError
  async openAiRequest(ctx) {
    try {
      return await strapi
        .plugin('ai-powered')
        .service('openAi')
        .openAiRequest(ctx.request.body);
    } catch (error) {
      ctx.throw(500, error);
    }
  }, 
});
