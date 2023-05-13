import React, { Suspense, useEffect } from 'react';
import '../src/languages/i18n';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hook/redux';
import { logOut, reconnect } from './state/actions/auth.actions';
import localStorageService from './services/localStorageService';
import { useTranslation } from 'react-i18next';
import Home from './scenes/home/Home';
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
    fetchThemes,
    fetchTopAmountCollections,
} from './state/actions/collections.actions';
import UserProfile from './scenes/userPage/UserProfile';
import Collection from './scenes/collection/Collection';
import Breadcrumbs from './components/Breadcrumbs';
import { useApp } from './hook/appState';
import Loader from './components/Loader/Loader';
import ItemPageFile from './scenes/item/ItemPageFile';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App: React.FC = () => {
    const { i18n } = useTranslation();

    const { itemsLoading, topRatedItemsLoading } = useAppSelector(
        (state) => state.items
    );
    const { themesLoading, collectionsTopAmountLoading, topAmountCollections } =
        useAppSelector((state) => state.collections);

    const { isAuth, isBlocked } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    useEffect(() => {
        if (isBlocked) dispatch(logOut());
    }, [isBlocked, dispatch]);
    const lang = useApp().lang;

    const userId = Number(localStorageService.getUserId());

    useEffect(() => {
        dispatch(fetchCollections());
        dispatch(fetchTopAmountCollections());
        dispatch(fetchThemes());
        i18n.changeLanguage(lang);
    }, [dispatch, lang, i18n]);

    useEffect(() => {
        if (isAuth && userId && !isBlocked) {
            dispatch(reconnect(userId));
        }
    }, [isAuth, dispatch, isBlocked, userId]);

    useEffect(() => {
        if (userId === 0) dispatch(logOut());
    }, [userId, dispatch]);

    const isLoading =
        itemsLoading ||
        topRatedItemsLoading ||
        themesLoading ||
        collectionsTopAmountLoading;

    return (
        <div className='app'>
            {isLoading && <Loader />}

            <>
                <BrowserRouter>
                    <Suspense fallback={null}>
                        <Navbar />
                        <Breadcrumbs />
                        <ScrollToTop />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route
                                path='collections/:collectionId'
                                element={<Collection />}
                            />
                            <Route
                                path='items/:itemId/'
                                element={<ItemPageFile />}
                            />{' '}
                            {/* <Route
                                path='collections/:collectionId/create/'
                                element={<CreateItem />}
                            /> */}
                            <Route
                                path='users/:userId'
                                element={<UserProfile />}
                            />
                            <Route
                                path='users/:userId/edit'
                                element={<UserEdit />}
                            />
                            <Route
                                path='users/:userId/create'
                                element={<CreateCollection />}
                            />{' '}
                            <Route
                                path='collections/:collectionId/edit'
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
            </>
        </div>
    );
};

export default App;
