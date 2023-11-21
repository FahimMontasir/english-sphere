
  import { z } from 'zod';
  import { SOME_CONSTANTS } from './boilerplateCode.constant';
  
  const addBoilerplateCodeZodSchema = z.object({
    body: z
      .object({
        anyRef: z.string(),
        removeIt: z.boolean(),
        constant: z.enum(SOME_CONSTANTS),
      })
      .strict(),
  });
  
  const updateBoilerplateCodeZodSchema = z.object({
    body: z
      .object({
        anyRef: z.string().optional(),
        removeIt: z.boolean().optional(),
        constant: z.enum(SOME_CONSTANTS).optional(),
      })
      .strict(),
  });
  
  const removeBoilerplateCodeZodSchema = z.object({
    body: z
      .object({
        value: z.string(),
      })
      .strict(),
  });
  
  export const BoilerplateCodeValidation = {
    updateBoilerplateCodeZodSchema,
    addBoilerplateCodeZodSchema,
    removeBoilerplateCodeZodSchema,
  };
  
  