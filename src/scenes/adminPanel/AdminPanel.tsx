import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersList } from '../../components/Userslist';
import { useAppDispatch, useAppSelector } from '../../hook/redux';

import { fetchUsers } from '../../state/actions/userActions';
import Loader from '../../utils/loader';
import { Box } from '@mui/material';

export function AdminPanel() {
    const dispatch = useAppDispatch();
    const { users, usersLoading, error } = useAppSelector(
        (state) => state.users
    );

    const { isAuth } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchUsers());
        }
    }, []);

    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
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
                }}>
                <UsersList usersProps={users} />
            </Box>
        </>
    );
}
