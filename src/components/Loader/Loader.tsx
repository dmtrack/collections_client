import { Box, LinearProgress } from '@mui/material';
import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <>
            <Box className={styles.background}>
                <Box sx={{ width: '100%', position: 'fixed' }}>
                    <LinearProgress color='secondary' />
                </Box>
            </Box>
        </>
    );
};

export default Loader;
