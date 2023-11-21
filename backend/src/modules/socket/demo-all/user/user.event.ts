import { logger } from '../../../../shared/logger';
// import { UserSocketService } from './user.service';
import { UserEventServer, UserEventSocket } from './user.interface';

export const userEvent = (_io: UserEventServer, socket: UserEventSocket) => {
  logger.info(`user connected ${socket.id}`);

  // UserSocketService.newConnectionHandler(socket);

  // UserSocketService.emitOnlineUsers(io);

  setInterval(() => {
    // UserSocketService.emitOnlineUsers(io);
  }, 1000 * 8);
};
