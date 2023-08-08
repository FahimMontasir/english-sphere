import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: 'First name is required' }),
      lastName: z.string({ required_error: 'First name is required' }),
    }),
    imageUrl: z.string({ required_error: 'Image url is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
  }),
});

export const AppAuthValidation = {
  loginZodSchema,
};
