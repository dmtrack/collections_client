import '../../styles/search-styles.css';
import { connectHits } from 'react-instantsearch-dom';
import { SearchItemCard } from './SearchItemCard';
import { Box } from '@mui/material';
import { Text } from '../../components/Common/Text';

export const SearchItemsList = connectHits(({ hits }) => {
    return (
        <Box>
            <Text className='search-title' hidden={hits.length === 0}>
                Items
            </Text>
            <Box>
                {hits.map((hit) => (
                    <SearchItemCard key={hit.id} hit={hit} attribute='name' />
                ))}
            </Box>
        </Box>
    );
});
