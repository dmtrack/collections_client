import { FC, useEffect, useState } from 'react';
import { Box, Divider, IconButton, TextField, Typography } from '@mui/material';

import { clearComments, setComments } from '../../state/slices/item.slice';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../state';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import Loader from '../../components/Loader/Loader';
import {
    connectItemSocket,
    postNewComment,
} from '../../state/socket/item/itemSocketActions';
import { toast } from 'react-toastify';
import { timestampToDateTime } from '../../utils/functions';
import { TypographyLink } from '../../components/Common/TypographyLink';
import { Text } from '../../components/Common/Text';

export const Comments: FC<{ itemId: number }> = ({ itemId }) => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'itemPage',
    });
    const dispatch = useAppDispatch();
    const { comments, socket, commentLoading } = useAppSelector(
        (state: RootState) => state.items
    );
    console.log(comments, 'comments');

    const { isAuth } = useAppSelector((state: RootState) => state.auth);
    const [commentValue, setCommentValue] = useState('');

    useEffect(() => {
        if (
            comments.length > 0 &&
            Number(comments[0].itemId) !== Number(itemId)
        ) {
            dispatch(setComments([]));
            console.log('clear comment');
        }
    }, [comments]);

    useEffect(() => {
        if (!socket) {
            dispatch(connectItemSocket(itemId));
        }
        return () => {
            socket?.close();
            dispatch(clearComments);
        };
    }, [socket, dispatch, itemId]);

    const addCommentHandler = () => {
        if (commentValue.trim()) {
            dispatch(postNewComment(itemId, commentValue));
            setCommentValue('');
        } else {
            toast(t('commentPlaceholder'));
        }
    };
    return (
        <>
            <Divider />
            <Box my={2}>
                <Text variant='h6'>Comments</Text>
                {comments?.map(({ id, userId, name, text, timestamp }) => (
                    <Box py={1} key={id} className='border-b flex'>
                        <TypographyLink mr={1} to={`/profile/${userId}`}>
                            {name}:
                        </TypographyLink>
                        <Typography alignSelf='center'>{text}</Typography>
                        <Typography fontSize='x-small' ml='auto' minWidth={90}>
                            {timestampToDateTime(timestamp)}
                        </Typography>
                    </Box>
                ))}
            </Box>
            {comments.length === 0 && !commentLoading && (
                <Text color='gray' textAlign='center' mb={3}>
                    {t('noComments')}
                </Text>
            )}
            {isAuth && (
                <TextField
                    size='small'
                    multiline
                    fullWidth
                    placeholder={t('commentPlaceholder') || ''}
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                    InputProps={{
                        endAdornment: commentLoading ? (
                            <Loader />
                        ) : (
                            <IconButton
                                sx={{ mt: 'auto' }}
                                onClick={addCommentHandler}>
                                <SendIcon />
                            </IconButton>
                        ),
                    }}
                />
            )}
        </>
    );
};
