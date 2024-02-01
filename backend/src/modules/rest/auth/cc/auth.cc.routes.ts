import express from 'express';
import validateRequest from '../../../../middlewares/rest/validateRequest';
// auth middlewares
import { CCLoginAuth } from '../../../../middlewares/rest/auth/login/auth.login.cc';
import auth from '../../../../middlewares/rest/auth';
// module specific
import { CCAuthValidation } from './auth.cc.validation';
import { CCAuthController } from './auth.cc.controller';

const router = express.Router();

router.post(
  '/login',
  CCLoginAuth.limitRate,
  CCLoginAuth.checkRequest,
  validateRequest(CCAuthValidation.loginZodSchema),
  CCAuthController.login
);

router.post(
  '/register',
  auth('superAdmin', 'admin'),
  validateRequest(CCAuthValidation.registerZodSchema),
  CCAuthController.register
);

router.post(
  '/change-password',
  auth('superAdmin', 'admin', 'contentW'),
  validateRequest(CCAuthValidation.changePasswordZodSchema),
  CCAuthController.changePassword
);

router.post(
  '/refresh-token',
  // auth('superAdmin', 'admin', 'contentW'),
  validateRequest(CCAuthValidation.refreshTokenZodSchema),
  CCAuthController.refreshToken
);

export const CCAuthRoutes = router;
