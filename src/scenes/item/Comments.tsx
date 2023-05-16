import { FC, useEffect, useState } from 'react';
import {
    Box,
    IconButton,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';

import { clearComments, setComments } from '../../state/slices/item.slice';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../state';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import {
    connectItemSocket,
    postNewComment,
} from '../../state/socket/item/itemSocketActions';
import { toast } from 'react-toastify';
import { timestampToDateTime } from '../../utils/functions';
import { TypographyLink } from '../../components/Common/TypographyLink';
import { Text } from '../../components/Common/Text';
import { shades } from '../../theme';

export const Comments: FC<{ itemId: number }> = ({ itemId }) => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'itemPage',
    });
    const theme = useTheme();
    const mode = theme.palette.mode;
    const colors = shades(theme.palette.mode);

    const dispatch = useAppDispatch();
    const { comments, socket, commentLoading } = useAppSelector(
        (state: RootState) => state.items
    );

    const { isAuth, userId: currentUserId } = useAppSelector(
        (state: RootState) => state.auth
    );
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

    const onEmojiClick = (emojiData: string) =>
        setCommentValue(`${commentValue} ${emojiData}`);

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
            <Box my={2} width='auto' margin='0 auto' mt='32px'>
                {/* <Text variant='h6'>{t('commentsTitle')}</Text> */}
                <Box
                    className={
                        mode === 'light' ? 'messages-light' : 'messages-dark'
                    }>
                    {comments.map(({ id, userId, name, text, created }) => {
                        const itsMe = userId === currentUserId;
                        const className = itsMe ? 'me' : 'user';
                        return (
                            <Box
                                py={1}
                                key={id}
                                className={`${className} message`}>
                                <Box display='flex' alignItems='center'>
                                    <Typography
                                        fontSize='x-small'
                                        color={colors.primary[200]}
                                        ml='auto'
                                        minWidth={90}>
                                        {timestampToDateTime(created)}
                                    </Typography>
                                    <TypographyLink
                                        color={colors.primary[500]}
                                        className='user'
                                        mr={1}
                                        to={`/users/${userId}`}>
                                        {name}{' '}
                                    </TypographyLink>
                                </Box>

                                <Typography className='text'>{text}</Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
            {comments.length === 0 && !commentLoading && (
                <Text color='gray' textAlign='center' mb={3}>
                    {t('noComments')}
                </Text>
            )}
            <Box className='input'>
                {isAuth && (
                    <>
                        <TextField
                            sx={{ color: `${colors.secondary[500]}` }}
                            size='small'
                            multiline
                            fullWidth
                            placeholder={t('commentPlaceholder') || ''}
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        sx={{ mt: 'auto' }}
                                        onClick={addCommentHandler}>
                                        <SendIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </>
                )}
            </Box>
        </>
    );
};
