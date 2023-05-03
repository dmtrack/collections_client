import {
    Box,
    useMediaQuery,
    Tab,
    Tabs,
    Typography,
    Tooltip,
    Zoom,
    Fab,
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
import AddIcon from '@mui/icons-material/Add';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import EditIcon from '@mui/icons-material/Edit';
import CollectionCard from '../collection/CollectionCard';
import EmptyContainer from './EmptyContainer';

const UserProfile = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'profilePage' });

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
        // dispatch(setCollectionsEmpty);
        dispatch(fetchUserCollections(Number(userId)));
    }, [userId]);

    const handleChange = (e: any, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Box width='80%' m='120px auto 80px auto' className='user-profile'>
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

                        <Box justifyContent='center' display='flex' gap='12px'>
                            <Tooltip title='Add collection'>
                                <Link to={`/collection/create`}>
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
                                <Link to={`/user/${userId}/edit`}>
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
                    </Box>

                    {/* ACTIONS */}
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
                            <Typography>{user?.email}</Typography>
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
                            <Box
                                mt={isNonMobile ? '32px' : '16px'}
                                width='100%'>
                                <Box
                                    margin='0 auto'
                                    display='grid'
                                    gridTemplateColumns='repeat(auto-fill, 300px)'
                                    justifyContent='space-around'
                                    rowGap='32px'
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
                        ) : (
                            <EmptyContainer
                                title={t('collections.empty')}
                                text={t('collections.emptyAndLoggedIn')}
                            />
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
