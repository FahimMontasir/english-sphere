import { Namespace, Socket } from 'socket.io';
import { IDecodedUser } from '../../../../interfaces/user';
import { IConStoredUser } from '../main.interface';

type IFriends = {
  id: string;
  mail: string;
  username: string;
}[];

type ServerToClientEvents = {
  onlineUsers: ({ onlineUsers }: { onlineUsers: IConStoredUser[] }) => void;
  friendsInvitations: ({ pendingInvitations }: { pendingInvitations: any[] | [] }) => void;
  friendsList: ({ friends }: { friends: IFriends }) => void;
};

type ClientToServerEvents = {
  //nothing
};

type InterServerEvents = {
  // ping: () => void;
};

type SocketData = {
  user: IDecodedUser;
};

export type UserEventServer = Namespace<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type UserEventSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
