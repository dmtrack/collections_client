import { useState } from 'react';
import { useAppDispatch } from '../hook/redux';
import { IconButton, Box, Typography, useTheme, Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { shades } from '../theme';
import { useNavigate } from 'react-router-dom';

const CollectionItem = (collection: any, width: any) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [count, setCount] = useState(1);
};

export default CollectionItem;
