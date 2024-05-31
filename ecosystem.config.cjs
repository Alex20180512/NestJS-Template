module.exports = {
  apps: [
    {
      name: 'castle-of-memory-server',
      script: 'npm',
      args: 'start',
      env_prod: {
        NODE_ENV: 'production',
      },
    },
  ],
};
