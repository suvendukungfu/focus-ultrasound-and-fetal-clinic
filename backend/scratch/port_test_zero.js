const net = require('net');
console.log('Testing Port Binding (any host, port 0)...');
const server = net.createServer();
server.on('error', (err) => console.error('Port Binding Error:', err.message));
server.listen(0, () => {
  const addr = server.address();
  console.log('Successfully bound to:', addr);
  server.close();
});

setTimeout(() => {
  console.log('Test finished.');
  process.exit(0);
}, 2000);
