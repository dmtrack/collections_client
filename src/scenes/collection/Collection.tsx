import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { Box, useMediaQuery, Typography, Tooltip, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCollection } from '../../hook/useCollection';
import AddIcon from '@mui/icons-material/Add';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import EditIcon from '@mui/icons-material/Edit';
import EmptyContainer from '../../components/Common/EmptyContainer/EmptyContainer';
import { shades } from '../../theme';

import Loader from '../../components/Loader/Loader';
import CollectionItems from './CollectionItems';
import { ThemeChip } from '../../components/Common/ThemeChip';
import { IItem } from '../../models/IItem';

import { fetchItems } from '../../state/actions/items.actions';
import { EditItemDialog } from '../item/EditItemDialog';

const CollectionPage = () => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'collectionPage',
    });
    const navigate = useNavigate();
    const { collectionId } = useParams();

    const { itemsLoading } = useAppSelector((state) => state.items);
    const dispatch = useAppDispatch();
    const { collection, hasFullAccess } = useCollection(Number(collectionId));
    const isNonMobile = useMediaQuery('(min-width:600px)');
    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);
    const [editItemDialogOpen, setEditItemDialogOpen] = useState(false);

    const collectionItems: IItem[] = useAppSelector((state) =>
        state.items.items.filter(
            (i) => Number(i.collectionId) === Number(collectionId)
        )
    );

    const goHome = () => navigate('/');

    const handleOpenCreateItemOpen = (): void => {
        setEditItemDialogOpen(true);
    };

    return (
        <>
            {itemsLoading && <Loader />}
            <Box width='80%' m='36px auto 80px auto' className='user-profile'>
                <Box display='flex' columnGap='16px' flexWrap='wrap'>
                    {/* IMAGES */}
                    <Box>
                        <Box
                            flex='1 1 30%'
                            mb='24px'
                            borderRadius='15px'
                            position='relative'>
                            <img
                                alt={collection?.name}
                                src={collection?.image}
                                style={{
                                    objectFit: 'contain',
                                    borderRadius: '5px',
                                }}
                                width='300px'
                                height='400px'
                            />
                            <Box
                                position='absolute'
                                bottom='5%'
                                left='-1%'
                                padding='0 5%'>
                                <ThemeChip
                                    themeId={Number(collection?.themeId)}
                                    color='default'
                                    backgroundColor='white'
                                    border='none'
                                />
                            </Box>
                        </Box>
                        {hasFullAccess && (
                            <Box
                                justifyContent='center'
                                display='flex'
                                gap='12px'>
                                <Tooltip title='Add item'>
                                    {isNonMobile ? (
                                        <Fab size='small' color='secondary'>
                                            <AddIcon
                                                onClick={
                                                    handleOpenCreateItemOpen
                                                }
                                            />
                                        </Fab>
                                    ) : (
                                        <AddIcon
                                            fontSize='large'
                                            color='secondary'
                                        />
                                    )}
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

                                <Tooltip title='Edit collection'>
                                    <Link
                                        to={`/collection/${collectionId}/edit`}>
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
                    <EditItemDialog
                        open={editItemDialogOpen}
                        onClose={() => setEditItemDialogOpen(false)}
                        collectionId={Number(collection?.id)}
                    />
                    <Box
                        flex='5 1 60%'
                        mb={isNonMobile ? '0px' : '0px'}
                        mt={isNonMobile ? '0px' : '24px'}>
                        <Box m='0px 0 24px 0'>
                            <Typography
                                variant='h4'
                                textAlign='left'
                                color={shades.secondary[800]}
                                sx={{
                                    letterSpacing: '-0.5px',
                                    fontWeight: '600',
                                }}>
                                {collection?.name}
                            </Typography>
                            <Typography mt='16px'>
                                {collection?.description}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                {collectionItems && collectionItems.length > 0 ? (
                    <CollectionItems
                        collectionId={Number(collectionId)}
                        collectionThemeId={Number(collection?.themeId)}
                    />
                ) : (
                    <>
                        {' '}
                        <EmptyContainer
                            title={t('empty')}
                            text={t('emptyAndLoggedIn')}
                        />
                    </>
                )}
            </Box>
        </>
    );
};

export default CollectionPage;
