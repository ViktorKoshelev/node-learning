const { readdir, stat } = require('fs/promises');

function read(root) {
  if (root === undefined) {
    root = './';
  }
  const result = {
    files: [],
    folders: [],
  };

  function checkDir(path) {
    return stat(path).then((stats) => {
      if (stats.isDirectory()) {
        const dir = path + '/';
        result.folders.push(dir);
        return read(dir).then((subResult) => {
          result.files = result.files.concat(subResult.files);
          result.folders = result.folders.concat(subResult.folders);
        });
      } else {
        result.files.push(path);
      }
    });
  }

  return readdir(root, { withFileTypes: true })
    .then((files) => {
      const proms = [];
      for (const { name } of files) {
        proms.push(checkDir(`${root}${name}`));
      }
      return Promise.all(proms).then(() => result);
    })
    .catch((err) => console.log(err));
}

module.exports = {
  read,
};
