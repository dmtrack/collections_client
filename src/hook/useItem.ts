import { RootState } from '../state';
import { useAppSelector } from './redux';

const useItem = (itemId: number) => {
    const item = useAppSelector((state: RootState) =>
        state.items.items.find((item) => Number(item.id) === Number(itemId))
    );

    const { userId: currentUserId } = useAppSelector(
        (state: RootState) => state.auth
    );
    const access = useAppSelector(
        (state: RootState) => state.auth.access.access
    );
    const isAdmin = access === 'admin' ? true : false;
    const hasFullAccess =
        (currentUserId && item?.userId === currentUserId) || isAdmin;

    return { hasFullAccess, item, isAdmin };
};
