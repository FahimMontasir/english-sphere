
  import express from 'express';
  import validateRequest from '../../../middlewares/rest/validateRequest';
  import auth from '../../../middlewares/rest/auth';
  import { MaterialsValidation } from './materials.validation';
  import { MaterialsController } from './materials.controller';
  
  const router = express.Router();
  
  router.get('/:userId', MaterialsController.getMaterials);
  
  router.post(
    '/',
    auth('user', 'admin'),
    validateRequest(MaterialsValidation.addMaterialsZodSchema),
    MaterialsController.addMaterials
  );
  
  router.patch(
    '/',
    auth('admin'),
    validateRequest(MaterialsValidation.updateMaterialsZodSchema),
    MaterialsController.updateMaterials
  );
  
  router.delete(
    '/',
    auth('user', 'userN'),
    validateRequest(MaterialsValidation.removeMaterialsZodSchema),
    MaterialsController.removeMaterials
  );
  
  export const MaterialsRoutes = router;
  
