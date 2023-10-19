module.exports = {
  apps: [
    {
      script: 'app.js',
      name: 'mesto-auto-deploy',
    },
  ],

  // Deployment Configuration
  deploy: {
    production: {
      user: 'mesto-rusinov',
      host: '51.250.8.9',
      ref: 'origin/main',
      repo: 'git@github.com:Dmitry-Rusinov/react-mesto-api-full-gha.git',
      path: '/home/mesto_rusinov/auto-deploy',
      'pre-deploy-local': 'scp .env mesto_rusinov@51.250.8.9:/home/mesto_rusinov/auto-deploy/current/backend',
      'post-deploy': 'pwd && cd backend && npm i && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
