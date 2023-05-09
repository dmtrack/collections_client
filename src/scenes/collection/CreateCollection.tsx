import { Box, TextField, MenuItem, useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hook/redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import Loader from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { shades } from '../../theme';
import { MarkdownFormControl } from '../../components/Markdown/MarkdownFormControl';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import { fileTypes } from '../../utils/constants';
import { ICollection, ICollectionFormValues } from '../../models/ICollection';
import { SelectOption } from '../../models/global';
import CustomFieldForm from '../../components/CustomFieldForm';

const CreateCollection = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'collections' });

    const navigate = useNavigate();
    const { isAuth } = useAppSelector((state) => state.auth);
    const { collectionsLoading } = useAppSelector((state) => state.collections);
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const { collectionId } = useParams();
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (!isAuth) navigate('/');
    }, [isAuth, navigate]);
    const themes = useAppSelector((state) => state.collections.themes);
    const collectionThemes = themes.map((theme) => theme.name);
    useEffect(() => {
        setFocus('title');
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
        (value) => ({
            value,
            label: `${t(value)}`,
        })
    );

    const {
        register,
        handleSubmit,
        watch,
        control,
        setFocus,
        clearErrors,
        setValue,
        formState: { errors },
    } = useForm<ICollectionFormValues>();

    const onSubmit: SubmitHandler<ICollectionFormValues> = (data) =>
        console.log(data);

    const handleChange = (file: File) => {
        setFile(file);
        console.log(file);
    };
    const [description, setDescription] = useState(
        defaultFormValues.description
    );

    useEffect(() => {
        setValue('description', description);
    }, [description]);

    return (
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
                        {...register('theme', { required: true })}
                        error={!!errors.theme}
                        sx={{ mb: '0px' }}>
                        {themes.map((theme) => (
                            <MenuItem key={theme.id} value={theme.id}>
                                {theme.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label={t('title')}
                        margin='normal'
                        {...register('title', { required: true })}
                        error={!!errors.title}
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
                            chooseFile={handleChange}
                            fileTypes={fileTypes}
                            hoverTitle={t('Drop here')}
                            name='test name'
                            isDisabled={false}
                        />
                    </Box>
                </Box>
                {/* <Box>
                    <CustomFieldForm />
                </Box> */}
            </Box>
            {collectionsLoading ? (
                <Loader />
            ) : (
                <Box alignSelf='start' marginLeft='8px' marginTop='24px'>
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
                </Box>
            )}
        </Box>
    );
};

export default CreateCollection;
