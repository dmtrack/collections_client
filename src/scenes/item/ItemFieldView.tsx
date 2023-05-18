import { FC } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { IItem } from '../../models/IItem';
import { ItemConfigType } from '../../state/models/ICollection.state';
import { useApp } from '../../hook/appState';
import { useLocation } from 'react-router-dom';

interface ItemFieldViewProps {
    item?: IItem;
    config: ItemConfigType;
}

export const ItemFieldView: FC<ItemFieldViewProps> = ({ config, item }) => {
    const location = useLocation();
    const sliceType = config.type.slice(0, -1);
    const theme = useApp().apptheme;
    const getView = () => {
        if (item) {
            const value = item[config.type];
            switch (sliceType) {
                case 'date':
                    return (
                        <Typography mt='0px'>
                            {value
                                ? dayjs(value as string).format('MM-DD-YYYY')
                                : '-'}
                        </Typography>
                    );
                case 'str':
                    return <Typography>{value}</Typography>;
                case 'txt':
                    return <MDEditor.Markdown source={value as string} />;
                case 'numb':
                    return <Typography>{value}</Typography>;
                case 'bool':
                    return value ? <CheckIcon /> : <CloseIcon />;
                default:
                    return <></>;
            }
        }
    };

    return (
        <Box
            display='flex'
            my={1}
            p={location.pathname.includes('items') ? 0 : 1}
            className={
                location.pathname.includes('items') ? '' : 'border rounded'
            }
            data-color-mode={theme}>
            <Typography
                m={location.pathname.includes('items') ? '0px' : '24px auto'}
                mr={location.pathname.includes('items') ? '8px' : 0}
                fontSize='14px'>
                {config.label}:
            </Typography>
            {getView()}
        </Box>
    );
};
