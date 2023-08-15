import express, { Router } from 'express';
import { AppUpdateRoutes } from 'modules/rest/app-update/appUpdate.routes';
import { AppAuthRoutes } from 'modules/rest/auth/app/auth.app.routes';
import { CCAuthRoutes } from 'modules/rest/auth/cc/auth.cc.routes';
import { AppUserRoutes } from 'modules/rest/user/app/user.app.routes';

const router = express.Router();

type IModuleRoutes = {
  path: string;
  route: Router;
}[];

// the routes/events of socket sever is inside socket.server.ts
// route started with /api/v1
const moduleRoutes: IModuleRoutes = [
  { path: '/auth/cc', route: CCAuthRoutes },
  { path: '/auth/app', route: AppAuthRoutes },
  { path: '/user/app', route: AppUserRoutes },
  { path: '/app-update/cc', route: AppUpdateRoutes },
];

moduleRoutes.map(r => router.use(r.path, r.route));

export default router;
