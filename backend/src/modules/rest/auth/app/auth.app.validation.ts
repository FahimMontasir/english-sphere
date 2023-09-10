import { z } from 'zod';

const loginZodSchema = z.object({
  body: z
    .object({
      token: z.string(),
      fcmToken: z.object({
        token: z.string(),
        device: z.string(),
      }),
      timezone: z.string(),
    })
    .strict(),
});

const logoutZodSchema = z.object({
  body: z
    .object({
      fcmDevice: z.string(),
    })
    .strict(),
});

export const AppAuthValidation = {
  loginZodSchema,
  logoutZodSchema,
};
