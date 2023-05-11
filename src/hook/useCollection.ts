import { RootState } from '../state';
import { useAppSelector } from './redux';

export const useCollection = (collectionId: number) => {
    let collection;
    const collectionSearch = useAppSelector((state: RootState) =>
        state.collections.collections.find(
            (c) => Number(c.id) === Number(collectionId)
        )
    );
    const userCollectionSearch = useAppSelector((state: RootState) =>
        state.collections.userCollections.find(
            (c) => Number(c.id) === Number(collectionId)
        )
    );
    collection = !!collectionSearch ? collectionSearch : userCollectionSearch;
    const { userId: currentUserId } = useAppSelector(
        (state: RootState) => state.auth
    );
    const access = useAppSelector(
        (state: RootState) => state.auth.access.access
    );
    const isAdmin = access === 'admin' ? true : false;
    const hasFullAccess =
        (currentUserId && collection?.userId === currentUserId) || isAdmin;

    return { hasFullAccess, collection, isAdmin };
};
