const { createClient } = require('@google/maps')

module.exports = (opts) => {
  if (!(opts && opts.input)) {
    return Promise.reject(Error('Input must be provided.'))
  }

  if (opts.region && typeof opts.region !== 'string') {
    return Promise.reject(Error('Region must be a string.'))
  }

  const { clientSecret = 'secret', clientId = 'gme-jsinfo' } = opts
  const client = createClient({ clientSecret, clientId, Promise })

  const query = {}

  return client.geocode(query)
    .asPromise()
    .then((data) => {
      const { json } = data
      if (json && json.status === 'OK') {
        return json
      }

      throw Error(json)
    })
    .catch((error) => {
      if (error.statusCode && error.statusMessage) {
        return `${error.statusCode}: ${error.statusMessage}`
      }

      return error
    })
}
