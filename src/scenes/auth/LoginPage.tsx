import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import { useInput } from '../../hook/input';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { login } from '../../state/actions/auth.actions';
import { useTranslation } from 'react-i18next';

const LoginPage: FC = () => {
    const { t } = useTranslation(['auth', 'common']);
    const { error } = useAppSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const email = useInput('');
    const password = useInput('');
    const dispatch = useAppDispatch();

    const isFormValid = () => email.value && password.value;

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (isFormValid()) {
            dispatch(
                login({
                    email: email.value,
                    password: password.value,
                })
            )
                .then(() => navigate('/'))
                .catch((e) => console.error(e.message));
        } else console.error('Please, fill up all fields');
    };

    return (
        <form
            className="container pt-10 mt-40
             text-sm text-left text-gray-500 dark:text-gray-400 mx-auto max-w-[300px]"
            onSubmit={submitHandler}
        >
            <div className="">
                <label className="block" htmlFor="email">
                    {t('auth:email')}
                </label>
                <input
                    className="border py-1 px-2 w-full  text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    type="text"
                    {...email}
                    id="email"
                />
                <label className="block" htmlFor="password">
                    {t('auth:password')}
                </label>
                <input
                    className="border py-1 px-2 w-full  text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    type="password"
                    {...password}
                    id="password"
                />
                {error && (
                    <p
                        className="pt-5
             text-sm text-left text-red-500 dark:text-red-400 mx-auto"
                    >
                        {error}
                    </p>
                )}

                <div className="py-4">
                    <Button
                        onClick={() => submitHandler}
                        variant="info"
                        size="sm"
                        type="submit"
                    >
                        {t('buttonsubmit')}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export { LoginPage };
