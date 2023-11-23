import { IUserRoles } from './user';

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type IGenericPaginationResponse<T> = {
  meta: {
    page: number;
    isLastPage: boolean;
    limit: number;
    total: number;
  };
  data: T;
};

export type IJwtPayload = {
  _id: string;
  role: IUserRoles;
};
