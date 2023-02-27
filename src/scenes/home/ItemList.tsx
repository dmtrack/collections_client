import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Item';
import { fetchItems } from '../../state/actions/items.actions';

const ItemList = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.items);
    const [value, setValue] = useState('all');
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(fetchItems());
    }, []);

    return <div>ItemsList</div>;
};

export default ItemList;
