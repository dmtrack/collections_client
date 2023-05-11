import { connectStateResults } from 'react-instantsearch-dom';

import { Box } from '@mui/material';
import Loader from '../components/Loader/Loader';

export const LoadingIndicator = connectStateResults(({ isSearchStalled }) => {
    return isSearchStalled ? (
        <Box width='min-content' mx='auto' mt={1}>
            <Loader />
        </Box>
    ) : null;
});
