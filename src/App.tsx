import React, { Suspense, useEffect, useState } from 'react';
import './i18n';
import {
    Routes,
    Route,
    BrowserRouter as Router,
    useLocation,
} from 'react-router-dom';
import LogOut from './components/LogOut';
import { AdminPanel } from './scenes/adminPanel/AdminPanel';
import Login from './scenes/auth/Login';
import { useAppDispatch, useAppSelector } from './hook/redux';
import { reconnect } from './state/actions/auth.actions';
import localStorageService from './services/localStorageService';
import { useTranslation } from 'react-i18next';
import Home from './scenes/home/Home';
import { Navigation } from './scenes/global/Navigation';
import Collection from './scenes/collection/collectionPage';
import UserPage from './scenes/userPage/userPage';
import Navbar from './scenes/global/Navbar';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

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
        <div className="app">
            <Suspense fallback={null}>
                <Router>
                    <ScrollToTop />
                    {/* <Navigation /> */}
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="collection/:collectionId"
                            element={<Collection />}
                        />
                        <Route path="user/:userId" element={<UserPage />} />
                        <Route path="login/:type?" element={<Login />} />
                        <Route path="admin" element={<AdminPanel />} />
                        <Route path="logout" element={<LogOut />} />
                    </Routes>
                </Router>
            </Suspense>
        </div>
    );
};

export default App;
