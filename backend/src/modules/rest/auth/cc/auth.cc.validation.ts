import { z } from 'zod';
import { USER_ROLES } from '../../../../constants/roles';

const registerZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: 'First name is required' }),
      lastName: z.string({ required_error: 'First name is required' }),
    }),
    imageUrl: z.string({ required_error: 'Image url is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    role: z.enum(USER_ROLES, { required_error: 'Valid user role is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    imageUrl: z.string().optional(),
    email: z.string().email().optional(),
    role: z.enum(USER_ROLES).optional(),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old Password is required' }),
    newPassword: z.string({ required_error: 'New Password is required' }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

export const CCAuthValidation = {
  registerZodSchema,
  loginZodSchema,
  changePasswordZodSchema,
  refreshTokenZodSchema,
};
