const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
  // Indicate if a redirect has happened
  const status = req.url === '/' ? 200 : 301;
  // Send distributed app file
  res.writeHead(status, { 'Content-Type': 'text/html' });
  res.end(fs.readFileSync('./index.html', 'utf8'));
}).listen(8080);
