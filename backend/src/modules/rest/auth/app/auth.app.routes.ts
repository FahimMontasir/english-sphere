import express from 'express';
import validateRequest from 'middlewares/rest/validateRequest';
import { AppLoginAuth } from 'middlewares/rest/auth/login/auth.login.app';
import { AppAuthValidation } from './auth.app.validation';
import { AppAuthController } from './auth.app.controller';

const router = express.Router();

router.post(
  '/login',
  AppLoginAuth.checkRequest,
  validateRequest(AppAuthValidation.loginZodSchema),
  AppAuthController.login
);

export const AppAuthRoutes = router;
