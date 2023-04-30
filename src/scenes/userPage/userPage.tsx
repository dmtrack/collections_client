import {
    Box,
    useTheme,
    Button,
    useMediaQuery,
    Tab,
    Tabs,
    Typography,
    Tooltip,
    Zoom,
    Fade,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { shades } from '../../theme';
import { IUser } from '../../models/IUser';
import getOneUser from '../../utils/getOneUser';
import { FastRewindSharp } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { fetchUserCollections } from '../../state/actions/collections.actions';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import CollectionCard from '../collection/CollectionCard';

const UserPage = () => {
    const { t } = useTranslation(['user_page']);
    const dispatch = useAppDispatch();
    const { userId } = useParams();
    const [value, setValue] = useState('collections');

    const navigate = useNavigate();
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const [user, setUser] = useState<IUser>();
    const { userCollections } = useAppSelector((state) => state.collections);
    const goBack = () => navigate(-1);
    const goHome = () => navigate('/');

    useEffect(() => {
        getOneUser(Number(userId), setUser);
        dispatch(fetchUserCollections(Number(userId)));
    }, [userId]);

    const handleChange = (e: any, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Box width='80%' m='80px auto'>
                <Box justifyContent='start' display='flex' gap='16px' mb='32px'>
                    <IconButton
                        sx={{ color: `${shades.secondary[800]}` }}
                        onClick={goBack}>
                        <Tooltip TransitionComponent={Zoom} title='Go back'>
                            <FastRewindSharp />
                        </Tooltip>
                    </IconButton>{' '}
                    <IconButton
                        sx={{ color: `${shades.secondary[800]}` }}
                        onClick={goHome}>
                        <Tooltip TransitionComponent={Zoom} title='Home'>
                            <HomeSharpIcon />
                        </Tooltip>
                    </IconButton>{' '}
                    <Tooltip TransitionComponent={Zoom} title='Edit user'>
                        <Link to={`/user/${userId}/edit`}>
                            {' '}
                            <IconButton
                                sx={{ color: `${shades.secondary[800]}` }}
                                onClick={goBack}>
                                <ModeIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </Box>
                <Box display='flex' flexWrap='wrap' columnGap='16px'>
                    {/* IMAGES */}
                    <Box flex='1 1 40%' mb='48px' borderRadius='15px'>
                        <img
                            alt={user?.name}
                            src={user?.avatarUrl}
                            style={{
                                objectFit: 'contain',
                                borderRadius: '5px',
                            }}
                            width='200px'
                            height='200px'
                        />
                    </Box>

                    {/* ACTIONS */}
                    <Box flex='5 1 50%' mb='32px'>
                        <Box m='0px 0 24px 0'>
                            <Typography variant='h3'>{user?.name}</Typography>
                            <Typography>${user?.email}</Typography>
                        </Box>
                    </Box>
                </Box>

                {/* INFORMATION */}
                <Box m='20px 0'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                        TabIndicatorProps={{
                            sx: { display: isNonMobile ? 'block' : 'none' },
                        }}
                        sx={{
                            m: '15px',
                            '& .MuiTabs-flexContainer': { flexWrap: 'wrap' },
                        }}>
                        <Tab label='MY COLLECTIONS' value='collections' />
                        <Tab label='STATS' value='stats' />
                    </Tabs>
                </Box>
                <Box display='flex' flexWrap='wrap' gap='16px'>
                    {value === 'description' && <div>description</div>}
                    {value === 'reviews' && <div>reviews</div>}
                </Box>

                {/* RELATED ITEMS */}
                {value === 'collections' && (
                    <Box mt='48px' width='100%'>
                        {/* <Typography
                            variant='h4'
                            textAlign='left'
                            color={shades.secondary[800]}
                            sx={{
                                letterSpacing: '-0.5px',
                                fontWeight: '600',
                                paddingLeft: isNonMobile ? '0px' : '64px',
                            }}>
                            My collections
                        </Typography> */}
                        <Box
                            margin='0 auto'
                            display='grid'
                            gridTemplateColumns='repeat(auto-fill, 300px)'
                            justifyContent='space-around'
                            rowGap='16px'
                            columnGap='1.33%'>
                            {userCollections
                                .slice(0, 4)
                                .map((collection, i) => (
                                    <CollectionCard
                                        key={`${collection.name}-${i}`}
                                        collection={collection}
                                    />
                                ))}
                        </Box>
                    </Box>
                )}

                {value === 'stats' && (
                    <Box mt='48px' width='100%' height='calc(100vh - 755px)'>
                        Stats
                    </Box>
                )}
            </Box>
        </>
    );
};

export default UserPage;
