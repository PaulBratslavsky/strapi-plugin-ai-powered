'use strict';

module.exports = ({ strapi }) => ({
  submitPromt(ctx) {
    ctx.body = strapi
      .plugin('ai-powered')
      .service('openAi')
      .getWelcomeMessage();
  },
});
