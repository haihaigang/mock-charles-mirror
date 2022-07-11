module.exports = {
  apps : [{
    name: 'Mock Charles Mirror',
    cwd: './src',
    script: './index.js',
    args: 'one two',
    node_args: '--harmony',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3007
    }
  }]
};
