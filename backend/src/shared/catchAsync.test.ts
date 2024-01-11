import { Request, Response } from 'express';
import { catchAsync } from './catchAsync';

describe('catchAsync function', () => {
  it('should return a function', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const dummyFunction: (req: Request, res: Response) => Promise<void> = async () => {};

    // Act
    const wrappedFunction = catchAsync(dummyFunction);

    // Assert
    expect(typeof wrappedFunction).toBe('function');
  });

  it('should catch errors', async () => {
    // Arrange
    const dummyError = new Error('Test Error');

    const dummyFunction: (req: Request, res: Response) => Promise<void> = async () => {
      throw dummyError;
    };

    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const mockNext = jest.fn();

    // Act
    const wrappedFunction = catchAsync(dummyFunction);
    await wrappedFunction(mockRequest, mockResponse, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalledWith(dummyError);
  });
});
