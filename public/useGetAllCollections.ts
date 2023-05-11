// import { useEffect } from 'react';

// import { useLazyGetAllCollectionsQuery } from 'redux/api/collectionApiSlice';

// import {
//     setBiggestCollections,
//     setCollections,
// } from 'redux/slices/collectionSlice';

// import { collectionsIndex } from '../utils/constants';
// import { sortData } from '../utils/functions';

// import { useAppDispatch, useAppSelector } from './redux';
// import { ICollection } from '../models/ICollection';

// const useGetAllCollections = () => {
//     const isLoggedIn = useAppSelector((state) => state.auth.isAuth);
//     const collectionsSorting = useAppSelector(
//         (state) => state.sort.collectionsSorting
//     );
//     const theme = useAppSelector(
//         (state) => state.filter.collectionsThemeFilter
//     );
//     const dispatch = useAppDispatch();

//     const [
//         getAllCollections,
//         {
//             data: allCollections,
//             isSuccess: isSuccessGetCollections,
//             isLoading: isGetCollectionsLoading,
//         },
//     ] = useLazyGetAllCollectionsQuery();

//     useEffect(() => {
//         (async () => {
//             await getAllCollections();
//         })();
//     }, [isLoggedIn]);

//     useEffect(() => {
//         if (allCollections && isSuccessGetCollections) {
//             (async () => {
//                 const collections = allCollections.map((element) => ({
//                     id: element._id,
//                     element,
//                 }));
//                 await collectionsIndex.deleteAllDocuments();
//                 await collectionsIndex.addDocuments(collections);
//             })();
//             const sortedData = sortData(
//                 collectionsSorting,
//                 null,
//                 allCollections
//             ) as ICollection[];
//             dispatch(setCollections(sortedData));
//             if (theme) {
//                 const filteredData = sortedData.filter(
//                     (element) => element.themeId === theme
//                 );
//                 dispatch(setCollections(filteredData || null));
//             }
//         }
//     }, [allCollections]);

//     useEffect(() => {
//         if (allCollections) {
//             const biggestCollectionsList = [...allCollections]
//                 .sort((a, b) => b.itemsQuantity - a.itemsQuantity)
//                 .slice(0, 4);
//             dispatch(setBiggestCollections(biggestCollectionsList));
//         }
//     }, [allCollections]);

//     return {
//         getAllCollections,
//         allCollections,
//         theme,
//         isGetCollectionsLoading,
//         collectionsSorting,
//     };
// };

// export default useGetAllCollections;

console.log('hello');
