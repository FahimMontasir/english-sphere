import { z } from 'zod';

const notiPayloadZodSchema = z.object({
  body: z.object({
    title: z.string(),
    body: z.string(),
    data: z
      .object({
        imageUrl: z.string().optional(),
        banner: z.string().optional(),
        bigText: z.string().optional(),
        subtitle: z.string().optional(),
      })
      .optional(),
  }),
});

export const AppUpdateValidation = {
  notiPayloadZodSchema,
};
