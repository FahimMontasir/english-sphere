import express from 'express';
import validateRequest from '../../../middlewares/rest/validateRequest';
import auth from '../../../middlewares/rest/auth';
import { MaterialsValidation } from './materials.validation';
import { MaterialsController } from './materials.controller';

const router = express.Router();

// materials category
router.get('/category', auth('user', 'userN', 'contentW', 'admin', 'superAdmin'), MaterialsController.getMaterials);
router.post(
  '/category/create',
  auth('contentW', 'admin', 'superAdmin'),
  validateRequest(MaterialsValidation.createMaterialsCategoryZodSchema),
  MaterialsController.getMaterials
);
router.patch(
  '/category/update',
  auth('contentW', 'admin', 'superAdmin'),
  validateRequest(MaterialsValidation.updateMaterialsCategoryZodSchema),
  MaterialsController.getMaterials
);
router.delete('/category/remove', auth('admin', 'superAdmin'), MaterialsController.getMaterials);

// materials
router.get('/request', auth('contentW', 'admin', 'superAdmin'), MaterialsController.getMaterials);
router.get('/', auth('user', 'userN', 'contentW', 'admin', 'superAdmin'), MaterialsController.getMaterials);
router.get('/:materialId', auth('user', 'userN', 'contentW', 'admin', 'superAdmin'), MaterialsController.getMaterials);

router.post(
  '/',
  auth('contentW', 'admin', 'superAdmin'),
  validateRequest(MaterialsValidation.addMaterialsZodSchema),
  MaterialsController.addMaterials
);
router.post(
  '/request',
  auth('user', 'userN'),
  validateRequest(MaterialsValidation.addMaterialsZodSchema),
  MaterialsController.addMaterials
);

router.patch(
  '/',
  auth('contentW', 'admin', 'superAdmin'),
  validateRequest(MaterialsValidation.updateMaterialsZodSchema),
  MaterialsController.updateMaterials
);

router.delete(
  '/',
  auth('admin', 'superAdmin'),
  validateRequest(MaterialsValidation.removeMaterialsZodSchema),
  MaterialsController.removeMaterials
);

export const MaterialsRoutes = router;
