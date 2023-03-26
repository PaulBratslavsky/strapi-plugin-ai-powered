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
  },

  async createVideoSummary(ctx) {
    console.log(ctx.request.body.url, "from createVideoSummary");

    const videoUrl = ctx.request.body.url;
    const videoFileName = "temp-video.mp4";

    try {
      const videoFilePath = await strapi
        .plugin('ai-powered')
        .service('utils')
        .downloadVideoFile(videoUrl, videoFileName);

      const audioFilePath = await strapi
        .plugin('ai-powered')
        .service('utils')
        .convertVideoToAudio(videoFilePath);

      const transcription = await strapi
        .plugin('ai-powered')
        .service('openAi')
        .openAiRequest({ audioFilePath }, "transcription");

      const content = transcription.text;

      const summary = await strapi
        .plugin('ai-powered')
        .service('openAi')
        .openAiRequest({ content }, "completion");

      return { data: summary };

    } catch (error) {
      ctx.throw(500, error);
    }
  },

});
