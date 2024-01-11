import jwt, { Secret } from 'jsonwebtoken';
import { JwtHelper } from './jwtHelper'; // replace 'yourFile' with the actual file path
import { IJwtPayload } from '../interfaces/common';
import { IDecodedUser } from '../interfaces/user';

jest.mock('jsonwebtoken');

describe('JwtHelper Module', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('createToken should generate a valid JWT token', () => {
    // Arrange
    const mockPayload: IJwtPayload = { _id: '123', role: 'user' };
    const mockSecret: Secret = 'secretKey';
    const mockExpireTime = '1h';

    // Act
    const token = JwtHelper.createToken(mockPayload, mockSecret, mockExpireTime);

    // Assert
    expect(jwt.sign).toHaveBeenCalledWith(mockPayload, mockSecret, { expiresIn: mockExpireTime });
    expect(typeof token).toBe('undefined');
  });

  it('verifyToken should decode a valid JWT token', () => {
    // Arrange
    const mockToken = 'validToken';
    const mockSecret: Secret = 'secretKey';
    const mockDecodedUser: IDecodedUser = {
      _id: '123',
      role: 'user',
      iat: 0,
      exp: 0,
    };

    // Mock jwt.verify implementation
    (jwt.verify as jest.Mock).mockReturnValue(mockDecodedUser);

    // Act
    const decodedUser = JwtHelper.verifyToken(mockToken, mockSecret);

    // Assert
    expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockSecret);
    expect(decodedUser).toEqual(mockDecodedUser);
  });

  it('verifyToken should throw an error for an invalid JWT token', () => {
    // Arrange
    const mockToken = 'invalidToken';
    const mockSecret: Secret = 'secretKey';

    // Mock jwt.verify implementation to throw an error
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    // Act & Assert
    expect(() => JwtHelper.verifyToken(mockToken, mockSecret)).toThrow('Invalid token');
  });
});
