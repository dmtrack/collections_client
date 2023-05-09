import { Box } from '@mui/material';
import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <>
            <Box className={styles.background}>
                <div className={styles.loader} role='status'></div>
            </Box>
        </>
    );
};

export default Loader;
