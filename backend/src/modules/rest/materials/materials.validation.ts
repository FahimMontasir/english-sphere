
  import { z } from 'zod';
  import { SOME_CONSTANTS } from './materials.constant';
  
  const addMaterialsZodSchema = z.object({
    body: z
      .object({
        anyRef: z.string(),
        removeIt: z.boolean(),
        constant: z.enum(SOME_CONSTANTS),
      })
      .strict(),
  });
  
  const updateMaterialsZodSchema = z.object({
    body: z
      .object({
        anyRef: z.string().optional(),
        removeIt: z.boolean().optional(),
        constant: z.enum(SOME_CONSTANTS).optional(),
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
  
  export const MaterialsValidation = {
    updateMaterialsZodSchema,
    addMaterialsZodSchema,
    removeMaterialsZodSchema,
  };
  
  