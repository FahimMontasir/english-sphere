
  import express from 'express';
  import validateRequest from '../../../middlewares/rest/validateRequest';
  import auth from '../../../middlewares/rest/auth';
  import { BoilerplateCodeValidation } from './boilerplateCode.validation';
  import { BoilerplateCodeController } from './boilerplateCode.controller';
  
  const router = express.Router();
  
  router.get('/:userId', BoilerplateCodeController.getBoilerplateCode);
  
  router.post(
    '/',
    auth('user', 'admin'),
    validateRequest(BoilerplateCodeValidation.addBoilerplateCodeZodSchema),
    BoilerplateCodeController.addBoilerplateCode
  );
  
  router.patch(
    '/',
    auth('admin'),
    validateRequest(BoilerplateCodeValidation.updateBoilerplateCodeZodSchema),
    BoilerplateCodeController.updateBoilerplateCode
  );
  
  router.delete(
    '/',
    auth('user', 'userN'),
    validateRequest(BoilerplateCodeValidation.removeBoilerplateCodeZodSchema),
    BoilerplateCodeController.removeBoilerplateCode
  );
  
  export const BoilerplateCodeRoutes = router;
  
