'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('ai-powered')
      .service('myService')
      .getWelcomeMessage();
  },
});
