import React from 'react';

import styles from './EmptyContainer.module.scss';
import { Box, Typography } from '@mui/material';
import { shades } from '../../theme';

interface EmptyContainerProps {
    title: string;
    text: string;
}

function EmptyContainer({ title, text }: EmptyContainerProps) {
    return (
        <Box className='content text-center mt-4 mb-5'>
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
