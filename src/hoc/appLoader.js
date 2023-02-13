// import React, { ReactElement, useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../hook/redux';

// import localStorageService from '../services/localStorageService';
// import { reconnect } from '../store/actions/auth.actions';
// import Loader from '../utils/loader';

// const AppLoader = ({ children }: any) => {
//     const { isAuth } = useAppSelector((state) => state.auth);
//     const { usersLoading } = useAppSelector((state) => state.users);
//     const userId = Number(localStorageService.getUserId());
//     const dispatch = useAppDispatch();

//     useEffect(() => {
//         if (!isAuth) dispatch(reconnect(userId));
//     }, [isAuth]);
//     if (usersLoading) return <Loader />;
//     return children;
// };

// export default AppLoader;
