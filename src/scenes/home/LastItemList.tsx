import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Item';
import {
    fetchItems,
    fetchTopRatedItems,
} from '../../state/actions/items.actions';
import { IItem } from '../../models/IItem';

const LastItemList = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.items.items);
    const topRated = useAppSelector((state) => state.items.topRated);
    const topRatedFlat = topRated.map((element) => {
        return {
            id: element.id,
            count: element.count,
            image: element.item?.image,
            name: element.item?.name,
        };
    });
    console.log(topRatedFlat);

    const [value, setValue] = useState('newItems');
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(fetchItems());
        dispatch(fetchTopRatedItems());
    }, [dispatch]);

    const mostCommented = items.slice(items.length - 3, items.length);
    return (
        <Box width="80%" margin="80px auto">
            <Typography variant="h3" textAlign="center">
                Discover <b>items</b>
            </Typography>
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{
                    sx: { display: isNonMobile ? 'block' : 'none' },
                }}
                sx={{
                    m: '25px',
                    '& .MuiTabs-flexContainer': { flexWrap: 'wrap' },
                }}
            >
                <Tab label="NEW ITEMS" value="newItems" />
                <Tab label="TOP RATED" value="topRated" />
                <Tab label="MOST COMMENTED" value="mostCommented" />
            </Tabs>
            <Box
                margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 300px)"
                justifyContent="space-around"
                rowGap="20px"
                columnGap="1.33%"
            >
                {value === 'newItems' &&
                    items
                        .slice(0, 3)
                        .map((item: IItem) => (
                            <Item item={item} key={Number(item.id)} />
                        ))}
                {value === 'topRated' &&
                    topRatedFlat
                        .slice(0, 3)
                        .map((item: IItem) => (
                            <Item item={item} key={Number(item.id)} />
                        ))}
                {value === 'mostCommented' &&
                    mostCommented.map((item: IItem) => (
                        <Item item={item} key={Number(item.id)} />
                    ))}
            </Box>
        </Box>
    );
};

export default LastItemList;
