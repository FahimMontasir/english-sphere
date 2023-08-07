import express, { Router } from 'express';
// import { FriendInvitationRoutes } from '../modules/rest/chat-req/friendInvitation.routes';
import { CCAuthRoutes } from 'modules/rest/auth/cc/auth.cc.routes';

const router = express.Router();

type IModuleRoutes = {
  path: string;
  route: Router;
}[];

// the routes/events of socket sever is inside socket.server.ts
// route started with /api/v1
const moduleRoutes: IModuleRoutes = [
  { path: '/auth/cc', route: CCAuthRoutes },
  // {
  //   path: '/friend-invitation',
  //   route: FriendInvitationRoutes,
  // },
];

moduleRoutes.map(r => router.use(r.path, r.route));

export default router;
