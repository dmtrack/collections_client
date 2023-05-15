import { FC, useEffect } from 'react';
import { IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { RootState } from '../../state';
import { setLikes } from '../../state/slices/item.slice';
import { toggleLike } from '../../state/socket/item/itemSocketActions';
import LittleLoader from '../../components/Loader/LittleLoader';

export const Likes: FC<{ itemId: number }> = ({ itemId }) => {
    const dispatch = useAppDispatch();
    const { isAuth, userId } = useAppSelector((state: RootState) => state.auth);
    const { likes, likesLoading } = useAppSelector(
        (state: RootState) => state.items
    );
    const isLiked = !!likes.find((like) => like.userId === userId);

    useEffect(() => {
        if (likes.length > 0 && Number(likes[0].itemId) !== Number(itemId)) {
            dispatch(setLikes([]));
            console.log('clear like');
        }
    }, [likes]);

    const likeHandler = () => {
        dispatch(toggleLike(itemId));
    };

    return (
        <>
            <IconButton
                onClick={likeHandler}
                disabled={!isAuth || likesLoading || isLiked}>
                {isLiked ? (
                    <FavoriteIcon className='red' />
                ) : (
                    <FavoriteBorderIcon />
                )}
                {likesLoading ? (
                    <LittleLoader />
                ) : (
                    <Typography>{likes.length}</Typography>
                )}
            </IconButton>
        </>
    );
};
