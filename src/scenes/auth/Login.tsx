import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RegistrationPage } from './RegistrationPage';
import { LoginPage } from './LoginPage';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

const Login = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });

    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === 'register' ? type : 'login'
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === 'register' ? 'login' : 'register'
        );
    };

    return (
        <Box>
            {formType === 'register' ? (
                <>
                    <RegistrationPage />
                    <p className='text-sm text-center text-gray-500 dark:text-gray-400 mx-auto'>
                        {t('haveAccount')}
                        <a
                            role='button'
                            onClick={toggleFormType}
                            className='text-sm text-left text-gray-500 dark:text-gray-400 mx-auto max-w-[300px]'>
                            {' '}
                            {t('loginlink')}
                        </a>
                    </p>
                </>
            ) : (
                <>
                    <LoginPage />
                    <p className='text-sm text-center text-gray-500 dark:text-gray-400 mx-auto'>
                        {t('dontHaveAccount')}
                        <a
                            role='button'
                            onClick={toggleFormType}
                            className='text-sm text-left text-gray-500 dark:text-gray-400 mx-auto'>
                            {' '}
                            {t('registrationlink')}
                        </a>
                    </p>
                </>
            )}
        </Box>
    );
};

export default Login;
