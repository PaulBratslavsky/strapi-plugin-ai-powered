'use strict';

module.exports = async ({ strapi }) => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Read',
      uid: 'read',
      pluginName: 'ai-powered',
    },
    {
      section: 'plugins',
      displayName: 'Create',
      uid: 'create',
      pluginName: 'ai-powered',
    },
    {
      section: 'plugins',
      displayName: 'Update',
      uid: 'update',
      pluginName: 'ai-powered',
    },
    {
      section: 'plugins',
      displayName: 'Delete',
      uid: 'delete',
      pluginName: 'ai-powered',
    },
  ];

  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};