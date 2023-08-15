import { z } from 'zod';

const refreshFcmTokenZodSchema = z.object({
  body: z.object({
    fcmToken: z.object({
      token: z.string(),
      device: z.string(),
    }),
  }),
});

export const AppUserValidation = {
  refreshFcmTokenZodSchema,
};
