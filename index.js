const { pipeline, Readable, Transform, Writable } = require('stream');

class RandomNumber extends Readable {
  count = 0;
  _read() {
    this.count++;
    this.push(this.count == 10 ? null : Math.random().toString());
  }
}

class RandomAdder extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Math.random() + Number(chunk.toString());
    callback(null, transformed.toString());
  }
}

class ConsoleLogger extends Writable {
  _writev(chunks, callback) {
    console.log(...(chunks.map(({ chunk }) => chunk.toString())));
    callback();
  }
}

pipeline(
  new RandomNumber(),
  new RandomAdder(),
  new ConsoleLogger(),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeded');
    }
  }
)


process.on('uncaughtException', (err) => {
  console.log(err.stack);
})

class MyError extends Error {

}

throw new MyError('error')
