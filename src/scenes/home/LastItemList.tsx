import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Item';
import {
    fetchItems,
    fetchTopRatedItems,
} from '../../state/actions/items.actions';
import { IItem } from '../../models/IItem';
import { shades } from '../../theme';
import { v4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { PopularTagCloud } from '../../components/TagCloud/PopularTagCloud';

const LastItemList = () => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'home',
    });
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTopRatedItems());
        dispatch(fetchItems());
    }, []);
    const { items } = useAppSelector((state) => state.items);
    const { topRated } = useAppSelector((state) => state.items);

    const topRatedFlat = topRated?.map((element) => {
        return {
            id: element.id,
            count: element.count,
            image: element.item?.image,
            name: element.item?.name,
            created: element.item?.created,
            collectionId: Number(element.item?.collectionId),
            tags: element.tags,
        };
    });

    // const mostCommented = items.slice(items.length - 3, items.length);

    const [value, setValue] = useState('newItems');
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <>
            <Box
                width={isNonMobile ? '80%' : '100%'}
                marginLeft='auto'
                marginRight='auto'
                marginTop={isNonMobile ? '24px' : '0px'}>
                <Typography
                    variant='h4'
                    textAlign='left'
                    color={shades.secondary[800]}
                    sx={{
                        letterSpacing: '-0.5px',
                        fontWeight: '600',
                        paddingLeft: isNonMobile ? '0px' : '64px',
                    }}>
                    {t('discover')}
                </Typography>
                <Tabs
                    textColor='primary'
                    indicatorColor='primary'
                    value={value}
                    onChange={handleChange}
                    centered
                    TabIndicatorProps={{
                        sx: { display: isNonMobile ? 'block' : 'none' },
                    }}
                    sx={{
                        m: '15px',
                        '& .MuiTabs-flexContainer': { flexWrap: 'wrap' },
                    }}>
                    <Tab label='NEW' value='newItems' />
                    <Tab label='TOP RATED' value='topRated' />
                    <Tab label='MOST COMMENTED' value='mostCommented' />
                </Tabs>
                <Box
                    margin='0 auto'
                    display='grid'
                    gridTemplateColumns='repeat(auto-fill, 300px)'
                    justifyContent='space-around'
                    rowGap='32px'
                    columnGap='1.33%'>
                    {value === 'newItems' &&
                        items
                            .slice(0, 3)
                            .map((item: IItem) => (
                                <Item item={item} key={v4()} />
                            ))}
                    {value === 'topRated' &&
                        topRatedFlat
                            .slice(0, 3)
                            .map((item: IItem) => (
                                <Item item={item} key={v4()} />
                            ))}
                    {value === 'mostCommented' &&
                        items
                            .slice(0, 3)
                            .map((item: IItem) => (
                                <Item item={item} key={v4()} />
                            ))}
                </Box>
                <Box mt={10}>
                    <PopularTagCloud />
                </Box>
            </Box>
        </>
    );
};

export default LastItemList;
