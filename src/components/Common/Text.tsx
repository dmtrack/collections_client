import { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { shades } from '../../theme';

export const Text: FC<TypographyProps> = ({ children, ...props }) => {
    const { t } = useTranslation('translation', {
        keyPrefix: props?.prefix,
    });
    return (
        <Typography {...props}>
            <Trans t={t}>{children}</Trans>
        </Typography>
    );
};
