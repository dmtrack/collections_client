import { RootState } from '../state';
import { useAppSelector } from './redux';

export const useApp = () => {
    const state = useAppSelector((state: RootState) => state.app);
    const darkTheme = state.theme === 'dark';
    return { ...state, darkTheme };
};
