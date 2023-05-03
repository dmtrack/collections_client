import { Box } from '@mui/material';
import React from 'react';

const Loader = () => {
    return (
        <>
            <Box display='flex' justifyContent='center'>
                <div
                    className='spinner-grow loading-spinner'
                    role='status'></div>
            </Box>
        </>
    );
};

export default Loader;
