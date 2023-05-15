import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { shades } from '../../theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authorsContacts } from '../../utils/constants';

const Footer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation('translation', {
        keyPrefix: 'footer',
    });
    const theme = useTheme();
    const colors = shades(theme.palette.mode);

    return (
        <>
            {pathname === '/admin' || pathname === '/login' ? null : (
                <Box
                    mt='64px'
                    p='24px 0'
                    sx={{
                        bottom: '0',
                        width: '100%',
                    }}>
                    <Box
                        width='80%'
                        margin='auto'
                        display='flex'
                        justifyContent='space-between'
                        flexWrap='wrap'
                        rowGap='20px'
                        columnGap='clamp(16px, 32px, 48px)'>
                        <Box width='clamp(20%, 30%, 40%)'>
                            <Box
                                onClick={() => navigate('/')}
                                sx={{
                                    '&:hover': { cursor: 'pointer' },
                                    variant: 'h6',
                                    letterSpacing: '-0.5px',
                                    fontWeight: '800',
                                    fontSize: '20px',
                                }}
                                color={colors.secondary[800]}>
                                {t('title')}
                            </Box>
                        </Box>

                        <Box
                            display='flex'
                            gap='12px'
                            alignItems='center'
                            fontSize='24px'>
                            <Box
                                display='flex'
                                gap='10px'
                                color={colors.secondary[800]}>
                                {authorsContacts.map((contact) => (
                                    <a
                                        key={contact.id}
                                        href={contact.link}
                                        target='_blank'
                                        title={contact.title}
                                        rel='noreferrer'>
                                        {contact.icon}
                                    </a>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Footer;
