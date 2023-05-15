import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../hook/appState';
import {
    Box,
    Button,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Text } from './Common/Text';
import { useTranslation } from 'react-i18next';
import { shades } from '../theme';

const NotfoundPage = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'notFound' });
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    const goBackPage = () => {
        navigate(-1);
    };

    return (
        <Box
            display='flex'
            alignItems='center'
            flexDirection='column'
            height='100vh'>
            <Box mb={6}>
                <Typography
                    textAlign='center'
                    color={colors.secondary[800]}
                    mt={isNonMobile ? '36px' : '72px'}
                    sx={{
                        letterSpacing: '-0.5px',
                        fontWeight: '600',
                        fontSize: isNonMobile ? '96px' : '64px',
                    }}>
                    404
                </Typography>
                <Text bgcolor={colors.secondary[800]} textAlign='center'>
                    {t('pageIsNotFound')}
                </Text>
            </Box>
            <Button
                sx={{
                    backgroundColor: `${colors.secondary[800]}`,
                }}
                variant='contained'
                onClick={() => navigate('/')}>
                {t('buttonText')}
            </Button>
        </Box>
    );
};

export default NotfoundPage;
