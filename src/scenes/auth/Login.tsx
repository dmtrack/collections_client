import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RegistrationPage } from './RegistrationPage';
import { LoginPage } from './LoginPage';

import React from 'react';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t, i18n } = useTranslation(['common', 'auth']);

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
        <div>
            {formType === 'register' ? (
                <>
                    <RegistrationPage />
                    <p className='text-sm text-center text-gray-500 dark:text-gray-400 mx-auto'>
                        {t('auth:haveAccount')}
                        <a
                            role='button'
                            onClick={toggleFormType}
                            className='text-sm text-left text-gray-500 dark:text-gray-400 mx-auto max-w-[300px]'>
                            {' '}
                            {t('auth:loginlink')}
                        </a>
                    </p>
                </>
            ) : (
                <>
                    <LoginPage />
                    <p className='text-sm text-center text-gray-500 dark:text-gray-400 mx-auto'>
                        {t('auth:dontHaveAccount')}
                        <a
                            role='button'
                            onClick={toggleFormType}
                            className='text-sm text-left text-gray-500 dark:text-gray-400 mx-auto'>
                            {' '}
                            {t('auth:registrationlink')}
                        </a>
                    </p>
                </>
            )}
        </div>
    );
};

export default Login;
