import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    token: z.string(),
    fcmToken: z.object({
      token: z.string(),
      device: z.string(),
    }),
    timezone: z.string(),
  }),
});

const logoutZodSchema = z.object({
  body: z.object({
    fcmDevice: z.string(),
  }),
});

export const AppAuthValidation = {
  loginZodSchema,
  logoutZodSchema,
};
