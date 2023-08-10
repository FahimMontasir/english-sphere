import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    token: z.string(),
    fcmToken: z.string(),
    timezone: z.string(),
  }),
});

export const AppAuthValidation = {
  loginZodSchema,
};
