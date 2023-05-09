import { Box, LinearProgress } from '@mui/material';

const LittleLoader = () => {
    return (
        <>
            <Box sx={{ width: '100%', position: 'flex' }}>
                <LinearProgress color='secondary' />
            </Box>
        </>
    );
};

export default LittleLoader;
