'use strict';

module.exports = ({ strapi }) => ({
  update(ctx) {
    ctx.body = strapi
      .plugin('ai-powered')
      .service('setting')
      .update();
  },
});
