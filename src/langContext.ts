import React from 'react';
export const langs = {
    ru: {
        buttonsubmit: 'отправить',
        language: 'ru',
        username: 'имя пользователя',
        email: 'электронная почта',
        password: 'пароль',
        haveAccount: 'У вас уже есть аккаунт?',
        dontHaveAccount: 'Нет аккаунта?',
        login: 'Вход',
        registration: 'Регистрация',
    },
    en: {
        buttonsubmit: 'submit',
        language: 'en',
        username: 'username',
        email: 'email',
        password: 'password',
        haveAccount: 'Already have account?',
        dontHaveAccount: `Don't have account?`,
        login: 'Login',
        registration: 'Registration',
    },
};

const LangContext = React.createContext(langs.ru);
export default LangContext;
