module.exports = [
  {
    method: 'GET',
    path: '/get-promt',
    handler: 'openAi.submitPromt',
    config: {
      policies: [],
    },
  },
];
