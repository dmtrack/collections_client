import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Chip } from '@mui/material';
import { useCollection } from '../hook/collectionStateHook';
import { useAppDispatch } from '../hook/redux';
import { useTranslation } from 'react-i18next';
// import { setSearchTheme } from "../store/slices/mainSlice"

export const ThemeChip: FC<{ themeId: number }> = ({ themeId }) => {
    const { t } = useTranslation(['collection_page']);

    const dispatch = useAppDispatch;
    const navigate = useNavigate();
    const { getTheme } = useCollection();
    const theme = getTheme(themeId);

    const handleClick = () => {
        navigate('/', { state: { contentType: 'collections' } });
        // dispatch(setSearchTheme(themeId))
    };
    return (
        <Box m={0.5} display='inline-block'>
            <Chip
                label={t(`${theme?.name}`)}
                color='primary'
                size='small'
                variant='outlined'
                onClick={handleClick}
            />
        </Box>
    );
};
