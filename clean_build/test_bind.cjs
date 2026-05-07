const http = require('http');
const port = process.env.PORT || 8888;
const server = http.createServer((req, res) => {
  res.end('OK');
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
