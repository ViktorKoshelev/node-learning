const { read } = require('./tree.js');
const path = process.argv[2];

read(path).then((result) => console.log(result));
