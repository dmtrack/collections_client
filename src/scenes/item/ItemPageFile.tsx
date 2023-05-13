import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCollection } from '../../hook/collectionStateHook';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { deleteItem, fetchItems } from '../../state/actions/items.actions';
import { timestampToDateTime } from '../../utils/functions';
import Loader from '../../components/Loader/Loader';
import { TransButton } from '../../components/Common/TransButton';
import { DeleteDialog } from '../../components/Modals/DeleteDialog';
import { Comments } from './Comments';
import { Text } from '../../components/Common/Text';
import { EditItemDialog } from './EditItemDialog';
import BackspaceSharpIcon from '@mui/icons-material/BackspaceSharp';
import { TagChip } from '../../components/Common/TagChip';
import { Likes } from './Likes';
import { ItemFieldView } from './ItemFieldView';

const ItemPageFile: FC = () => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'itemPage',
    });
    const dispatch = useAppDispatch();
    const { itemId } = useParams();
    const { itemsLoading, items } = useAppSelector((state) => state.items);
    const item = items.find((item) => Number(item.id) === Number(itemId));
    const navigate = useNavigate();
    const itemConfigs = useCollection().itemConfigs.filter(
        (config) => !config.hidden
    );
    const collection = useAppSelector((state) =>
        state.collections.collections.find(
            (c) => Number(c.id) === Number(item?.collectionId)
        )
    );

    const { auth } = useAppSelector((state) => state);

    const isAdmin = auth.access.access === 'admin' ? true : false;
    const userId = auth.userId;
    const isNonMobile = useMediaQuery('(min-width:600px)');
    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const hasFullAccess = userId && (item?.userId === userId || isAdmin);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const handleOpenDeleteDialogOpen = (): void => {
        setDeleteDialogOpen(true);
    };

    return (
        <Box py={1} px={3} my={3} mx='auto' maxWidth='42rem' className='border'>
            <Box display='flex'>
                <Text
                    fontSize='medium'
                    color='gray'
                    mr={1}
                    hidden={!item?.name}>
                    author
                </Text>
                <Link to={`/users/${item?.userId}`} className='link capitalize'>
                    {auth?.name}
                </Link>
            </Box>
            <Box p={1} className='flex border-b'>
                <Box mr='auto'>
                    <Typography variant='h5'>{item?.name}</Typography>
                    <Typography fontSize='small' color='gray'>
                        {timestampToDateTime(item?.created)}
                    </Typography>
                </Box>
                {itemsLoading ? (
                    <Loader />
                ) : (
                    <Box hidden={!hasFullAccess}>
                        <TransButton
                            onClick={() => setEditDialogOpen(true)}
                            hidden={!hasFullAccess}>
                            Edit
                        </TransButton>
                        <TransButton
                            color='error'
                            onClick={handleOpenDeleteDialogOpen}
                            hidden={!hasFullAccess}>
                            Delete
                        </TransButton>
                    </Box>
                )}

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
            </Box>
            <Box display='flex' flexWrap='wrap'>
                {item?.tags.map((tag) => (
                    <TagChip key={tag.id + tag.name} tag={tag} />
                ))}
            </Box>
            {itemConfigs.map((config) => (
                <Box key={config.id}>
                    <ItemFieldView item={item} config={config} />
                </Box>
            ))}
            <Box display='flex' justifyContent='space-between'>
                <TransButton
                    size='small'
                    onClick={() => navigate(`/collections/${collection?.id}`)}>
                    {t('backToCollection')}
                </TransButton>
                <Likes itemId={Number(itemId)} />
            </Box>
            <Comments itemId={Number(itemId)} />
        </Box>
    );
};

export default ItemPageFile;
