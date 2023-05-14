import { FC, useEffect, useState } from 'react';
import { ItemField } from './ItemField';
import { Box, TextField } from '@mui/material';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { TagsArea } from './TagsArea';
import { Text } from '../../components/Common/Text';
import { useTranslation } from 'react-i18next';
import { IFields, IItem, TagType } from '../../models/IItem';
import { BlurDialog } from '../../components/Common/BlurDialog';
import { useAppDispatch } from '../../hook/redux';
import { useCollection } from '../../hook/collectionStateHook';
import { TransButton } from '../../components/Common/TransButton';
import { createItem, editItem } from '../../state/actions/items.actions';
import { ItemConfigType } from '../../state/models/ICollection.state';
import { toast } from 'react-toastify';
import { MAX_IMAGE_SIZE, fileTypes } from '../../utils/constants';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import { shades } from '../../theme';
import { useNavigate } from 'react-router-dom';

interface EditItemDialogProps {
    open: boolean;
    onClose: () => void;
    collectionId: number;
    item?: IItem;
}

export const EditItemDialog: FC<EditItemDialogProps> = ({
    open,
    onClose,
    collectionId,
    item,
}) => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'items',
    });
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        setFocus,
        reset,
    } = useForm<FieldValues>({});

    useEffect(() => {
        if (item) {
            Object.entries(item).forEach(([key, value]) =>
                setValue(key, value)
            );
            setAddedTags(item.tags);
        }
    }, [item, setValue]);
    const itemConfigs = useCollection().itemConfigs.filter(
        (config: ItemConfigType) => !config.hidden
    );
    const [addedTags, setAddedTags] = useState<TagType[]>([]);
    const [image, setImage] = useState<File | undefined>(undefined);

    useEffect(() => {
        setFocus('name');
    }, []);
    const handleSetImage = (image: File) => {
        setImage(image);
    };

    const closeHandler = () => {
        reset();
        setAddedTags([]);
        onClose();
    };

    const submitHandler: SubmitHandler<FieldValues> = (data) => {
        if (image && image?.size > MAX_IMAGE_SIZE)
            return toast('The maximum image size is 10MB');
        if (item) {
            dispatch(editItem({ ...data, tags: addedTags } as IItem));
        } else {
            dispatch(
                createItem({
                    collectionId,
                    fields: { ...data } as IFields,
                    tags: addedTags,
                    image,
                })
            );
        }
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
                minHeight={400}
                display='flex'
                flexDirection='column'
                justifyContent='space-between'>
                <Box display='flex' flexDirection='column' gap='4px'>
                    {/* color={shades.secondary[800]} sx={{
            letterSpacing: '-0.5px',
            fontWeight: '600',
        }} */}

                    <Text
                        variant='h5'
                        color={shades.secondary[800]}
                        letterSpacing='-0.5px'
                        fontWeight='600'>
                        {item ? `${t('edit')}` : `${t('create')}`}
                    </Text>
                    <TextField
                        label={t('itemName')}
                        size='medium'
                        margin='dense'
                        fullWidth
                        {...register('name', { required: true })}
                        error={!!errors.name}
                    />
                    <TextField
                        label={t('itemDescription')}
                        size='medium'
                        margin='dense'
                        fullWidth
                        {...register('description', { required: true })}
                        error={!!errors.name}
                    />
                    <Box my={1}>
                        <TagsArea value={addedTags} setValue={setAddedTags} />
                    </Box>
                    <Box mt={2}>
                        <DragAndDrop
                            chooseFile={(file: File) => handleSetImage(file)}
                            fileTypes={fileTypes}
                            isDisabled
                            hoverTitle={t('Drop here')}
                            name='image'
                            caption={image ? 'items.file' : 'items.noFile'}
                        />
                    </Box>

                    {itemConfigs.map((config: ItemConfigType) => {
                        const required = config.type.slice(0, -1) !== 'bool';
                        return (
                            <div key={config.id}>
                                <ItemField
                                    type={config.type}
                                    label={config.label}
                                    control={control}
                                    required={required}
                                />
                            </div>
                        );
                    })}
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <TransButton onClick={closeHandler} color='inherit'>
                        {t('cancel')}
                    </TransButton>
                    <TransButton type='submit'>
                        {!!item ? t('update') : t('create')}
                    </TransButton>
                </Box>
            </Box>
        </BlurDialog>
    );
};
