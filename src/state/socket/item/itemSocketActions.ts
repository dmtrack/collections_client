import { io } from 'socket.io-client';
import {
    commentSocketEvents,
    likeSocketEvents,
    socketEvents,
} from './itemSocketEvents';
import { setCommentLoading, setLikesLoading } from '../../slices/item.slice';
import { AppSocket } from '../../../models/socket/socket';
import { AppDispatch, GetState } from '../..';

export const connectItemSocket =
    (itemId: number) => (dispatch: AppDispatch) => {
        const socket: AppSocket = io(process.env.REACT_APP_SOCKET + '', {
            transports: ['websocket'],
        });
        dispatch(socketEvents(socket, itemId));
        dispatch(commentSocketEvents(socket));
        dispatch(likeSocketEvents(socket));
    };

export const postNewComment =
    (itemId: number, text: string) =>
    (dispatch: AppDispatch, getState: GetState) => {
        const {
            auth: { userId, name },
            items: { socket },
        } = getState();

        socket?.emit('add:comment', {
            userId: userId,
            itemId,
            text,
            name,
        });

        dispatch(setCommentLoading(true));
    };

export const toggleLike =
    (itemId: number) => (dispatch: AppDispatch, getState: GetState) => {
        const {
            auth: { userId, name },
            items: { socket },
        } = getState();

        socket?.emit('set:like', { userId: userId, itemId, name });
        dispatch(setLikesLoading(true));
    };
