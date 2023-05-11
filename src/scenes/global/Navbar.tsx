import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import {
    Badge,
    Box,
    IconButton,
    Typography,
    useMediaQuery,
} from '@mui/material';
import {
    PersonOutline,
    MenuOutlined,
    NightlightOutlined,
    LanguageOutlined,
    Person,
    LoginOutlined,
    GroupTwoTone,
} from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme';
import { NavLink } from 'react-router-dom';
import { SearchButton } from '../../components/SearchButton/SearchButton';
import { setSearchOpen } from '../../state/slices/app.slice';
import { SearchDialog } from '../../search/SearchDialog';

const Navbar = () => {
    const { t } = useTranslation(['navbar']);
    const navigate = useNavigate();
    const { isAuth } = useAppSelector((state) => state.auth);
    const { access } = useAppSelector((state) => state.auth.access);
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const { userId } = useAppSelector((state) => state.auth);

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
                            fontSize: '24px',
                            letterSpacing: '-0.5px',
                            fontWeight: '800',
                        }}
                        color={shades.secondary[800]}>
                        The Collections
                    </Box>
                ) : null}

                <Box display='flex' columnGap='20px' zIndex='2'>
                    <Box>
                        <SearchButton onClick={() => setSearchOpen(true)} />

                        <SearchDialog />
                    </Box>
                    <Tooltip title='Light mode'>
                        <IconButton sx={{ color: `${shades.secondary[800]}` }}>
                            <NightlightOutlined />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Switch to EN'>
                        <IconButton sx={{ color: `${shades.secondary[800]}` }}>
                            <LanguageOutlined />
                        </IconButton>
                    </Tooltip>
                    {access === 'admin' && isAuth ? (
                        <NavLink to='admin'>
                            <Tooltip title='Admin panel'>
                                <IconButton
                                    sx={{ color: `${shades.secondary[800]}` }}>
                                    <GroupTwoTone />
                                </IconButton>
                            </Tooltip>
                        </NavLink>
                    ) : null}
                    {!isAuth ? (
                        <NavLink to='login'>
                            <Tooltip title='Login'>
                                <IconButton
                                    sx={{ color: `${shades.secondary[800]}` }}>
                                    <PersonOutline />
                                </IconButton>
                            </Tooltip>
                        </NavLink>
                    ) : (
                        <NavLink to={`users/${userId}`}>
                            <Tooltip title='Profile'>
                                <IconButton
                                    sx={{ color: `${shades.secondary[800]}` }}>
                                    <Person />
                                </IconButton>
                            </Tooltip>
                        </NavLink>
                    )}

                    {isAuth ? (
                        <NavLink to='logout'>
                            <Tooltip title='Logout'>
                                <IconButton
                                    sx={{ color: `${shades.secondary[800]}` }}>
                                    <LoginOutlined />
                                </IconButton>
                            </Tooltip>
                        </NavLink>
                    ) : null}

                    {/* <IconButton sx={{ color: `${shades.secondary[800]}` }}>
                        <MenuOutlined />
                    </IconButton> */}
                </Box>
            </Box>
        </Box>
    );
};

export default Navbar;
