const provider = require('../../providers/device')

describe('Device geolocation provider', () => {
  beforeEach(() => {
    navigator.geolocation = {}
  })

  it('rejects if geolocation is not supported', async () => {
    expect.assertions(1)
    navigator.geolocation = null

    const error = Error('Geolocation not available.')
    await expect(provider()).rejects.toEqual(error)
  })

  it('resolves with the location', async () => {
    expect.assertions(1)
    const position = {
      coords: {
        latitude: 10,
        longitude: 11,
      },
    }
    navigator.geolocation.getCurrentPosition = jest.fn(success => success(position))
    const result = await provider()

    expect(result).toEqual({ lat: 10, lng: 11 })
  })

  it('reject when geolocation data is invalid', async () => {
    expect.assertions(1)
    navigator.geolocation.getCurrentPosition = jest.fn(success => success({ coords: {} }))

    const error = Error('Invalid geolocation data.')
    await expect(provider()).rejects.toEqual(error)
  })

  it('rejects for each browser defined error', async () => {
    const messages = [
      { code: 1, message: 'Your browser didn\'t have the necessary permissions to locate your position.' },
      { code: 2, message: 'Your browser failed to locate your position.' },
      { code: 3, message: 'Your browser timed out locating your position.' },
    ]
    expect.assertions(messages.length)

    const navigatorSetError = (code) => {
      navigator.geolocation.getCurrentPosition = jest.fn((success, err) => err({ code }))
    }

    for (let i = 0; i < messages.length; i += 1) {
      const { code, message } = messages[i]
      navigatorSetError(code)

      const error = Error(message)
      // eslint-disable-next-line no-await-in-loop
      await expect(provider()).rejects.toEqual(error)
    }
  })

  it('gives a generic error on unknown geolocation error', async () => {
    expect.assertions(1)
    navigator.geolocation.getCurrentPosition = jest.fn((success, err) => err({ code: 'unknown' }))

    const error = Error('There was a problem getting your location.')
    await expect(provider()).rejects.toEqual(error)
  })
})
