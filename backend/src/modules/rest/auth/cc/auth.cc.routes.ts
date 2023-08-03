import express from 'express';
import validateRequest from '../../../../middlewares/rest/validateRequest';
import { CCAuthValidation } from './auth.cc.validation';
import { CCAuthController } from './auth.cc.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(CCAuthValidation.registerZodSchema),
  CCAuthController.register
);

router.post('/login', validateRequest(CCAuthValidation.loginZodSchema), CCAuthController.login);

// router.post(
//   '/change-password',
//   validateRequest(CCAuthValidation.changePasswordZodSchema),
//   CCAuthController.changePassword
// );

router.post(
  '/refresh-token',
  validateRequest(CCAuthValidation.refreshTokenZodSchema),
  CCAuthController.refreshToken
);

export const CCAuthRoutes = router;
