import '../../styles/navbar-styles.css';
import { FC } from 'react';
import { Text } from '../../components/Common/Text';
import { Typography } from '@mui/material';
import {
    SearchOutlined,
    KeyboardCommandKeyOutlined,
} from '@mui/icons-material';

export const SearchButton: FC<{ onClick: () => void }> = ({ onClick }) => {
    const isMacOs = navigator.userAgent.includes('Mac');

    return (
        <div className='search-btn' onClick={onClick}>
            <SearchOutlined sx={{ mx: 1 }} fontSize='small' />
            <Text className='search-btn-title'>Search...</Text>
            <div className='shortcut'>
                {isMacOs ? (
                    <KeyboardCommandKeyOutlined
                        className='self-center'
                        fontSize='inherit'
                    />
                ) : (
                    <Typography fontSize='medium'>CTRL+</Typography>
                )}
                <Typography fontSize='medium'>K</Typography>
            </div>
        </div>
    );
};
