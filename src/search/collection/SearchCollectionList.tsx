import '../../styles/search-styles.css';
import { connectHits } from 'react-instantsearch-dom';
import { SearchCollectionCard } from './SearchCollectionCard';
import { Box } from '@mui/material';
import { Text } from '../../components/Common/Text';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

export const SearchCollectionList = connectHits(({ hits }) => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'searchPage',
    });

    return (
        <Box>
            <Text
                className='search-title'
                hidden={hits.length === 0}
                prefix='searchPage'>
                {t('collections')}
            </Text>
            <Box>
                {hits.map((hit) => (
                    <SearchCollectionCard
                        key={hit.id}
                        hit={hit}
                        attribute='name'
                    />
                ))}
            </Box>
        </Box>
    );
});
