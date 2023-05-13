import { Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from './socketEvents';

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
