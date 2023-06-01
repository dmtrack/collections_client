import '../../styles/search-styles.css';
import { connectHighlight } from 'react-instantsearch-dom';
import { Box } from '@mui/material';
import { HighlightText } from '../HighlightText';
import { Link } from 'react-router-dom';
import { setSearchOpen } from '../../state/slices/app.slice';
import { useAppDispatch } from '../../hook/redux';

export const SearchCommentCard = connectHighlight(
    ({ highlight, hit, attribute }) => {
        const dispatch = useAppDispatch();
        const highlightComment = highlight({
            highlightProperty: '_highlightResult',
            attribute,
            hit,
        });

        return (
            <Box className='search-card'>
                <Link
                    to={`/items/${hit.itemId}`}
                    onClick={() => dispatch(setSearchOpen(false))}>
                    <HighlightText highlight={highlightComment} />
                </Link>
            </Box>
        );
    }
);
