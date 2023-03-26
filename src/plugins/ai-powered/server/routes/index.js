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
    method: 'GET',
    path: '/get-settings',
    handler: 'openAi.getSettings',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        { name: 'admin::hasPermissions', config: { actions: ['plugin::ai-powered.read'] } },
      ]
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
  },
  {
    method: 'POST',
    path: '/create-note',
    handler: 'openAi.createNote',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        { name: 'admin::hasPermissions', config: { actions: ['plugin::ai-powered.create'] } },
      ],
    },
  },
  {
    method: 'POST',
    path: '/create-video-summary',
    handler: 'openAi.createVideoSummary',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        { name: 'admin::hasPermissions', config: { actions: ['plugin::ai-powered.create'] } },
      ],
    },
  },
];
