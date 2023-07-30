import { Secret } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { JwtHelper } from '../../shared/jwtHelper';
import configs from '../../configs';

type Next = (err?: ExtendedError | undefined) => void;

export const verifySocketToken = (socket: Socket, next: Next) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = JwtHelper.verifyToken(token, configs.jwt.secret as Secret);
    socket.data.user = decoded;
  } catch (err) {
    const socketError = new Error('NOT_AUTHORIZED');
    return next(socketError);
  }

  next();
};
