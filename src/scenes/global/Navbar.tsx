import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { Badge, Box, IconButton, useMediaQuery } from '@mui/material';
import {
    PersonOutline,
    MenuOutlined,
    SearchOutlined,
    NightlightOutlined,
    LanguageOutlined,
    Person,
    LoginOutlined,
    GroupTwoTone,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const { t } = useTranslation(['navbar']);
    const navigate = useNavigate();
    const { isAuth } = useAppSelector((state) => state.auth);
    const { access } = useAppSelector((state) => state.auth.access);
    const isNonMobile = useMediaQuery('(min-width:600px)');

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
                {isNonMobile ? (
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
                ) : null}

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
                    {access === 'admin' && isAuth ? (
                        <NavLink to='admin'>
                            <IconButton sx={{ color: 'black' }}>
                                <GroupTwoTone />
                            </IconButton>
                        </NavLink>
                    ) : null}
                    {!isAuth ? (
                        <NavLink to='login'>
                            <IconButton sx={{ color: 'black' }}>
                                <PersonOutline />
                            </IconButton>
                        </NavLink>
                    ) : (
                        <NavLink to='user/:userId'>
                            <IconButton sx={{ color: 'black' }}>
                                <Person />
                            </IconButton>
                        </NavLink>
                    )}

                    {isAuth ? (
                        <NavLink to='logout'>
                            <IconButton sx={{ color: 'black' }}>
                                <LoginOutlined />
                            </IconButton>
                        </NavLink>
                    ) : null}

                    <IconButton sx={{ color: 'black' }}>
                        <MenuOutlined />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Navbar;
