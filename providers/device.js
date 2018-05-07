const ERROR_TYPES = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
}

const getErrorMessage = (code) => {
  switch (code) {
    case ERROR_TYPES.PERMISSION_DENIED:
      return 'Your browser didn\'t have the necessary permissions to locate your position.'
    case ERROR_TYPES.POSITION_UNAVAILABLE:
      return 'Your browser failed to locate your position.'
    case ERROR_TYPES.TIMEOUT:
      return 'Your browser timed out locating your position.'
    default:
      return 'There was a problem getting your location.'
  }
}

const device = () => {
  if (!(navigator.geolocation && navigator.geolocation.getCurrentPosition)) {
    return Promise.reject(Error('Geolocation not available.'))
  }

  return new Promise((resolve, reject) => {
    const success = ({ coords } = {}) => {
      if (coords && coords.latitude && coords.longitude) {
        resolve({
          lat: coords.latitude,
          lng: coords.longitude,
        })
      } else {
        reject(Error('Invalid geolocation data.'))
      }
    }

    const error = (err = {}) => {
      const errorMessage = getErrorMessage(err.code)
      reject(Error(errorMessage))
    }

    navigator.geolocation.getCurrentPosition(success, error)
  })
}

module.exports = device
