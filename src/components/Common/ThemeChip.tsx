import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Chip } from '@mui/material';
import { useCollection } from '../../hook/collectionStateHook';
import { useTranslation } from 'react-i18next';
// import { setSearchTheme } from "../store/slices/mainSlice"

type TypeColor =
    | 'primary'
    | 'secondary'
    | 'default'
    | 'success'
    | 'warning'
    | 'error';

export const ThemeChip: FC<{
    border?: string;
    themeId: number;
    color?: TypeColor;
    backgroundColor?: string;
}> = ({ themeId, color, backgroundColor, border }) => {
    const { t } = useTranslation(['collection_page']);
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
                color={color}
                size='small'
                variant='outlined'
                onClick={handleClick}
                sx={{
                    backgroundColor: `${backgroundColor}`,
                    border: `${border}`,
                }}
            />
        </Box>
    );
};
