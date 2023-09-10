import { GENDER } from 'constants/gender';
import { z } from 'zod';

const updateUserZodSchema = z.object({
  body: z
    .object({
      fullName: z.string().max(20).optional(),
      imageUrl: z.string().optional(),
      coverUrl: z.string().optional(),
      gender: z.enum(GENDER).optional(),
      age: z.number().optional(),
    })
    .strict(),
});

const addSkillZodSchema = z.object({
  body: z
    .object({
      value: z.string({ required_error: 'Skill value cannot be empty!' }).max(50),
    })
    .strict(),
});

const removeSkillZodSchema = z.object({
  body: z
    .object({
      value: z.string(),
    })
    .strict(),
});

const refreshFcmTokenZodSchema = z.object({
  body: z.object({
    fcmToken: z
      .object({
        token: z.string(),
        device: z.string(),
      })
      .strict(),
  }),
});

const removeFcmTokenZodSchema = z.object({
  body: z
    .object({
      device: z.string(),
    })
    .strict(),
});

export const AppUserValidation = {
  refreshFcmTokenZodSchema,
  updateUserZodSchema,
  addSkillZodSchema,
  removeSkillZodSchema,
  removeFcmTokenZodSchema,
};
