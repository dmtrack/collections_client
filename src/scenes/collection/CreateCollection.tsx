import { Box, TextField, MenuItem, useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import Loader from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { shades } from '../../theme';
import { MarkdownFormControl } from '../../components/Markdown/MarkdownFormControl';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import { MAX_IMAGE_SIZE, fileTypes } from '../../utils/constants';
import {
    ICollection,
    ICollectionFormValues,
    ITheme,
    SelectOption,
} from '../../models/ICollection';

import { toast } from 'react-toastify';
import { createCollection } from '../../state/actions/collections.actions';
import { ItemConfigType } from '../../state/models/ICollection.state';

const CreateCollection = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'collections' });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuth, userId } = useAppSelector((state) => state.auth);
    const { collectionsLoading, collectionIsBusy } = useAppSelector(
        (state) => state.collections
    );
    const isLoading = collectionIsBusy || collectionsLoading;
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const { collectionId } = useParams();
    const location = useLocation();
    const editing = location.pathname.includes('edit');
    const [image, setImage] = useState<File | null>(null);
    const [configInputs, setConfigInputs] = useState<ItemConfigType[]>([
        { type: '', label: '' },
    ]);

    useEffect(() => {
        if (image) {
            setValue('image', image);
        }
    }, [image]);

    useEffect(() => {
        if (!isAuth) navigate('/');
    }, [isAuth, navigate]);
    const themes = useAppSelector((state) => state.collections.themes);
    const collectionThemes = themes.map((theme) => theme.name);
    useEffect(() => {
        setFocus('name');
    }, []);

    const selectedCollection = useAppSelector((state) =>
        state.collections.collections.find((c) => c.id === Number(collectionId))
    );

    const defaultFormValues: ICollection = {
        id: selectedCollection?.id || 0,
        created: selectedCollection?.created || '',
        userId: selectedCollection?.userId || 0,
        themeId: selectedCollection?.themeId || 0,
        name: selectedCollection?.name || '',
        description: selectedCollection?.description || '',
        themeName: selectedCollection?.themeName || '',
        image: selectedCollection?.image || '',
    };

    const collectionThemeOptions: SelectOption[] = collectionThemes.map(
        (value: string) => ({
            value,
            label: `${t(value)}`,
        })
    );

    const {
        register,
        handleSubmit,
        control,
        setFocus,
        setValue,
        formState: { errors },
    } = useForm<ICollectionFormValues>();

    useEffect(() => {
        if (!isAuth) navigate('/');
    }, [isAuth, navigate]);

    const handleSetImage = (image: File) => {
        setImage(image);
    };

    const onSubmit: SubmitHandler<ICollectionFormValues> = (data) => {
        if (image && image?.size > MAX_IMAGE_SIZE)
            return toast('The maximum image size is 10MB');
        if (editing) {
            // const removedConfigs = editable.itemConfigs.filter((config) => {
            //     return !configInputs.find(
            //         (newConfig) => newConfig.id === config.id
            //     );
            // });
            // const sendData: EditCollectionPayload = {
            //     ...editable.collection,
            //     ...data,
            //     image: data.image[0],
            //     itemConfigs,
            //     removedConfigs,
            // };
            // if (editable.collection.imageUrl && !data.existingImage) {
            //     sendData.deletedImage = editable.collection.imageUrl;
            // }
            // dispatch(editCollection(sendData, navigate));
        } else {
            dispatch(createCollection({ ...data, userId }, navigate));
        }
    };

    const [description, setDescription] = useState(
        defaultFormValues.description
    );

    useEffect(() => {
        setValue('description', description);
    }, [description]);

    return (
        <>
            {isLoading && <Loader />}
            <Box
                width='80%'
                m='36px auto 80px auto'
                className='create-collection'
                alignItems={isNonMobile ? 'start' : 'center'}>
                <Box width='100%' display='flex' flexWrap='wrap' gap='48px'>
                    <Box
                        component='form'
                        display='flex'
                        flexDirection='column'
                        gap='12px'
                        px={1}
                        onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            select
                            label={t('theme')}
                            defaultValue={''}
                            margin='normal'
                            {...register('themeId', { required: true })}
                            error={!!errors.themeId}
                            sx={{ mb: '0px' }}>
                            {themes.map((theme: ITheme) => (
                                <MenuItem
                                    key={theme.id}
                                    value={Number(theme.id)}>
                                    {theme.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label={t('name')}
                            margin='normal'
                            {...register('name', { required: true })}
                            error={!!errors.name}
                        />

                        <Box mb='8px'>
                            <MarkdownFormControl
                                control={control}
                                controlName='description'
                                label=''
                            />
                        </Box>
                        <Box>
                            <DragAndDrop
                                chooseFile={(file: File) =>
                                    handleSetImage(file)
                                }
                                fileTypes={fileTypes}
                                isDisabled
                                hoverTitle={t('Drop here')}
                                name='image'
                                caption={
                                    image
                                        ? 'collections.file'
                                        : 'collections.noFile'
                                }
                            />
                        </Box>

                        {/* <Box>
                    <CustomFieldForm />
                </Box> */}

                        <Box alignSelf='start'>
                            <Stack spacing={2} direction='row'>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    type='submit'
                                    sx={{
                                        backgroundColor: `${shades.secondary[800]}`,
                                    }}>
                                    {t('create')}
                                </Button>{' '}
                                <Button
                                    color='primary'
                                    variant='contained'
                                    onClick={() => navigate(-1)}
                                    sx={{
                                        backgroundColor: `${shades.secondary[800]}`,
                                    }}>
                                    {t('cancel')}
                                </Button>{' '}
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default CreateCollection;
