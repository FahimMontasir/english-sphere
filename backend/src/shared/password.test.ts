import bcrypt from 'bcrypt';
import configs from '../configs';
import { Password } from './password';

describe('Password functions', () => {
  const mockPassword = 'password123';
  let mockHashedPassword: string;

  beforeAll(async () => {
    mockHashedPassword = await bcrypt.hash(mockPassword, Number(configs.bcrypt_salt_rounds));
  });

  describe('hash', () => {
    it('should hash a password', async () => {
      // Act
      const hashedPassword = await Password.hash(mockPassword);

      // Assert
      expect(hashedPassword).not.toBeUndefined();
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword.length).toBeGreaterThan(0);
    });
  });

  describe('compare', () => {
    it('should return true for matching passwords', async () => {
      // Act
      const result = await Password.compare(mockPassword, mockHashedPassword);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      // Arrange
      const wrongPassword = 'wrongpassword';

      // Act
      const result = await Password.compare(wrongPassword, mockHashedPassword);

      // Assert
      expect(result).toBe(false);
    });
  });
});
