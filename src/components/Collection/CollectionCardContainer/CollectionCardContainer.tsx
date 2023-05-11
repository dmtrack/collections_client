import React from 'react';
import { useTranslation } from 'react-i18next';
import CollectionCard from '../../Collection/CollectionCard/CollectionCard';
import EmptyContainer from '../../Common/EmptyContainer/EmptyContainer';
import { Box, useMediaQuery } from '@mui/material';
import { useAppSelector } from '../../../hook/redux';
import { ICollection } from '../../../models/ICollection';
import { useParams } from 'react-router-dom';

interface CollectionCardsContainerProps {
    collections: ICollection[] | null;
}

function CollectionCardsContainer({
    collections,
}: CollectionCardsContainerProps) {
    const { t } = useTranslation('translation');
    const { userId } = useParams();

    const isNonMobile = useMediaQuery('(min-width:600px)');

    return (
        <>
            <Box mt={isNonMobile ? '32px' : '16px'} width='100%'>
                <Box
                    margin='0 auto'
                    display='grid'
                    gridTemplateColumns='repeat(auto-fill, 300px)'
                    justifyContent='space-around'
                    rowGap='32px'
                    columnGap='1.33%'>
                    {collections?.map((collection, i) => (
                        <CollectionCard
                            key={`${collection.name}-${i}`}
                            collection={collection}
                            userId={Number(userId)}
                        />
                    ))}
                </Box>
            </Box>
        </>
    );
}
export default CollectionCardsContainer;
