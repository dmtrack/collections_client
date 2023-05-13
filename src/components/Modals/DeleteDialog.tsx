import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Text } from '../Common/Text';
import { useTranslation } from 'react-i18next';
import { BlurDialog } from '../Common/BlurDialog';
import { useAppDispatch } from '../../hook/redux';
import { TransButton } from '../Common/TransButton';
import { shades } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { ICollection } from '../../models/ICollection';
import { deleteCollection } from '../../state/actions/collections.actions';
import { IItem } from '../../models/IItem';

interface DeleteDialogProps {
    open: boolean;
    onClose: () => void;
    userId: number;
    entity?: IItem | ICollection;
    entityId: number;
}

export const DeleteDialog: FC<DeleteDialogProps> = ({
    open,
    onClose,
    entityId,
    userId,
}) => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'modal',
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { handleSubmit } = useForm<FieldValues>({});

    const closeHandler = () => {
        onClose();
    };

    const submitHandler: SubmitHandler<FieldValues> = () => {
        dispatch(deleteCollection(entityId, navigate, userId));
        closeHandler();
    };

    return (
        <BlurDialog open={open} fullWidth onClose={closeHandler}>
            <Box
                component='form'
                px={3}
                py={1}
                mt={1}
                onSubmit={handleSubmit(submitHandler)}
                maxHeight={200}
                display='flex'
                flexDirection='column'
                justifyContent='space-between'>
                <Box display='flex' flexDirection='column' gap='4px'>
                    <Text
                        variant='h5'
                        color={shades.secondary[800]}
                        letterSpacing='-0.5px'
                        fontWeight='600'>
                        {t('destroyTitle')}
                    </Text>
                    <Typography color={shades.secondary[800]} mt={2}>
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
