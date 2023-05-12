import { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { shades } from '../../theme';

export const Text: FC<TypographyProps> = ({ children, ...props }) => {
    const { t } = useTranslation();
    return (
        <Typography {...props}>
            <Trans t={t}>{children}</Trans>
        </Typography>
    );
};
