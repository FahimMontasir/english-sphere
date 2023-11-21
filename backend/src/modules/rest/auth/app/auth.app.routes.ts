import express from 'express';
import validateRequest from '../../../../middlewares/rest/validateRequest';
import { AppLoginAuth } from '../../../../middlewares/rest/auth/login/auth.login.app';
import { AppAuthValidation } from './auth.app.validation';
import { AppAuthController } from './auth.app.controller';
import auth from '../../../../middlewares/rest/auth';

const router = express.Router();

router.post(
  '/login',
  AppLoginAuth.checkRequest,
  validateRequest(AppAuthValidation.loginZodSchema),
  AppAuthController.login
);

router.post(
  '/logout',
  auth('user', 'userN'),
  validateRequest(AppAuthValidation.logoutZodSchema),
  AppAuthController.logout
);

export const AppAuthRoutes = router;
