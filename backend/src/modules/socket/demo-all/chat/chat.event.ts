import { logger } from '../../../../shared/logger';
import { ChatEventServer, ChatEventSocket } from './chat.interface';
// import { ChatSocketService } from './chat.service';

export const chatEvent = (_io: ChatEventServer, socket: ChatEventSocket) => {
  socket.on('directMessage', data => {
    // ChatSocketService.directMessageHandler(socket, data);
    logger.info(data);
  });

  socket.on('directChatHistory', data => {
    // ChatSocketService.directChatHistoryHandler(socket, data);
    logger.info(data);
  });
};
