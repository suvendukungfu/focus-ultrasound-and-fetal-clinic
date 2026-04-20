const net = require('net');
const Redis = require('ioredis');

console.log('Testing Port Binding...');
const server = net.createServer();
server.on('error', (err) => console.error('Port Binding Error:', err.message));
server.listen(4001, '127.0.0.1', () => {
  console.log('Successfully bound to 127.0.0.1:4001');
  server.close();
});

console.log('Testing Redis Connection...');
const redis = new Redis('redis://127.0.0.1:6379', {
  maxRetriesPerRequest: 1
});
redis.on('error', (err) => console.error('Redis Connection Error:', err.message));
redis.on('connect', () => {
  console.log('Successfully connected to Redis');
  redis.disconnect();
});

setTimeout(() => {
  console.log('Test finished.');
  process.exit(0);
}, 5000);
