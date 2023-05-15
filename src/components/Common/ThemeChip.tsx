import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, useTheme } from '@mui/material';
import { useCollection } from '../../hook/collectionStateHook';
import { useTranslation } from 'react-i18next';
import { shades } from '../../theme';
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
    const themeItem = getTheme(themeId);
    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    console.log(theme.palette.mode);

    const handleClick = () => {
        navigate('/', { state: { contentType: 'collections' } });
        // dispatch(setSearchTheme(themeId))
    };
    return (
        <Box m={0.5} display='inline-block'>
            <Chip
                label={t(`${themeItem?.name}`)}
                color={color}
                size='small'
                variant='outlined'
                onClick={handleClick}
                sx={{
                    fontSize: '11px',
                    backgroundColor:
                        theme.palette.mode === 'light'
                            ? `${colors.primary[800]}`
                            : `${colors.secondary[800]}`,
                    border: `${border}`,
                    color:
                        theme.palette.mode === 'light'
                            ? `${colors.neutral[100]}`
                            : `${colors.primary[800]}`,
                }}
            />
        </Box>
    );
};
