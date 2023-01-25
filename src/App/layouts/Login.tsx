import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthPage } from './AuthPage';
import { LoginPage } from './LoginPage';

const Login = () => {
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
                    <AuthPage />
                    <p className="container text-sm text-center text-gray-500 dark:text-gray-400 mx-auto">
                        Already have account?{' '}
                        <a
                            role="button"
                            onClick={toggleFormType}
                            className="text-sm text-left text-gray-500 dark:text-gray-400 mx-auto max-w-[300px]"
                        >
                            {' '}
                            Sign In
                        </a>
                    </p>
                </>
            ) : (
                <>
                    <LoginPage />
                    <p className="container text-sm text-center text-gray-500 dark:text-gray-400 mx-auto">
                        Don't have account?
                        <a
                            role="button"
                            onClick={toggleFormType}
                            className="text-sm text-left text-gray-500 dark:text-gray-400 mx-auto"
                        >
                            {' '}
                            Sign Up
                        </a>
                    </p>
                </>
            )}
        </div>
    );
};

export default Login;
