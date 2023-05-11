import {
    Box,
    useMediaQuery,
    Tab,
    Tabs,
    Typography,
    Tooltip,
    Fab,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { shades } from '../../theme';
import { IUser } from '../../models/IUser';
import getOneUser from '../../utils/getOneUser';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { fetchUserCollections } from '../../state/actions/collections.actions';
import AddIcon from '@mui/icons-material/Add';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import EditIcon from '@mui/icons-material/Edit';
import EmptyContainer from '../../components/Common/EmptyContainer/EmptyContainer';
import Loader from '../../components/Loader/Loader';
import CollectionCardsContainer from '../../components/Collection/CollectionCardContainer/CollectionCardContainer';

const UserProfile = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'profilePage' });

    const dispatch = useAppDispatch();
    const { userId } = useParams();
    const [value, setValue] = useState('collections');
    const { auth: currentUser } = useAppSelector((state) => state);
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const [user, setUser] = useState<IUser>();
    const { userCollections } = useAppSelector((state) => state.collections);

    const goHome = () => navigate('/');

    const hasFullAccess =
        Number(userId) === Number(currentUser.userId) ||
        currentUser.access.access === 'admin';
    useEffect(() => {
        getOneUser(Number(userId), setUser);
        // dispatch(setCollectionsEmpty);
        dispatch(fetchUserCollections(Number(userId)));
    }, [userId]);

    const { collectionsUserLoading } = useAppSelector(
        (state) => state.collections
    );
    const handleChange = (e: any, newValue: string) => {
        setValue(newValue);
    };

    const isLoading = collectionsUserLoading;
    return (
        <>
            {isLoading && <Loader />}
            <Box width='80%' m='36px auto 80px auto' className='user-profile'>
                <Box display='flex' columnGap='16px'>
                    {/* IMAGES */}
                    <Box>
                        <Box flex='1 1 30%' mb='24px' borderRadius='15px'>
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
                        {hasFullAccess && (
                            <Box
                                justifyContent='center'
                                display='flex'
                                gap='12px'>
                                <Tooltip title='Add collection'>
                                    <Link to={`/users/${userId}/create`}>
                                        {isNonMobile ? (
                                            <Fab size='small' color='primary'>
                                                <AddIcon />
                                            </Fab>
                                        ) : (
                                            <AddIcon fontSize='large' />
                                        )}
                                    </Link>
                                </Tooltip>

                                <Tooltip title='Home'>
                                    {isNonMobile ? (
                                        <Fab size='small' color='primary'>
                                            <HomeSharpIcon onClick={goHome} />
                                        </Fab>
                                    ) : (
                                        <HomeSharpIcon
                                            fontSize='large'
                                            onClick={goHome}
                                        />
                                    )}
                                </Tooltip>

                                <Tooltip title='Edit user'>
                                    <Link to={`/users/${userId}/edit`}>
                                        {' '}
                                        {isNonMobile ? (
                                            <Fab size='small' color='primary'>
                                                <EditIcon />
                                            </Fab>
                                        ) : (
                                            <EditIcon fontSize='large' />
                                        )}
                                    </Link>
                                </Tooltip>
                            </Box>
                        )}
                    </Box>

                    <Box flex='5 1 60%' mb='16px'>
                        <Box m='0px 0 24px 0'>
                            <Typography
                                variant='h4'
                                textAlign='left'
                                color={shades.secondary[800]}
                                sx={{
                                    letterSpacing: '-0.5px',
                                    fontWeight: '600',
                                }}>
                                {user?.name}
                            </Typography>
                            <Typography mt='16px'>
                                {t('email')}: {user?.email}
                            </Typography>{' '}
                            <Typography mt='4px'>
                                {t('status')}:{' '}
                                {user?.blocked ? t('blocked') : t('active')}
                            </Typography>{' '}
                            {/* <Typography mt='16px'>
                                {t('access')}: {user?.access.access}
                            </Typography> */}
                        </Box>
                    </Box>
                </Box>
                <Box>
                    {/* INFORMATION */}
                    <Box marginTop={isNonMobile ? '32px' : '64px'}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            centered
                            TabIndicatorProps={{
                                sx: { display: isNonMobile ? 'block' : 'none' },
                            }}
                            sx={{
                                m: '0px',
                                '& .MuiTabs-flexContainer': {
                                    flexWrap: 'wrap',
                                },
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
                    {value === 'collections' &&
                        (userCollections && userCollections.length > 0 ? (
                            <CollectionCardsContainer
                                collections={userCollections}
                            />
                        ) : (
                            <>
                                {' '}
                                <EmptyContainer
                                    title={t('empty')}
                                    text={t('emptyAndLoggedIn')}
                                />
                            </>
                        ))}

                    {value === 'stats' && (
                        <Box
                            mt={isNonMobile ? '32px' : '16px'}
                            width='100%'
                            height='100%'>
                            Stats
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default UserProfile;
