import { connectSearchBox } from 'react-instantsearch-dom';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, TextField, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, shades } from '../theme';

export const SearchInput = connectSearchBox(({ currentRefinement, refine }) => {
    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    return (
        <TextField
            sx={{
                color: `${colors.secondary[800]}`,
            }}
            className='bg-gray'
            value={currentRefinement}
            onChange={(event) => refine(event.currentTarget.value)}
            fullWidth
            InputProps={{
                startAdornment: <SearchIcon color='primary' />,
                endAdornment: (
                    <IconButton onClick={() => refine('')}>
                        <CloseIcon />
                    </IconButton>
                ),
            }}
        />
    );
});
