import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Item';
import { fetchItems } from '../../state/actions/items.actions';
import { IItem } from '../../models/IItem';
import { shades } from '../../theme';
import { v4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../state';

interface ICollectionItemsProps {
    collectionId: number;
    collectionThemeId: number;
    // children: string | Element[];
}

const CollectionItems = ({ collectionId }: ICollectionItemsProps) => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'collectionPage',
    });
    const [value, setValue] = useState('collection items');
    const handleChange = (e: any, newValue: string) => {
        setValue(newValue);
    };
    useEffect(() => {
        fetchItems();
    }, []);
    const collectionItems = useAppSelector((state: RootState) =>
        state.items.items.filter((i) => Number(i.collectionId) === collectionId)
    );

    const isNonMobile = useMediaQuery('(min-width:600px)');

    return (
        <>
            <Box marginTop={isNonMobile ? '32px' : '64px'}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    TabIndicatorProps={{
                        sx: { display: isNonMobile ? 'block' : 'none' },
                    }}
                    sx={{
                        m: '0px',
                        '& .MuiTabs-flexContainer': {
                            flexWrap: 'wrap',
                        },
                    }}>
                    <Tab label='COLLECTION ITEMS' value='collection items' />
                </Tabs>
            </Box>
            <Box display='flex' flexWrap='wrap' gap='16px'>
                {value === 'collection items'}
            </Box>

            <Box
                mt={isNonMobile ? '24px' : '16px'}
                width='100%'
                display='grid'
                gridTemplateColumns='repeat(auto-fill, 300px)'
                justifyContent='space-around'
                rowGap='32px'
                columnGap='1.33%'>
                {collectionItems.map((item: IItem) => (
                    <Item item={item} key={v4()} />
                ))}
            </Box>
        </>
    );
};

export default CollectionItems;
