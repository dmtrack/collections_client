import { Box, Typography } from '@mui/material';
import { shades } from '../theme';

interface EmptyContainerProps {
    title: string;
    text: string;
}

function EmptyContainer({ title, text }: EmptyContainerProps) {
    return (
        <Box mt='48px' textAlign='center' height='115px'>
            <Typography gutterBottom color={shades.secondary[800]}>
                {title}{' '}
            </Typography>{' '}
            <Typography
                gutterBottom
                component='div'
                color={shades.secondary[800]}>
                {text}{' '}
            </Typography>{' '}
        </Box>
    );
}

export default EmptyContainer;
