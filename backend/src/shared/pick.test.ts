import pick from './pick';

describe('pick function', () => {
  it('should pick properties with values from an object', () => {
    // Arrange
    const inputObject = {
      page: 1,
      limit: 10,
      name: 'John Doe',
      age: null,
    };

    const keysToPick: any = ['page', 'limit', 'name', 'nonexistent'];

    // Act
    const result = pick(inputObject, keysToPick);

    // Assert
    expect(result).toEqual({
      page: 1,
      limit: 10,
      name: 'John Doe',
    });
  });

  it('should handle an empty object', () => {
    // Arrange
    const inputObject = {};
    const keysToPick: any = ['page', 'limit'];

    // Act
    const result = pick(inputObject, keysToPick);

    // Assert
    expect(result).toEqual({});
  });

  it('should handle undefined or null values in the input object', () => {
    // Arrange
    const inputObject = {
      page: null,
      limit: undefined,
      name: 'John Doe',
    };

    const keysToPick: any = ['page', 'limit', 'name'];

    // Act
    const result = pick(inputObject, keysToPick);

    // Assert
    expect(result).toEqual({
      name: 'John Doe',
    });
  });

  it('should handle nonexistent keys', () => {
    // Arrange
    const inputObject = {
      page: 1,
      limit: 10,
      name: 'John Doe',
    };

    const keysToPick: any = ['nonexistent'];

    // Act
    const result = pick(inputObject, keysToPick);

    // Assert
    expect(result).toEqual({});
  });
});
