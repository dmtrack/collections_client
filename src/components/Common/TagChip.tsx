import { FC } from 'react';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hook/redux';
import { TagType } from '../../models/IItem';

export const TagChip: FC<{ tag: TagType }> = ({ tag }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
        // dispatch(setSearchTags([tag]))
    };
    return (
        <Box mx={0.5}>
            <Chip label={tag.name} size='medium' onClick={handleClick} />
        </Box>
    );
};
