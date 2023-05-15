import { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Text } from '../Common/Text';
import { useTranslation } from 'react-i18next';
import { BlurDialog } from '../Common/BlurDialog';
import { useAppDispatch } from '../../hook/redux';
import { TransButton } from '../Common/TransButton';
import { shades } from '../../theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICollection } from '../../models/ICollection';
import { deleteCollection } from '../../state/actions/collections.actions';
import { IItem } from '../../models/IItem';
import { deleteItem } from '../../state/actions/items.actions';

interface DeleteDialogProps {
    open: boolean;
    onClose: () => void;
    userId: number;
    entity?: IItem | ICollection;
    entityId: number;
    link?: number;
}

export const DeleteDialog: FC<DeleteDialogProps> = ({
    open,
    onClose,
    entityId,
    userId,
    entity,
    link,
}) => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'modal',
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation().pathname;
    const { handleSubmit } = useForm<FieldValues>({});
    const theme = useTheme();
    const colors = shades(theme.palette.mode);

    const closeHandler = () => {
        onClose();
    };

    const deleteHandler: SubmitHandler<FieldValues> = () => {
        if (location.includes('collections')) {
            dispatch(deleteCollection(entityId, navigate, userId));
            closeHandler();
        }
        if (location.includes('items')) {
            dispatch(deleteItem(entityId, navigate, userId, Number(link)));
            closeHandler();
        }
    };

    return (
        <BlurDialog open={open} fullWidth onClose={closeHandler}>
            <Box
                component='form'
                px={3}
                py={1}
                mt={1}
                onSubmit={handleSubmit(deleteHandler)}
                maxHeight={200}
                display='flex'
                flexDirection='column'
                justifyContent='space-between'>
                <Box display='flex' flexDirection='column' gap='4px'>
                    <Text
                        variant='h5'
                        color={colors.secondary[800]}
                        letterSpacing='-0.5px'
                        fontWeight='600'>
                        {t('destroyTitle')}
                    </Text>
                    <Typography color={colors.secondary[800]} mt={2}>
                        {t('destroyText')}
                    </Typography>

                    <Box display='flex' justifyContent='space-between' mt={3}>
                        <TransButton type='submit' color='inherit'>
                            {t('yep')}
                        </TransButton>
                        <TransButton onClick={closeHandler}>
                            {t('nope')}
                        </TransButton>
                    </Box>
                </Box>
            </Box>
        </BlurDialog>
    );
};
