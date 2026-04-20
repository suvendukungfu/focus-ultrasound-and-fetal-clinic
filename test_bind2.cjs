const http = require('http');
const port = 4000;
const server = http.createServer((req, res) => res.end('OK'));
server.listen(port, '0.0.0.0', () => console.log(`Server running on 0.0.0.0:${port}`));
server.on('error', e => console.error(e));
