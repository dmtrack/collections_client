import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { logOut } from '../state/actions/auth.actions';

const LogOut = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isAuth) {
            console.log('logout');
            dispatch(logOut());
            navigate('/');
        }
    }, [isAuth]);
    return (
        <h1 className='text-sm text-left text-gray-500 dark:text-gray-400 mx-auto max-w-[300px]'>
            you are got logout
        </h1>
    );
};

export default LogOut;
