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
    password: z
      .string({ required_error: 'Password is required' })
      .regex(
        /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/,
        'Your password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character (#?!@$%^&*-_). Please ensure your password meets these requirements.'
      ),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old Password is required' }),
    newPassword: z
      .string({ required_error: 'Password is required' })
      .regex(
        /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/,
        'Your password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character (#?!@$%^&*-_). Please ensure your password meets these requirements.'
      ),
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
