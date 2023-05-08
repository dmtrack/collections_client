import { useAppSelector } from '../hook/redux';
import { RootState } from '../state';

export const useCollection = () => {
    const collectionState = useAppSelector(
        (state: RootState) => state.collections
    );
    const { userId } = useAppSelector((state: RootState) => state.auth);
    const isAdmin = useAppSelector(
        (state: RootState) => state.auth.access.access === 'admin'
    );

    const isAuthor =
        userId &&
        (collectionState.collections.find((user) => user.id === userId) ||
            isAdmin);
    const getTheme = (id: number) => {
        const theme = collectionState.themes.find(
            (theme) => Number(theme.id) === id
        );
        return theme;
    };

    return { getTheme, isAuthor, ...collectionState };
};
