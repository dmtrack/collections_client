import { FC, useEffect } from 'react';
import { IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { RootState } from '../../state';
import { setLikes } from '../../state/slices/item.slice';
import { toggleLike } from '../../state/socket/item/itemSocketActions';
import LittleLoader from '../../components/Loader/LittleLoader';
import { color, useTheme } from '@mui/system';
import { shades } from '../../theme';

export const Likes: FC<{ itemId: number }> = ({ itemId }) => {
    const dispatch = useAppDispatch();
    const { isAuth, userId } = useAppSelector((state: RootState) => state.auth);
    const { likes, likesLoading } = useAppSelector(
        (state: RootState) => state.items
    );
    const theme = useTheme();
    const mode = theme.palette.mode;
    const colors = shades(theme.palette.mode);
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
                    <FavoriteIcon sx={{ color: 'rgb(240, 93, 93)' }} />
                ) : (
                    <FavoriteBorderIcon />
                )}
                {likesLoading ? (
                    <LittleLoader />
                ) : (
                    <Typography
                        sx={{
                            color:
                                mode === 'dark'
                                    ? `${colors.primary[500]}`
                                    : `${colors.secondary[200]}`,
                        }}>
                        {likes.length}
                    </Typography>
                )}
            </IconButton>
        </>
    );
};
