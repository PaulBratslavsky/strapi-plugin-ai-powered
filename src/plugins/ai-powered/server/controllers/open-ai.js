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

  async getSettings(ctx) {
    try {
      return await strapi
        .plugin('ai-powered')
        .service('openAi')
        .getSettings();
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async openAiRequest(ctx) {
    return await strapi
      .plugin('ai-powered')
      .service('openAi')
      .openAiRequest(ctx.request.body);
  },

  async createNote(ctx) {
    try {
      return await strapi
        .plugin('ai-powered')
        .service('openAi')
        .createNote(ctx.request.body);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  
  async getNotes(ctx) {
    try {
      return await strapi
        .plugin('ai-powered')
        .service('openAi')
        .getNotes();
    } catch (error) {
      ctx.throw(500, error);
    }
  }
});
