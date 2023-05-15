import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../hook/redux';
import {
    Badge,
    Box,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
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
import { ColorModeContext } from '../../../theme';
import { NavLink } from 'react-router-dom';
import { SearchButton } from '../../../components/SearchButton/SearchButton';
import { setSearchOpen } from '../../../state/slices/app.slice';
import { SearchDialog } from '../../../search/SearchDialog';
import { useApp } from '../../../hook/appState';
import { MenuSettings } from './MenuSettings';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useThemeContext } from '../../../theme/src/theme/ThemeContextProvider';
import { useContext } from 'react';
import { shades } from '../../../theme';

const Navbar = () => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'header',
    });
    const navigate = useNavigate();
    const { isAuth } = useAppSelector((state) => state.auth);
    const { access } = useAppSelector((state) => state.auth.access);
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const { userId } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <>
            {/* <div className={`navbar ${darkTheme && 'navbar_dark'} border-b`}> */}
            <Box
                display='flex'
                alignItems='center'
                width='100%'
                height='60px'
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
                                fontSize: '20px',
                                letterSpacing: '-0.5px',
                                fontWeight: '800',
                                color: `${colors.secondary[800]}`,
                            }}>
                            {t('collections')}
                        </Box>
                    ) : null}
                    {/* {<MenuSettings />} */}
                    <Box display='flex' columnGap='20px' zIndex='2'>
                        <Box onClick={() => setSearchOpen(true)}>
                            <SearchButton
                                onClick={() => dispatch(setSearchOpen(true))}
                            />

                            <SearchDialog />
                        </Box>
                        <Tooltip title='Light mode'>
                            <IconButton onClick={colorMode.toggleColorMode}>
                                {theme.palette.mode === 'dark' ? (
                                    <DarkModeOutlinedIcon
                                        sx={{
                                            color: `${colors.secondary[800]}`,
                                        }}
                                    />
                                ) : (
                                    <LightModeOutlinedIcon
                                        sx={{
                                            color: `${colors.secondary[800]}`,
                                        }}
                                    />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Switch to EN'>
                            <IconButton
                                sx={{ color: `${colors.secondary[800]}` }}>
                                <LanguageOutlined />
                            </IconButton>
                        </Tooltip>
                        {access === 'admin' && isAuth ? (
                            <NavLink to='admin'>
                                <Tooltip title='Admin panel'>
                                    <IconButton
                                        sx={{
                                            color: `${colors.secondary[800]}`,
                                        }}>
                                        <GroupTwoTone />
                                    </IconButton>
                                </Tooltip>
                            </NavLink>
                        ) : null}
                        {!isAuth ? (
                            <NavLink to='login'>
                                <Tooltip title='Login'>
                                    <IconButton
                                        sx={{
                                            color: `${colors.secondary[800]}`,
                                        }}>
                                        <PersonOutline />
                                    </IconButton>
                                </Tooltip>
                            </NavLink>
                        ) : (
                            <NavLink to={`users/${userId}`}>
                                <Tooltip title='Profile'>
                                    <IconButton
                                        sx={{
                                            color: `${colors.secondary[800]}`,
                                        }}>
                                        <Person />
                                    </IconButton>
                                </Tooltip>
                            </NavLink>
                        )}

                        {isAuth ? (
                            <NavLink to='logout'>
                                <Tooltip title='Logout'>
                                    <IconButton
                                        sx={{
                                            color: `${colors.secondary[800]}`,
                                        }}>
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
            {/* </div> */}
        </>
    );
};

export default Navbar;
