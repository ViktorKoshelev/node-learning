const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('request', (...args) => {
  console.log(...args);
})

module.exports = {
  emitter
};
