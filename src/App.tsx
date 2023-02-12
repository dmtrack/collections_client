import React, { Suspense, useEffect, useState } from 'react';
import './i18n';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LogOut from './App/components/LogOut';
import { AdminPanel } from './App/layouts/AdminPanel';
import Login from './App/layouts/Login';
import { useAppDispatch, useAppSelector } from './App/hook/redux';
import { reconnect } from './App/store/actions/auth.actions';
import localStorageService from './App/services/localStorageService';
import { useTranslation } from 'react-i18next';
import Home from './App/layouts/Home';
import { Navigation } from './App/components/Navigation';

const App: React.FC = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    const dispatch = useAppDispatch();
    const userId = Number(localStorageService.getUserId());
    const { isAuth } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isAuth && userId) dispatch(reconnect(userId));
    }, [isAuth]);

    return (
        <>
            <Suspense fallback={null}>
                <Router>
                    <Navigation />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login/:type?" element={<Login />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/logout" element={<LogOut />} />
                    </Routes>
                </Router>
            </Suspense>
        </>
    );
};

export default App;
