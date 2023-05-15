import {
    Box,
    Breadcrumbs as MUIBreadCrumbs,
    Link,
    Typography,
    useTheme,
} from '@mui/material';
import { shades } from '../theme';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { WithRouterProps, withRouter } from './withRouter';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import { Text } from '../components/Common/Text';

const BreadCrumbs = (props: WithRouterProps) => {
    const { t } = useTranslation('translation', { keyPrefix: 'breadcrumb' });

    const {
        navigate,
        location: { pathname },
    } = props;
    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    const regular = new RegExp('^[0-9]+$');
    const pathnames = pathname.split('/').filter((x) => x);
    return (
        <>
            {pathname !== '/login' ? (
                <Box width='80%' m='120px auto 0px auto'>
                    <MUIBreadCrumbs
                        aria-label='breadcrumb'
                        separator={<NavigateNextIcon />}>
                        <Link
                            underline='none'
                            onClick={() => navigate('/')}
                            fontSize='14px'
                            // sx={{ color: `${colors.primary[500]}` }}
                        >
                            {t('home')}
                        </Link>

                        {pathnames
                            .slice(0, pathnames.length - 1)
                            .map((name: string, index: number) => {
                                const routeTo = `/${pathnames
                                    .slice(0, index + 1)
                                    .join('/')}`;
                                let reg = regular.test(name);
                                return !reg ? (
                                    <Link
                                        underline='none'
                                        onClick={() => navigate(routeTo)}
                                        key={v4()}
                                        // sx={{ color: `${colors.primary[500]}` }}
                                        fontSize='14px'>
                                        {`${t(`${name}`)}`}
                                    </Link>
                                ) : (
                                    <Link
                                        underline='none'
                                        onClick={() => navigate(routeTo)}
                                        key={v4()}
                                        fontSize='14px'>
                                        {`${name}`}
                                    </Link>
                                );
                            })}
                        <Typography fontSize='14px'>
                            {pathnames.length > 0
                                ? pathnames.slice(pathnames.length - 1)
                                : null}
                        </Typography>
                    </MUIBreadCrumbs>
                </Box>
            ) : null}
        </>
    );
};

export default withRouter(BreadCrumbs);
