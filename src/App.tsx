import React, { Suspense, useEffect } from 'react';
import '../src/languages/i18n';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hook/redux';
import { reconnect } from './state/actions/auth.actions';
import localStorageService from './services/localStorageService';
import { useTranslation } from 'react-i18next';
import Home from './scenes/home/Home';
import ItemPage from './scenes/itemDetailsPage/Itempage';
import NotfoundPage from './components/NotfoundPage';
import UserEdit from './scenes/userPage/UserEdit';
import CreateCollection from './scenes/collection/CreateCollection';
import EditCollection from './scenes/collection/EditCollection';
import { ToastContainer } from 'react-toastify';
import Navbar from './scenes/global/Navbar';
import Footer from './scenes/global/Footer';
import { AdminPanel } from './scenes/adminPanel/AdminPanel';
import Login from './scenes/auth/Login';
import LogOut from './components/LogOut';
import 'react-toastify/dist/ReactToastify.css';
import {
    fetchCollections,
    fetchTopAmountCollections,
} from './state/actions/collections.actions';
import UserProfile from './scenes/userPage/UserProfile';
import Collection from './scenes/collection/Collection';

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

    useEffect(() => {
        dispatch(fetchCollections());
        dispatch(fetchTopAmountCollections());
    }, []);

    return (
        <div className='app'>
            <BrowserRouter>
                <Suspense fallback={null}>
                    <Navbar />
                    <ScrollToTop />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route
                            path='collection/:collectionId'
                            element={<Collection />}
                        />
                        <Route path='item/:itemId/' element={<ItemPage />} />
                        <Route path='user/:userId' element={<UserProfile />} />
                        <Route
                            path='user/:userId/edit'
                            element={<UserEdit />}
                        />
                        <Route
                            path='collection/create'
                            element={<CreateCollection />}
                        />{' '}
                        <Route
                            path='collection/:collectionId/edit'
                            element={<EditCollection />}
                        />
                        <Route path='login/:type?' element={<Login />} />
                        <Route path='admin' element={<AdminPanel />} />
                        <Route path='logout' element={<LogOut />} />
                        <Route path='*' element={<NotfoundPage />} />
                    </Routes>
                    <ToastContainer
                        position='bottom-right'
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='dark'
                    />
                    <Footer />
                </Suspense>
            </BrowserRouter>
        </div>
    );
};

export default App;
