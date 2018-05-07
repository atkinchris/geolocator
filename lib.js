const google = require('./providers/google')
const device = require('./providers/device')

const reject = message => Promise.reject(Error(message))

module.exports = (opts) => {
  if (!opts) {
    return reject('Options must be provided')
  }

  if (!opts.provider) {
    return reject('Provider must be defined')
  }

  switch (opts.provider) {
    case 'google':
      return google(opts)
    case 'device':
      return device(opts)
    default:
      return reject('Unknown provider')
  }
}
