const { emitter } = require('./log');

const http = require('http');

const server = http.createServer((req, res) => {
  res.end();
});
server.on('request', (req) => {
  emitter.emit('request', req)
})
server.listen(8000);
