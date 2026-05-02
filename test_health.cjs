const http = require('http');

http.get('http://127.0.0.1:4001/api/v1/health', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Health check response:', data);
  });
}).on('error', (err) => {
  console.error('Health check failed:', err.message);
});
