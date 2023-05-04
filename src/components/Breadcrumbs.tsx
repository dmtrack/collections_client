import {
    Box,
    Breadcrumbs as MUIBreadCrumbs,
    Link,
    Typography,
} from '@mui/material';
import { shades } from '../theme';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { WithRouterProps, withRouter } from './withRouter';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';

const BreadCrumbs = (props: WithRouterProps) => {
    const { t } = useTranslation('translation', { keyPrefix: 'breadcrumb' });

    const {
        navigate,
        location: { pathname },
    } = props;
    const regular = new RegExp('^[0-9]+$');
    const pathnames = pathname.split('/').filter((x) => x);

    return (
        <>
            {pathname !== '/login' ? (
                <Box width='80%' m='120px auto 0px auto'>
                    <MUIBreadCrumbs
                        aria-label='breadcrumb'
                        separator={<NavigateNextIcon />}>
                        <Link onClick={() => navigate('/')}>{t('home')}</Link>
                        {pathnames
                            .slice(0, pathnames.length - 1)
                            .map((name, index) => {
                                const routeTo = `/${pathnames
                                    .slice(0, index + 1)
                                    .join('/')}`;
                                let reg = regular.test(name);
                                return !reg ? (
                                    <Link
                                        onClick={() => navigate(routeTo)}
                                        key={v4()}>
                                        {`${t(`${name}`)}`}
                                    </Link>
                                ) : (
                                    <Link
                                        onClick={() => navigate(routeTo)}
                                        key={v4()}>
                                        {`${name}`}
                                    </Link>
                                );
                            })}
                        <Typography color={shades.primary[400]}>
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
