import { Box, Typography, useTheme } from '@mui/material';
import { shades } from '../../../theme';

interface EmptyContainerProps {
    title: string;
    text: string;
}

function EmptyContainer({ title, text }: EmptyContainerProps) {
    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    return (
        <Box mt='96px' textAlign='center' height='115px'>
            <Typography gutterBottom color={colors.secondary[800]}>
                {title}{' '}
            </Typography>{' '}
            <Typography
                gutterBottom
                component='div'
                color={colors.secondary[800]}>
                {text}{' '}
            </Typography>{' '}
        </Box>
    );
}

export default EmptyContainer;
