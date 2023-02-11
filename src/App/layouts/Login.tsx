import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RegistrationPage } from './RegistrationPage';
import { LoginPage } from './LoginPage';

import LangContext from '../../langContext';
import React from 'react';

const Login = () => {
    const language = React.useContext(LangContext);
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
                    <p className="container text-sm text-center text-gray-500 dark:text-gray-400 mx-auto">
                        {language.haveAccount}
                        <a
                            role="button"
                            onClick={toggleFormType}
                            className="text-sm text-left text-gray-500 dark:text-gray-400 mx-auto max-w-[300px]"
                        >
                            {' '}
                            {language.login}
                        </a>
                    </p>
                </>
            ) : (
                <>
                    <LoginPage />
                    <p className="container text-sm text-center text-gray-500 dark:text-gray-400 mx-auto">
                        {language.dontHaveAccount}
                        <a
                            role="button"
                            onClick={toggleFormType}
                            className="text-sm text-left text-gray-500 dark:text-gray-400 mx-auto"
                        >
                            {' '}
                            {language.registration}
                        </a>
                    </p>
                </>
            )}
        </div>
    );
};

export default Login;
