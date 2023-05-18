import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCollection } from '../../hook/collectionStateHook';
import {
    Box,
    Typography,
    useMediaQuery,
    Tooltip,
    Fab,
    useTheme,
} from '@mui/material';
import { timestampToDateTime } from '../../utils/functions';
import { TransButton } from '../../components/Common/TransButton';
import { Comments } from './Comments';
import { Text } from '../../components/Common/Text';
import { TagChip } from '../../components/Common/TagChip';
import { ItemFieldView } from './ItemFieldView';
import { RootState } from '../../state';
import BackspaceSharpIcon from '@mui/icons-material/BackspaceSharp';
import EditIcon from '@mui/icons-material/Edit';
import { shades } from '../../theme';
import Loader from '../../components/Loader/Loader';
import { fetchItems } from '../../state/actions/items.actions';
import { EditItemDialog } from '../item/EditItemDialog';
import { DeleteDialog } from '../../components/Modals/DeleteDialog';
import { fetchItemConfigs } from '../../state/actions/collections.actions';
import { Likes } from './Likes';
import { fetchUsers } from '../../state/actions/userActions';

const ItemPageFile: FC = () => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'itemPage',
    });
    const dispatch = useAppDispatch();
    const { itemId } = useParams();
    const { itemsLoading, items } = useAppSelector(
        (state: RootState) => state.items
    );
    const { users } = useAppSelector((state) => state.users);
    const { commentLoading } = useAppSelector(
        (state: RootState) => state.items
    );
    const item = items.find((item) => Number(item.id) === Number(itemId));
    const author = users.find((u) => Number(u.id) === Number(item?.userId));

    const itemConfigs = useCollection().itemConfigs.filter(
        (config) => !config.hidden
    );
    const collection = useAppSelector((state) =>
        state.collections.collections.find(
            (c) => Number(c.id) === Number(item?.collectionId)
        )
    );

    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    const { auth } = useAppSelector((state) => state);
    const isAdmin = auth.access.access === 'admin' ? true : false;
    const userId = auth.userId;
    const isNonMobile = useMediaQuery('(min-width:600px)');
    useEffect(() => {
        dispatch(fetchItems());
        dispatch(fetchUsers());
        dispatch(fetchItemConfigs(Number(collection?.id)));
    }, [dispatch]);

    const hasFullAccess = userId && (item?.userId === userId || isAdmin);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const handleOpenDeleteDialogOpen = (): void => {
        setDeleteDialogOpen(true);
    };
    const isLoading = itemsLoading || commentLoading;
    return (
        <>
            {isLoading && <Loader />}
            <Box
                width='80%'
                minHeight='calc(100vh - 420px)'
                m='36px auto 80px auto'
                className='user-profile'>
                <Box
                    display='flex'
                    flexWrap='wrap'
                    flexDirection={isNonMobile ? 'row' : 'column'}
                    columnGap='16px'>
                    {/* IMAGES */}
                    <Box>
                        <Box
                            flex='1'
                            mb='24px'
                            borderRadius='15px'
                            position='relative'>
                            <img
                                alt={item?.name}
                                src={item?.image}
                                style={{
                                    objectFit: 'contain',
                                    borderRadius: '5px',
                                }}
                                width='300px'
                                height='400px'
                            />
                        </Box>
                        {hasFullAccess ? (
                            <Box
                                justifyContent='center'
                                display='flex'
                                gap='12px'>
                                <Tooltip title={`${t('edit')}`}>
                                    {isNonMobile ? (
                                        <Fab size='small' color='primary'>
                                            <EditIcon
                                                onClick={() =>
                                                    setEditDialogOpen(true)
                                                }
                                            />
                                        </Fab>
                                    ) : (
                                        <EditIcon
                                            fontSize='large'
                                            onClick={() =>
                                                setEditDialogOpen(true)
                                            }
                                        />
                                    )}
                                </Tooltip>

                                <Tooltip title={`${t('delete')}`}>
                                    {isNonMobile ? (
                                        <Fab size='small' color='primary'>
                                            <BackspaceSharpIcon
                                                onClick={
                                                    handleOpenDeleteDialogOpen
                                                }
                                            />
                                        </Fab>
                                    ) : (
                                        <BackspaceSharpIcon
                                            fontSize='large'
                                            color='primary'
                                            onClick={handleOpenDeleteDialogOpen}
                                        />
                                    )}
                                </Tooltip>
                            </Box>
                        ) : null}
                    </Box>

                    <Box
                        flex='1'
                        flexBasis='30%'
                        mt={isNonMobile ? '0px' : '36px'}
                        ml={isNonMobile ? '24px' : '0px'}>
                        <Box m='0px 0 24px 0' textAlign='left'>
                            <Typography
                                variant='h4'
                                color={colors.secondary[800]}
                                sx={{
                                    letterSpacing: '-0.5px',
                                    fontWeight: '600',
                                }}>
                                {item?.name} <Likes itemId={Number(itemId)} />
                            </Typography>
                            {/* <Typography mt='24px' fontSize='16px'>
                                {item?.description}
                            </Typography> */}

                            {itemConfigs.map((config) => (
                                <Box key={config.id} mt='12px' fontSize='14px'>
                                    <ItemFieldView
                                        item={item}
                                        config={config}
                                    />
                                </Box>
                            ))}
                            <Typography mt='36px' fontSize='14px' color='gray'>
                                <Link
                                    to={`/users/${item?.userId}`}
                                    className='link capitalize'>
                                    {t('createdBy')}: {author?.name}
                                </Link>
                            </Typography>
                            <Typography color='gray' mt='4px' fontSize='14px'>
                                {t('createdDate')}:{' '}
                                {timestampToDateTime(item?.created)}
                            </Typography>
                            <Box>
                                {!!item?.tags.length && (
                                    <Box display='flex' flexWrap='wrap'>
                                        {item?.tags.map((tag) => (
                                            <TagChip
                                                key={tag.id + tag.name}
                                                tag={tag}
                                            />
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        flexBasis='40%'
                        flexWrap='wrap'
                        flexGrow='2'
                        alignSelf='end'
                        mt={isNonMobile ? 'none' : '16px'}
                        width='100%'>
                        <Comments itemId={Number(itemId)} />
                    </Box>
                </Box>
            </Box>

            {item && (
                <EditItemDialog
                    collectionId={Number(item?.collectionId)}
                    open={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    item={item}
                />
            )}
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                entityId={Number(item?.id)}
                entity={item}
                userId={userId}
                link={Number(item?.collectionId)}
            />
        </>
    );
};

export default ItemPageFile;
