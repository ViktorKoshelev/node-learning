function promisify(wrapping) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      wrapping(...args, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = {
  promisify
};
