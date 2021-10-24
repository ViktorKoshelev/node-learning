const { emitter } = require('./log');
const { promisify } = require('./promisify');
const fs = require('fs');

const http = require('http');

const server = http.createServer((req, res) => {
  res.end();
});
server.on('request', (req) => {
  emitter.emit('request', req)
})
server.listen(8000);

const reader = promisify(fs.readFile.bind(fs));

reader('/etc/pass')
  .then(() => {
    console.log('yes')
  })
  .catch(() => {
    console.log('no')
  })
