import { z } from 'zod';
import { STATUS } from './materials.constant';

const addMaterialsZodSchema = z.object({
  body: z
    .object({
      anyRef: z.string(),
      removeIt: z.boolean(),
      constant: z.enum(STATUS),
    })
    .strict(),
});

const updateMaterialsZodSchema = z.object({
  body: z
    .object({
      anyRef: z.string().optional(),
      removeIt: z.boolean().optional(),
      constant: z.enum(STATUS).optional(),
    })
    .strict(),
});

const removeMaterialsZodSchema = z.object({
  body: z
    .object({
      value: z.string(),
    })
    .strict(),
});

// category
const createMaterialsCategoryZodSchema = z.object({
  body: z
    .object({
      thumbnailUrl: z.string(),
      title: z.string(),
    })
    .strict(),
});

const updateMaterialsCategoryZodSchema = z.object({
  body: z
    .object({
      _id: z.string(),
      thumbnailUrl: z.string().optional(),
      title: z.string().optional(),
    })
    .strict(),
});

export const MaterialsValidation = {
  updateMaterialsZodSchema,
  addMaterialsZodSchema,
  removeMaterialsZodSchema,
  updateMaterialsCategoryZodSchema,
  createMaterialsCategoryZodSchema,
};
