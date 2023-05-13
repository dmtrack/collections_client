import { IComment, ILike } from '../IItem';

export interface ClientToServerEvents {
    'get:comments': (itemId: number) => void;
    'get:likes': (itemId: number) => void;
    'add:comment': ({}: {
        userId: number;
        itemId: number;
        text: string;
        name: string;
    }) => void;
    'set:like': ({}: { userId: number; itemId: number; name: string }) => void;
}

export interface ServerToClientEvents {
    comments: (comments: IComment[]) => void;
    new_comment: (comment: IComment) => void;
    likes: (likes: ILike[]) => void;
    like: (like: ILike) => void;
    cancel_like: (userId: number) => void;
    token_error: () => void;
}
