const { createClient } = require('@google/maps')

const provider = require('../../providers/google')

jest.mock('@google/maps', () => ({
  createClient: jest.fn(),
}))

describe('Google location provider', () => {
  const geocode = jest.fn((query, callback) => callback(null, {}))

  beforeEach(() => {
    createClient.mockImplementation(() => ({ geocode }))
  })

  it('rejects if input is omitted', async () => {
    expect.assertions(1)
    const options = { input: null }

    const error = Error('Input must be provided.')
    await expect(provider(options)).rejects.toEqual(error)
  })

  it('rejects if region is not a string', async () => {
    expect.assertions(1)
    const options = { input: {}, region: 10 }

    const error = Error('Region must be a string.')
    await expect(provider(options)).rejects.toEqual(error)
  })

  it('passes the config to the client', async () => {
    const options = { input: {}, region: 'gb' }

    await provider(options)

    expect(createClient).toHaveBeenCalledWith()
  })

  // it('sets the channel', () => {
  //   options.channel = 'mychannel';
  //   client(options, callback);

  //   expect(google.CHANNEL).toEqual('mychannel');
  // });

  // it('sets the version as a string', () => {
  //   options.version = 5;
  //   client(options, callback);

  //   expect(google.VERSION).toEqual('5');
  // });

  // it('defaults the version to 3', () => {
  //   options.version = undefined;
  //   client(options, callback);

  //   expect(google.VERSION).toEqual('3');
  // });

  // it('loads the Google Maps API', () => {
  //   client(options, callback);

  //   expect(google.load).toBeCalled();
  // });

  // it('calls the callback with a flat latlng object', () => {
  //   client(options, callback);

  //   expect(callback.mock.calls[0][1].lat).toEqual(0);
  //   expect(callback.mock.calls[0][1].lng).toEqual(0);
  // });

  // it('calls the error callback if lookup fails', () => {
  //   google.setStatus(google.GeocoderStatus.ERROR);
  //   client(options, callback);

  //   expect(callback).toBeCalledWith('Google Maps: ERROR');
  // });

  // it('sets the CLIENT', () => {
  //   expect(google.CLIENT).toBeDefined();
  // });

  // it('sets the KEY to empty', () => {
  //   expect(google.KEY).toBeDefined();
  //   expect(google.KEY).toEqual('');
  // });

  // it('does not set the LIBRARIES key', () => {
  //   expect(google.LIBRARIES).toBeUndefined();
  // });
});
