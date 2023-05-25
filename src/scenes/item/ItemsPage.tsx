import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ItemsPage() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    }, []);

    return <>Items page</>;
}

export default ItemsPage;

// import React, { memo } from 'react';
// import { useTranslation } from 'react-i18next';

// import setCollections from '../../state/slices/collection.slice';
// import EmptyContainer from '../../components/Common/EmptyContainer/EmptyContainer';
// import ThemeFilter from 'components/FilterTools/ThemeFilter';

// import {
//     defaultSortButtons,
//     sortByItemsQuantityButtons,
// } from '../../utils/constants';

// import CollectionCardsContainer from '../../components/Collection/CollectionCardContainer/CollectionCardContainer';
// import Loader from '../../components/Loader/Loader';
// import { RootState } from '../../state';
// import { useAppSelector } from '../../hook/redux';
// import useGetAllCollections from '../../hook/useGetAllCollections';

// function CollectionsPage() {
//     const isLoggedIn = useAppSelector((state: RootState) => state.auth.isAuth);
//     const collections = useAppSelector(
//         (state: RootState) => state.collections.collections
//     );
//     const { t } = useTranslation('translation', { keyPrefix: 'collections' });
//     const {
//         allCollections,
//         theme,
//         isGetCollectionsLoading,
//         collectionsSorting,
//     } = useGetAllCollections();

//     return (
//         <div className='content'>
//             {isGetCollectionsLoading && <Loader />}
//             {allCollections ? (
//                 <>
//                     <div className='d-flex justify-content-end align-items-center gap-3 mb-4 mt-2 flex-md-row flex-column'>
//                         <ThemeFilter
//                             allCollections={allCollections}
//                             filteringList={collections}
//                             setList={setCollections}
//                             theme={theme}
//                         />
//                         <SortToolbar
//                             sortingCollectionsList={collections}
//                             sortingType={collectionsSorting}
//                             sortButtons={[
//                                 ...sortByItemsQuantityButtons,
//                                 ...defaultSortButtons,
//                             ]}
//                         />
//                     </div>
//                     <CollectionCardsContainer collections={collections} />
//                 </>
//             ) : (
//                 <EmptyContainer
//                     title={t('empty')}
//                     text={
//                         isLoggedIn
//                             ? `${t('emptyAndLoggedIn')}`
//                             : `${t('emptyAndLoggedOut')}`
//                     }
//                 />
//             )}
//         </div>
//     );
// }

// export default memo(CollectionsPage);
