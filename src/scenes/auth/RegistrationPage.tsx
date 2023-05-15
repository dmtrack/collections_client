import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useInput } from '../../hook/input';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { register } from '../../state/actions/auth.actions';
import { Box, TextField, useTheme } from '@mui/material';
import { shades } from '../../theme';

const RegistrationPage: React.FC = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });

    const { error } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const username = useInput('');
    const email = useInput('');
    const password = useInput('');
    const avatar = '';
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const colors = shades(theme.palette.mode);

    const isFormValid = () => username.value && email.value && password.value;
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (isFormValid()) {
            dispatch(
                register({
                    name: username.value,
                    email: email.value,
                    password: password.value,
                    avatarUrl: avatar,
                })
            )
                .then(() => navigate('/'))
                .catch((e) => console.log(e));
        } else console.error('Please, fill up all fields');
    };

    return (
        <>
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
                            label={t('username')}
                            margin='normal'
                            type='text'
                            {...username}
                            id='email'
                        />{' '}
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
                        {error && <Box color='red'>{error}</Box>}
                        <Button
                            color='primary'
                            variant='contained'
                            onClick={() => submitHandler}
                            type='submit'
                            sx={{
                                mt: '12px',
                                backgroundColor: `${colors.secondary[800]}`,
                            }}>
                            {t('submitButton')}
                        </Button>{' '}
                    </Box>
                </Box>
            </>
        </>
    );
};

export { RegistrationPage };
