module.exports = [
  {
    method: 'PUT',
    path: '/update-settings',
    handler: 'openAi.updateSettings',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        { name: 'admin::hasPermissions', config: { actions: ['plugin::ai-powered.update'] } },
      ],
    },
  },
  {
    method: 'POST',
    path: '/open-ai-request',
    handler: 'openAi.openAiRequest',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        { name: 'admin::hasPermissions', config: { actions: ['plugin::ai-powered.create'] } },
      ],
    },
  }
];
