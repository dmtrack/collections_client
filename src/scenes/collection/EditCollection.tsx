import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { Box, useMediaQuery } from '@mui/material'
import { EditCollectionForm } from '../../components/Collection/EditCollectionForm/EditCollectionForm'
import { useAppDispatch, useAppSelector } from '../../hook/redux'
import { ICollection, ICollectionFormValues } from '../../models/ICollection'
import { MAX_IMAGE_SIZE } from '../../utils/constants'
import { toast } from 'react-toastify'
import { editCollection } from '../../state/actions/collections.actions'
import { useCollection } from '../../hook/useCollection'

const EditCollection = () => {
  const { collectionId } = useParams()
  const dispatch = useAppDispatch()
  const { isAuth, userId } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const { collectionsLoading, collectionIsBusy } = useAppSelector((state) => state.collections)
  const isLoading = collectionIsBusy || collectionsLoading
  const { collection, collectionConfig } = useCollection(Number(collectionId))

  useEffect(() => {
    if (!isAuth) navigate('/')
  }, [isAuth, navigate])

  const handleSubmit = (data: ICollectionFormValues) => {
    const itemConfigs = data.itemConfigs.filter(config => config.type && config.label)
    if (data.image && data.image?.size > MAX_IMAGE_SIZE) return toast('The maximum image size is 10MB')
    if (!collection?.id) return
    const editedCollection: ICollection = {
      ...collection,
      ...data,
      image: collection.image,
      userId
    }
    dispatch(editCollection(editedCollection, itemConfigs, navigate, data.image))
  }
  if (!collection) {
    navigate(-1)
    return <></>
  }
  return (
    <>
      {isLoading && <Loader/>}
      <Box
        width="80%"
        m="36px auto 80px auto"
        className="create-collection"
        alignItems={isNonMobile ? 'start' : 'center'}>
        <Box width="100%" display="flex" flexWrap="wrap" gap="48px">
          <EditCollectionForm onSubmit={handleSubmit}
                              editable={{ ...collection, itemConfigs: collectionConfig, image: undefined }}/>
        </Box>
      </Box>
    </>
  )
}

export default EditCollection;
