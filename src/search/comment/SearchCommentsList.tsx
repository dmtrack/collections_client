import '../../styles/search-styles.css';
import { connectHits } from 'react-instantsearch-dom';
import { SearchCommentCard } from './SearchCommentCard';
import { Box } from '@mui/material';
import { Text } from '../../components/Common/Text';
import { useTranslation } from 'react-i18next';

export const SearchCommentsList = connectHits(({ hits }) => {
    const { t } = useTranslation(['searchPage']);

    return (
        <Box>
            <Text className='search-title' hidden={hits.length === 0}>
                {t('comments')}
            </Text>
            <Box>
                {hits.map((hit) => (
                    <SearchCommentCard
                        key={hit.id}
                        hit={hit}
                        attribute='text'
                    />
                ))}
            </Box>
        </Box>
    );
});
