import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { Badge, Box, IconButton } from '@mui/material';
import {
    PersonOutline,
    MenuOutlined,
    SearchOutlined,
    NightlightOutlined,
    LanguageOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme';

const Navbar = () => {
    const { t } = useTranslation(['navbar']);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <Box
            display='flex'
            alignItems='center'
            width='100%'
            height='60px'
            sx={{ background: 'rgba(255,255,255, 0.95)' }}
            color='black'
            // position='fixed'
            top='0'
            left='0'
            zIndex='1'>
            <Box
                width='80%'
                margin='auto'
                display='flex'
                justifyContent='space-between'
                alignItems='center'>
                <Box
                    onClick={() => navigate('/')}
                    sx={{
                        '&:hover': { cursor: 'pointer' },
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                    color={shades.secondary[500]}>
                    Collections
                </Box>
                <Box
                    display='flex'
                    justifyContent='space-between'
                    columnGap='20px'
                    zIndex='2'>
                    <IconButton sx={{ color: 'black' }}>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton sx={{ color: 'black' }}>
                        <NightlightOutlined />
                    </IconButton>

                    <IconButton sx={{ color: 'black' }}>
                        <LanguageOutlined />
                    </IconButton>
                    <IconButton sx={{ color: 'black' }}>
                        <PersonOutline />
                    </IconButton>
                    <IconButton sx={{ color: 'black' }}>
                        <MenuOutlined />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Navbar;
