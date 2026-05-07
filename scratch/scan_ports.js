import http from 'http';
const tryPort = (port) => {
  const server = http.createServer();
  server.listen(port, '127.0.0.1', () => {
    console.log(`SUCCESS: ${port}`);
    process.exit(0);
  });
  server.on('error', (err) => {
    console.log(`FAIL: ${port} (${err.code})`);
    if (port < 1030) tryPort(port + 1);
    else process.exit(1);
  });
};
tryPort(1024);
