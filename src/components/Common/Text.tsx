import { FC } from 'react';
import { Typography, TypographyProps, useTheme } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { shades } from '../../theme';

export const Text: FC<TypographyProps> = ({ children, ...props }) => {
    const { t } = useTranslation('translation', {
        keyPrefix: props?.prefix,
    });
    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    return (
        <Typography {...props} sx={{ color: `${colors.secondary[800]}` }}>
            <Trans t={t}>{children}</Trans>
        </Typography>
    );
};
