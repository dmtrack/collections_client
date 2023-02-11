import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './App/components/Navigation';
import LogOut from './App/components/LogOut';
import { AdminPanel } from './App/layouts/AdminPanel';
import Login from './App/layouts/Login';
import { useAppDispatch, useAppSelector } from './App/hook/redux';
import { reconnect } from './App/store/actions/auth.actions';
import localStorageService from './App/services/localStorageService';
import LangContext, { langs } from './langContext';

const App: React.FC = () => {
    useEffect(() => {
        const selectedLang = localStorageService.getSelectedLanguage();
        const selectedLangObject =
            localStorageService.getSelectedLanguageObject();

        if (selectedLang && selectedLangObject) {
            setSelectedLanguage(selectedLang);
            setLang(JSON.parse(selectedLangObject));
        }
    }, []);
    const [lang, setLang] = useState(langs.ru);
    const [selectedLanguage, setSelectedLanguage] = useState('ru');

    const dispatch = useAppDispatch();
    const userId = Number(localStorageService.getUserId());
    const { isAuth } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isAuth && userId) dispatch(reconnect(userId));
    }, [isAuth]);

    const handleSwitchLanguage = () => {
        setSelectedLanguage(selectedLanguage === 'ru' ? 'en' : 'ru');
        lang === langs.ru ? setLang(langs.en) : setLang(langs.ru);

        localStorageService.setSelectedLanguage(
            selectedLanguage === 'ru' ? 'en' : 'ru'
        );
        localStorageService.setSelectedLanguageObject(
            lang === langs.ru ? langs.en : langs.ru
        );
    };
    return (
        <>
            <LangContext.Provider value={lang}>
                <Router>
                    <Navigation
                        switchLang={handleSwitchLanguage}
                        selectedLanguage={selectedLanguage}
                    />

                    <Routes>
                        <Route path="/login/:type?" element={<Login />} />
                        <Route path="/" element={<AdminPanel />} />
                        <Route path="/logout" element={<LogOut />} />
                    </Routes>
                </Router>
            </LangContext.Provider>
        </>
    );
};

export default App;
