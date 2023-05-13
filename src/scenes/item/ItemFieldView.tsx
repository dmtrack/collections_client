import { FC } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { IItem } from '../../models/IItem';
import { ItemConfigType } from '../../state/models/ICollection.state';
import { useApp } from '../../hook/appState';

interface ItemFieldViewProps {
    item?: IItem;
    config: ItemConfigType;
}

export const ItemFieldView: FC<ItemFieldViewProps> = ({ config, item }) => {
    const sliceType = config.type.slice(0, -1);
    const theme = useApp().theme;
    const getView = () => {
        if (item) {
            const value = item[config.type];
            switch (sliceType) {
                case 'date':
                    return (
                        <Typography>
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
        <Box my={1} p={1} className='border rounded' data-color-mode={theme}>
            <Typography variant='h6'>{config.label}</Typography>
            {getView()}
        </Box>
    );
};
