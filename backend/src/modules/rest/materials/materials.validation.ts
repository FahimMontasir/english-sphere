import { z } from 'zod';
import { STATUS } from './materials.constant';

const addMaterialsZodSchema = z.object({
  body: z
    .object({
      title: z.string(),
      thumbnailUrl: z.string(),
      coverUrl: z.string(),
      description: z.string(),
      status: z.enum(STATUS),
      category: z.string(),
    })
    .strict(),
});

const requestMaterialsZodSchema = z.object({
  body: z
    .object({
      userId: z.string(),
      description: z.string(),
      category: z.string(),
    })
    .strict(),
});

const updateMaterialsZodSchema = z.object({
  body: z
    .object({
      _id: z.string(),
      title: z.string().optional(),
      thumbnailUrl: z.string().optional(),
      coverUrl: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(STATUS).optional(),
      category: z.string().optional(),
    })
    .strict(),
});

const removeMaterialsZodSchema = z.object({
  body: z
    .object({
      _id: z.string(),
    })
    .strict(),
});

// category
const createMaterialsCategoryZodSchema = z.object({
  body: z
    .object({
      thumbnailUrl: z.string(),
      coverUrl: z.string(),
      title: z.string(),
    })
    .strict(),
});

const updateMaterialsCategoryZodSchema = z.object({
  body: z
    .object({
      _id: z.string(),
      thumbnailUrl: z.string().optional(),
      coverUrl: z.string().optional(),
      title: z.string().optional(),
    })
    .strict(),
});

const removeMaterialsCategoryZodSchema = z.object({
  body: z
    .object({
      _id: z.string(),
    })
    .strict(),
});

export const MaterialsValidation = {
  updateMaterialsZodSchema,
  addMaterialsZodSchema,
  requestMaterialsZodSchema,
  removeMaterialsZodSchema,
  updateMaterialsCategoryZodSchema,
  createMaterialsCategoryZodSchema,
  removeMaterialsCategoryZodSchema,
};
