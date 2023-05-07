import {
    Box,
    TextField,
    MenuItem,
    Typography,
    useMediaQuery,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hook/redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import Loader from '../../utils/loader';
import { useTranslation } from 'react-i18next';
import { shades } from '../../theme';
import { MarkdownFormControl } from '../../components/Markdown/MarkdownFormControl';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';

const CreateCollection = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'collections' });

    const navigate = useNavigate();
    const { isAuth } = useAppSelector((state) => state.auth);
    const { collectionsLoading } = useAppSelector((state) => state.collections);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    type Inputs = {
        name: string;
        description: string;
        themeId: string;
        image: FileList;
    };

    useEffect(() => {
        if (!isAuth) navigate('/');
    }, [isAuth, navigate]);
    const themes = useAppSelector((state) => state.collections.themes);

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    // const onSubmit: SubmitHandler<Inputs> = (data) => {
    //     const itemConfigs = configInputs.filter(
    //         (config) => config.type && config.label
    //     );
    //     if (data.image[0]?.size > MAX_IMAGE_SIZE)
    //         return snackbar('The maximum photo size is 10MB');
    //     if (editable) {
    //         const removedConfigs = editable.itemConfigs.filter((config) => {
    //             return !configInputs.find(
    //                 (newConfig) => newConfig.id === config.id
    //             );
    //         });
    //         // const sendData: EditCollectionPayload = {
    //         //     ...editable.collection,
    //         //     ...data,
    //         //     image: data.image[0],
    //         //     itemConfigs,
    //         //     removedConfigs,
    //         // };
    //         // if (editable.collection.imageUrl && !data.existingImage) {
    //         //     sendData.deletedImage = editable.collection.imageUrl;
    //         // }
    //         // dispatch(editCollection(sendData, navigate));
    //         // } else {
    //         // dispatch(
    //         //     createCollection(
    //         //         { ...data, image: data.image[0], itemConfigs, userId },
    //         //         navigate
    //         //     )
    //         // );
    //     }
    // };

    return (
        <Box
            width='80%'
            m='0px auto 80px auto'
            className='create-collection'
            alignItems={isNonMobile ? 'start' : 'center'}>
            <Box
                component='form'
                display='flex'
                flexDirection='column'
                px={1}
                mt='32px'
                onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    select
                    label={t('theme')}
                    defaultValue={''}
                    margin='normal'
                    {...register('themeId', { required: true })}
                    error={!!errors.themeId}>
                    {themes.map((theme) => (
                        <MenuItem key={theme.id} value={theme.id}>
                            {theme.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label={t('title')}
                    margin='normal'
                    {...register('name', { required: true })}
                    error={!!errors.name}
                />
                {/* <Text variant='h6'>
                    If you want, add a picture of the collection
                </Text>
                <Box mx='auto'>
                    <ImageDrop
                        imageFile={imageFile}
                        inputProps={{ ...register('image') }}
                        clearFile={clearImage}
                        existingImageUrl={getValues().existingImage}
                    />
                </Box> */}
                <Box mb={2}>
                    <MarkdownFormControl
                        control={control}
                        controlName='description'
                        label=''
                    />
                </Box>
                <DragAndDrop />
                {collectionsLoading ? (
                    <Loader />
                ) : (
                    <Stack spacing={2} direction='row'>
                        <Button
                            color='primary'
                            variant='contained'
                            onClick={() => console.log('confirm')}
                            type='submit'
                            sx={{
                                backgroundColor: `${shades.secondary[800]}`,
                            }}>
                            {t('create')}
                        </Button>{' '}
                        <Button
                            color='primary'
                            variant='contained'
                            onClick={() => console.log('cancel')}
                            sx={{
                                backgroundColor: `${shades.secondary[800]}`,
                            }}>
                            {t('cancel')}
                        </Button>{' '}
                    </Stack>
                )}
            </Box>
        </Box>
    );
};

export default CreateCollection;
