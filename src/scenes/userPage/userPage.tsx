import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/authService';
import { IUser } from '../../models/IUser';
import getOneUser from '../../utils/getOneUser';
import IconButton from '@mui/material/IconButton';
import { FastRewindSharp } from '@mui/icons-material';
import ModeIcon from '@mui/icons-material/Mode';
import { Box, useMediaQuery } from '@mui/material';

const UserPage = () => {
    const { t } = useTranslation(['user_page']);
    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate();
    const { userId } = useParams();
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const goBack = () => navigate(-1);

    useEffect(() => {
        getOneUser(Number(userId), setUser);
    }, []);

    return (
        <>
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
                <Box>
                    <IconButton sx={{ color: 'black' }} onClick={goBack}>
                        <FastRewindSharp />
                    </IconButton>{' '}
                    <Link to={`/user/${userId}/edit`}>
                        {' '}
                        <IconButton sx={{ color: 'black' }} onClick={goBack}>
                            <ModeIcon />
                        </IconButton>
                    </Link>
                </Box>

                <Box sx={{ marginTop: '24px' }}>
                    <div>User with id:{userId}</div>
                    <div>Name: {user?.name}</div>
                    <div>Email: {user?.email}</div>
                </Box>
            </Box>
        </>
    );
};

export default UserPage;
