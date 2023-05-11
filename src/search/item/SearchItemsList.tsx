import '../../styles/search-styles.css';
import { connectHits } from 'react-instantsearch-dom';
import { SearchItemCard } from './SearchItemCard';
import { Box } from '@mui/material';
import { Text } from '../../components/Common/Text';
import { useTranslation } from 'react-i18next';

export const SearchItemsList = connectHits(({ hits }) => {
    const { t } = useTranslation(['searchPage']);

    return (
        <Box>
            <Text className='search-title' hidden={hits.length === 0}>
                {t('items')}
            </Text>
            <Box>
                {hits.map((hit) => (
                    <SearchItemCard key={hit.id} hit={hit} attribute='name' />
                ))}
            </Box>
        </Box>
    );
});
