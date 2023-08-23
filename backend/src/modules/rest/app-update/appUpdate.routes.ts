import express from 'express';
import validateRequest from 'middlewares/rest/validateRequest';
import auth from 'middlewares/rest/auth';
import { AppUpdateValidation } from './appUpdate.validation';
import { AppUpdateController } from './appUpdate.controller';

const router = express.Router();

router.post(
  '/send-all',
  auth('admin', 'superAdmin'),
  validateRequest(AppUpdateValidation.notiPayloadZodSchema),
  AppUpdateController.sendAll
);

router.post(
  '/send-multicast',
  auth('admin', 'superAdmin'),
  validateRequest(AppUpdateValidation.notiPayloadZodSchema),
  AppUpdateController.sendMulticast
);

export const AppUpdateRoutes = router;
