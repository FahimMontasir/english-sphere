const generateJwt = require('../../helpers/generateJwt');

describe('generating jwt token', () => {
  const data = { _id: '23342342' };
  it('should return generated jwt string', () => {
    const value = generateJwt(data);

    expect(value).toBeTruthy();
  });
});
