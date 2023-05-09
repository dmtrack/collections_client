import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UsersList } from '../../components/Userslist';
import { useAppDispatch, useAppSelector } from '../../hook/redux';

import { fetchUsers } from '../../state/actions/userActions';
import Loader from '../../components/Loader/Loader';
import { Box, Grow } from '@mui/material';

export function AdminPanel() {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const { users, usersLoading, error } = useAppSelector(
        (state) => state.users
    );

    const { isAuth } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
        dispatch(fetchUsers());
    }, [isAuth]);

    return (
        <>
            {usersLoading && <Loader />}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '128px',
                    // width: isNonMobile ? '80%' : '100%',
                    width: '80%',
                    // height: 'calc(100vh - 405px)',
                }}>
                <UsersList usersProps={users} />
            </Box>
        </>
    );
}
