const locator = require('../lib')
const google = require('../providers/google')
const device = require('../providers/device')

jest.mock('../providers/google')
jest.mock('../providers/device')

describe('Local Charity Locator', () => {
  describe('Validates Parameters', () => {
    it('rejects if the options object is omitted', async () => {
      expect.assertions(1)

      const error = Error('Options must be provided')
      await expect(locator()).rejects.toEqual(error)
    })

    it('calls the error callback if provider is omitted', async () => {
      expect.assertions(1)

      const error = Error('Provider must be defined')
      await expect(locator({})).rejects.toEqual(error)
    })
  })

  describe('Providers', () => {
    it('calls the error callback if provider is unknown', async () => {
      expect.assertions(1)

      const options = {
        provider: 'unknown-provider',
        input: 'AB1 2CD',
      }
      const error = Error('Unknown provider')

      await expect(locator(options)).rejects.toEqual(error)
    })

    it('calls the Google provider if the provider is Google', async () => {
      expect.assertions(2)

      google.mockImplementation(jest.fn(() => Promise.resolve('google')))
      const options = {
        provider: 'google',
        input: 'AB1 2CD',
      }
      const result = await locator(options)

      expect(google).toBeCalledWith(options)
      expect(result).toBe('google')
    })

    it('calls the Device provider if the provider is Device', async () => {
      expect.assertions(2)

      device.mockImplementation(jest.fn(() => Promise.resolve('device')))
      const options = {
        provider: 'device',
        input: 'AB1 2CD',
      }
      const result = await locator(options)

      expect(device).toBeCalledWith(options)
      expect(result).toBe('device')
    })
  })
})
