const http = require('http');

require('./debounce-dep1');
require('./debounce-dep2');
require('./debounce-dep3');

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('\n');
});

server.once('listening', function () {
  const addr = this.address();
  console.log('Server listening on %s:%s', addr.address, addr.port);
}).listen(0);

process.once('SIGTERM', function () {
  if (server.listening) {
    server.close();
  }
});
