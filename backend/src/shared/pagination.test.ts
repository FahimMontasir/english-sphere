import { IPaginationOptions } from '../interfaces/common';
import { paginationHelpers } from './pagination';

describe('paginationHelpers', () => {
  describe('calculatePagination', () => {
    it('should calculate pagination with default values', () => {
      // Arrange
      const options: IPaginationOptions = {};

      // Act
      const result = paginationHelpers.calculatePagination(options);

      // Assert
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.skip).toBe(0);
      expect(result.sortBy).toBeUndefined();
      expect(result.sortOrder).toBeUndefined();
    });

    it('should calculate pagination with provided values', () => {
      // Arrange
      const options: IPaginationOptions = {
        page: 2,
        limit: 20,
        sortBy: 'name',
        sortOrder: 'asc',
      };

      // Act
      const result = paginationHelpers.calculatePagination(options);

      // Assert
      expect(result.page).toBe(2);
      expect(result.limit).toBe(20);
      expect(result.skip).toBe(20);
      expect(result.sortBy).toBe('name');
      expect(result.sortOrder).toBe('asc');
    });

    it('should handle undefined options', () => {
      // Arrange
      const options = undefined as unknown as IPaginationOptions;

      // Act
      const result = paginationHelpers.calculatePagination(options);

      // Assert
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.skip).toBe(0);
      expect(result.sortBy).toBeUndefined();
      expect(result.sortOrder).toBeUndefined();
    });
  });
});
