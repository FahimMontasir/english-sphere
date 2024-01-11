import { IPaginationOptions } from '../interfaces/common';

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

const calculatePagination = (options: IPaginationOptions): IOptionsResult => {
  const page = Number(options?.page || 1);
  const limit = Number(options?.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = options?.sortBy;
  const sortOrder = options?.sortOrder;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
