import { RootState } from '../state';
import { useAppSelector } from './redux';

export const useCollection = (collectionId: number) => {
    const collection = useAppSelector((state: RootState) =>
        state.collections.collections.find((c) => Number(c.id) === collectionId)
    );

    const { userId: currentUserId } = useAppSelector(
        (state: RootState) => state.auth
    );
    const access = useAppSelector(
        (state: RootState) => state.auth.access.access
    );
    const isAdmin = access === 'admin' ? true : false;
    const isAuthor = currentUserId && collection?.userId === currentUserId;

    return { isAuthor, collection, isAdmin };
};
