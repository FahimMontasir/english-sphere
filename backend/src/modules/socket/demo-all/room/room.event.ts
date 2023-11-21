import { logger } from '../../../../shared/logger';
import { RoomEventServer, RoomEventSocket } from './room.interface';
// import {  RoomSocketService } from './room.service';

export const roomEvent = (_io: RoomEventServer, socket: RoomEventSocket) => {
  socket.on('roomCreate', () => {
    // RoomSocketService.roomCreateHandler(socket);
  });

  socket.on('roomJoin', data => {
    // RoomSocketService.roomJoinHandler(socket, data);
    logger.info(data);
  });

  socket.on('roomLeave', data => {
    // RoomSocketService.roomLeaveHandler(socket, data);
    logger.info(data);
  });

  socket.on('connInit', data => {
    // RoomSocketService.roomInitializeConnectionHandler(socket, data);
    logger.info(data);
  });

  socket.on('connSignal', data => {
    // RoomSocketService.roomSignalingDataHandler(socket, data);
    logger.info(data);
  });
};
