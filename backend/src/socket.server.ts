import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { instrument } from '@socket.io/admin-ui';
// namespaces
import { onMainNamespaceConnect } from 'modules/socket/demo-all/main.namespace';
import { onLeaderBoardNspConnect } from 'modules/socket/demo/leaderboard.namespace';
// middlewares
import { verifySocketToken } from 'middlewares/socket/auth';
import configs from 'configs';

const registerServer = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  // for admin ui view -> ui: https://admin.socket.io/
  instrument(io, {
    auth: {
      type: configs.socket_admin.type as 'basic',
      username: configs.socket_admin.username as string,
      password: configs.socket_admin.password as string,
    },
    mode: configs.env as 'development',
  });

  // ----------main nsp------------
  const mainNsp = io.of('/');
  // middleware of main nsp
  mainNsp.use(verifySocketToken);
  // connection
  mainNsp.on('connection', socket => onMainNamespaceConnect(mainNsp, socket));

  // ----------other namespaces-----------
  const leaderBoardNsp = io.of('/leader-board');
  //middleware goose here
  leaderBoardNsp.use((socket, next) => {
    next();
  });
  leaderBoardNsp.on('connection', socket => onLeaderBoardNspConnect(leaderBoardNsp, socket));
};

export const SocketServer = {
  registerServer,
};
