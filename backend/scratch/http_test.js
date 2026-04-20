const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello World');
});
server.on('error', (err) => console.error('Error:', err.message));
server.listen(8081, '0.0.0.0', () => {
  console.log('Server running on 8081');
});
setTimeout(() => {
  console.log('Closing...');
  server.close();
  process.exit(0);
}, 2000);
