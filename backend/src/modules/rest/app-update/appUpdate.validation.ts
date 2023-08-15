import { z } from 'zod';

const notiPayloadZodSchema = z.object({
  body: z.object({
    title: z.string(),
    body: z.string(),
    imageUrl: z.string().optional(),
    banner: z.string().optional(),
    othersInfo: z.object({}).optional(),
  }),
});

export const AppUpdateValidation = {
  notiPayloadZodSchema,
};
