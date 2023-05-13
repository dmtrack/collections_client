import { io } from 'socket.io-client';
import {
    commentSocketEvents,
    likeSocketEvents,
    socketEvents,
} from './itemSocketEvents';
import { setCommentLoading, setLikesLoading } from '../../slices/item.slice';
import { AppSocket } from '../../../models/socket/socket';
import { AppDispatch, GetState, RootState } from '../..';
import { useAppSelector } from '../../../hook/redux';

export const connectItemSocket =
    (itemId: number) => (dispatch: AppDispatch) => {
        const socket: AppSocket = io(process.env.REACT_APP_SOCKET_URL + '', {
            transports: ['websocket'],
        });
        dispatch(socketEvents(socket, itemId));
        dispatch(commentSocketEvents(socket));
        dispatch(likeSocketEvents(socket));
    };

export const postNewComment =
    (itemId: number, text: string) => (dispatch: AppDispatch) => {
        const { userId, name } = useAppSelector(
            (state: RootState) => state.auth
        );
        const socket = useAppSelector((state: RootState) => state.items.socket);

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
        const { userId, name } = useAppSelector(
            (state: RootState) => state.auth
        );
        const socket = useAppSelector((state: RootState) => state.items.socket);
        socket?.emit('set:like', { userId: userId, itemId, name });
        dispatch(setLikesLoading(true));
    };
