module.exports = [
  {
    method: 'GET',
    path: '/setting/update-setting',
    handler: 'setting.update',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        { name: 'admin::hasPermissions', config: { actions: ['plugin::ai-powered.settings.update'] } },
      ],
    },
  },
];

