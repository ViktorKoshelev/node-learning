const { readdir, stat } = require('fs/promises');
const { normalize, join } = require('path');

function read(root) {
  if (root === undefined) {
    root = './';
  }
  root = normalize(root);
  const result = {
    files: [],
    folders: [],
  };

  return readdir(root, { withFileTypes: true })
    .then((files) => {
      const proms = [];
      for (const file of files) {
        const { name } = file;
        if (file.isDirectory()) {
          result.folders.push(join(root, name));
          const prom = read(join(root, name)).then((subResult) => {
            result.files = result.files.concat(subResult.files);
            result.folders = result.folders.concat(subResult.folders);
          })
          proms.push(prom);
        } else {
          result.files.push(join(root, name));
        }
      }
      return Promise.all(proms).then(() => result);
    })
    .catch((err) => console.log(err));
}

module.exports = {
  read,
};
