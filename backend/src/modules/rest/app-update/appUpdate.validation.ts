import { NOTI_TYPE } from 'shared/pushNotification';
import { z } from 'zod';

const notiPayloadZodSchema = z.object({
  body: z
    .object({
      title: z.string(),
      body: z.string(),
      type: z.enum(NOTI_TYPE).optional(),
      data: z
        .object({
          screenId: z.string().optional(),
          imageUrl: z.string().optional(),
          banner: z.string().optional(),
          bigText: z.string().optional(),
          subtitle: z.string().optional(),
        })
        .optional(),
    })
    .strict(),
});

export const AppUpdateValidation = {
  notiPayloadZodSchema,
};
