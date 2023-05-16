import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useInput } from '../../hook/input';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { registerUser } from '../../state/actions/auth.actions';
import { Box, TextField, useTheme } from '@mui/material';
import { shades } from '../../theme';
import { IRegistrationFormValues } from '../../models/ICollection';
import { MAX_IMAGE_SIZE, fileTypes } from '../../utils/constants';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import Loader from '../../components/Loader/Loader';

const RegistrationPage: React.FC = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });

    const { error } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    const [image, setImage] = useState<File | null>(null);
    const { loading } = useAppSelector((state) => state.app);
    useEffect(() => {
        if (image) {
            setValue('image', image);
        }
    }, [image]);

    useEffect(() => {
        setFocus('name');
    }, []);

    const handleSetImage = (image: File) => {
        setImage(image);
    };

    const {
        register,
        handleSubmit,
        control,
        setFocus,
        setValue,
        formState: { errors },
    } = useForm<IRegistrationFormValues>();

    const onSubmit: SubmitHandler<IRegistrationFormValues> = (data) => {
        if (image && image?.size > MAX_IMAGE_SIZE)
            return toast('The maximum image size is 10MB');

        dispatch(
            registerUser(
                {
                    name: data.name,
                    email: data.email,
                    password: String(data.password),
                    image: data.image,
                },
                navigate
            )
        );
    };

    return (
        <>
            {loading && <Loader />}

            <Box
                width='80%'
                height='100%'
                m='128px auto 80px auto'
                className='login'>
                <Box
                    component='form'
                    display='flex'
                    flexDirection='column'
                    px={1}
                    mt='32px'
                    onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label={t('username')}
                        margin='normal'
                        type='text'
                        {...register('name', { required: true })}
                        id='email'
                        error={!!errors.name}
                    />{' '}
                    <TextField
                        label={t('email')}
                        margin='normal'
                        type='text'
                        {...register('email', { required: true })}
                        id='email'
                        error={!!errors.name}
                    />{' '}
                    <TextField
                        label={t('password')}
                        margin='normal'
                        type='text'
                        {...register('password', { required: true })}
                        id='password'
                        error={!!errors.name}
                    />
                    <Box mt='12px'>
                        <DragAndDrop
                            chooseFile={(file: File) => handleSetImage(file)}
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
                    {error && <Box color='red'>{error}</Box>}
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                        sx={{
                            marginTop: '12px',
                            backgroundColor: `${colors.secondary[800]}`,
                            color:
                                theme.palette.mode === 'light'
                                    ? `${colors.primary[100]}`
                                    : `${colors.primary[400]}`,
                        }}>
                        {t('submitButton')}
                    </Button>{' '}
                </Box>
            </Box>
        </>
    );
};

export { RegistrationPage };
