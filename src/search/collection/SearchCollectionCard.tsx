import '../../styles/search-styles.css';
import { connectHighlight } from 'react-instantsearch-dom';
import { Box } from '@mui/material';
import { HighlightText } from '../HighlightText';

import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hook/redux';
import { setSearchOpen } from '../../state/slices/app.slice';

export const SearchCollectionCard = connectHighlight(({ highlight, hit }) => {
    const dispatch = useAppDispatch();
    const highlightTitle = highlight({
        highlightProperty: '_highlightResult',
        attribute: 'name',
        hit,
    });
    const highlightDescription = highlight({
        highlightProperty: '_highlightResult',
        attribute: 'description',
        hit,
    });

    return (
        <Box className='search-card'>
            <Link
                to={`/collections/${hit.id}`}
                onClick={() => dispatch(setSearchOpen(false))}>
                <HighlightText highlight={highlightTitle} />
                {highlightDescription.find((h) => h.isHighlighted) && (
                    <HighlightText
                        highlight={highlightDescription}
                        fontSize='small'
                    />
                )}
            </Link>
        </Box>
    );
});
