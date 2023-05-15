import '../../styles/navbar-styles.css';
import { FC } from 'react';
import { Text } from '../../components/Common/Text';
import { Typography, useTheme } from '@mui/material';
import {
    SearchOutlined,
    KeyboardCommandKeyOutlined,
} from '@mui/icons-material';
import { shades } from '../../theme';

export const SearchButton: FC<{ onClick: () => void }> = ({ onClick }) => {
    const isMacOs = navigator.userAgent.includes('Mac');
    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    return (
        <div className='search-btn' onClick={onClick}>
            <SearchOutlined
                sx={{ mx: 1, color: `${colors.secondary[800]}` }}
                fontSize='small'
            />
            <Text className='search-btn-title'>Search...</Text>
            <div className='shortcut'>
                {isMacOs ? (
                    <KeyboardCommandKeyOutlined
                        sx={{ color: `${colors.secondary[800]}` }}
                        className='self-center'
                        fontSize='inherit'
                    />
                ) : (
                    <Typography
                        fontSize='medium'
                        sx={{ color: `${colors.secondary[800]}` }}>
                        CTRL+
                    </Typography>
                )}
                <Typography
                    sx={{ color: `${colors.secondary[800]}` }}
                    fontSize='medium'>
                    K
                </Typography>
            </div>
        </div>
    );
};
