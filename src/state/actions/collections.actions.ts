import { AppDispatch } from '..'
import { collectionSlice } from '../slices/collection.slice'
import collectionService from '../../services/collectionService'
import { NavigateFunction } from 'react-router-dom'
import { saveImageToCloud } from '../../api/firebase/actions'
import { ICollection, ICollectionFormValues } from '../../models/ICollection'
import { ItemConfigType } from '../models/ICollection.state'

export const fetchCollections = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(collectionSlice.actions.fetchingCollections())
        const response = await collectionService.getCollections()

        response
          .mapRight(({ data: collections }) => {
              dispatch(
                collectionSlice.actions.fetchCollectionsSuccess(collections)
              )
          })
          .mapLeft((e: any) => {
              dispatch(collectionSlice.actions.fetchError(e.response?.data))
              console.error({
                  type: e.response.statusText,
                  code: e.response.status,
                  message: e.response.data
              })
          })
    };
};

export const fetchUserCollections = (userId: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(collectionSlice.actions.fetchingUsersCollections());
        const response = await collectionService.getUserCollections(userId);

        response
            .mapRight(({ data: collections }) => {
                dispatch(
                    collectionSlice.actions.fetchCollectionsUserSuccess(
                        collections
                    )
                );
            })
            .mapLeft((e: any) => {
                dispatch(collectionSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

// export const filterCollectionById = (collectionId: number) => {
//     return async (dispatch: AppDispatch) => {
//         dispatch(collectionSlice.actions.fetchingCollections);
//         dispatch(
//             collectionSlice.actions.filterOneCollectionSuccess(collectionId)
//         );
//     };
// };

// export const fetchCollectionById = (collectionId: number) => {
//     return async (dispatch: AppDispatch) => {
//         dispatch(collectionSlice.actions.fetchingCollections);
//         const response = await collectionService.getOneCollection(collectionId);

//         response
//             .mapRight(({ data: collections }) => {
//                 dispatch(
//                     collectionSlice.actions.fetchCollectionsUserSuccess(
//                         collections
//                     )
//                 );
//             })
//             .mapLeft((e: any) => {
//                 dispatch(collectionSlice.actions.fetchError(e.response?.data));
//                 console.error({
//                     type: e.response.statusText,
//                     code: e.response.status,
//                     message: e.response.data,
//                 });
//             });
//     };
// };

export const fetchTopAmountCollections = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(collectionSlice.actions.fetchingTopAmountCollections());
        const response = await collectionService.getTopAmountCollections();

        response
            .mapRight(({ data: collections }) => {
                dispatch(
                    collectionSlice.actions.fetchTopAmountSuccess(collections)
                );
            })
            .mapLeft((e: any) => {
                dispatch(collectionSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const fetchThemes = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(collectionSlice.actions.fetchingThemes());
        const response = await collectionService.getThemes();
        response
            .mapRight(({ data: themes }) =>
                dispatch(collectionSlice.actions.fetchThemesSuccess(themes))
            )
            .mapLeft((e: any) => {
                dispatch(collectionSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const createCollection = (
    data: ICollectionFormValues,
    navigate: NavigateFunction
) => {
    return async (dispatch: AppDispatch) => {
        const { image, name, description, userId, themeId, itemConfigs } = data
        dispatch(collectionSlice.actions.setCollectionsBusy(true))
        let imageUrl = ''
        if (image) {
            imageUrl = await saveImageToCloud(image, 'collections')
        }

        const collectionDTO = {
            name,
            description,
            userId,
            image: imageUrl,
            themeId
        }


        const response = await collectionService.createCollection({
            collection: collectionDTO, itemConfigs
        });
        response
            .mapRight(() => navigate(`/users/${userId}`))
            .mapLeft((e: any) => {
                dispatch(collectionSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
        dispatch(collectionSlice.actions.setCollectionsBusy(false));
    };
};

export const deleteCollection = (
    collectionId: number,
    navigate: NavigateFunction,
    userId: number
) => {
    return async (dispatch: AppDispatch) => {
        dispatch(collectionSlice.actions.setCollectionsBusy(true));
        const response = await collectionService.deleteCollection(collectionId);

        response
            .mapRight(({ data: dataId }) => {
                dispatch(collectionSlice.actions.deleteCollection(dataId));
                navigate(`/users/${userId}`);
            })
            .mapLeft((e: any) => {
                dispatch(collectionSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
        dispatch(collectionSlice.actions.setCollectionsBusy(false));
    };
};

export const fetchItemConfigs = (collectionId: number) => async (dispatch: AppDispatch) => {
    dispatch(collectionSlice.actions.setCollectionsBusy(true))
    const response = await collectionService.getItemConfigs(collectionId)
    response
      .mapRight(({ data: configs }) => {
          dispatch(collectionSlice.actions.setItemConfigs(configs))
      })
      .mapLeft((e: any) => {
          dispatch(collectionSlice.actions.fetchError(e.response?.data))
          console.error({
              type: e.response.statusText,
              code: e.response.status,
              message: e.response.data
          })
      })
    dispatch(collectionSlice.actions.setCollectionsBusy(false))
}

export const editCollection = (
  collection: ICollection,
  itemConfigs: ItemConfigType[],
  navigate: NavigateFunction,
  newImage?: File
) => async (dispatch: AppDispatch) => {
    dispatch(collectionSlice.actions.setCollectionsBusy(true))
    let imageUrl = ''
    if (newImage) {
        imageUrl = await saveImageToCloud(newImage, 'collections')
    } else {
        imageUrl = collection.image
    }

    const collectionDTO: ICollection = { ...collection, image: imageUrl }

    const response = await collectionService.editCollection({
        collection: collectionDTO, itemConfigs
    })
    response
      .mapRight(() => navigate(`/users/${collection.userId}`))
      .mapLeft((e: any) => {
          dispatch(collectionSlice.actions.fetchError(e.response?.data))
          console.error({
              type: e.response.statusText,
              code: e.response.status,
              message: e.response.data
          })
      })

    dispatch(collectionSlice.actions.setCollectionsBusy(false))
}
