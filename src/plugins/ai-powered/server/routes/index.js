module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/get-promt',
    handler: 'openAi.submitPromt',
    config: {
      policies: [],
    },
  },
];
