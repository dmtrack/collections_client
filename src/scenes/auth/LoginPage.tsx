import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useInput } from '../../hook/input';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { login } from '../../state/actions/auth.actions';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Box, TextField } from '@mui/material';
import { shades } from '../../theme';

const LoginPage: FC = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });
    const { error } = useAppSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const email = useInput('');
    const password = useInput('');
    const dispatch = useAppDispatch();

    const { isAuth } = useAppSelector((state) => state.auth);
    const isFormValid = () => email.value && password.value;
    if (isAuth) navigate('/');

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (isFormValid()) {
            try {
                dispatch(
                    login({
                        email: email.value,
                        password: password.value,
                    })
                );
            } catch (e: any) {
                toast(e);
            }
        } else toast('Please, fill up all fields');
    };

    return (
        <>
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
                    onSubmit={submitHandler}>
                    <TextField
                        label={t('email')}
                        margin='normal'
                        type='text'
                        {...email}
                        id='email'
                    />{' '}
                    <TextField
                        label={t('password')}
                        margin='normal'
                        type='text'
                        {...password}
                        id='password'
                    />
                    {error && (
                        <p
                            className='pt-5
             text-sm text-left text-red-500 dark:text-red-400 mx-auto'>
                            {error}
                        </p>
                    )}
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={() => submitHandler}
                        type='submit'
                        sx={{
                            mt: '12px',
                            backgroundColor: `${shades.secondary[800]}`,
                        }}>
                        {t('submitButton')}
                    </Button>{' '}
                </Box>
            </Box>
        </>
    );
};

export { LoginPage };
