import { Box, useMediaQuery } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook/redux'
import Loader from '../../components/Loader/Loader'
import { MAX_IMAGE_SIZE } from '../../utils/constants'
import { ICollectionFormValues } from '../../models/ICollection'

import { toast } from 'react-toastify'
import { EditCollectionForm } from '../../components/Collection/EditCollectionForm/EditCollectionForm'
import { createCollection } from '../../state/actions/collections.actions'

const CreateCollection = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isAuth, userId } = useAppSelector((state) => state.auth)
    const { collectionsLoading, collectionIsBusy } = useAppSelector((state) => state.collections)
    const isLoading = collectionIsBusy || collectionsLoading
    const isNonMobile = useMediaQuery('(min-width:600px)')

    useEffect(() => {
        if (!isAuth) navigate('/')
    }, [isAuth, navigate])

    const handleSubmit = (data: ICollectionFormValues) => {
        const itemConfigs = data.itemConfigs.filter(config => config.type && config.label)
        if (data.image && data.image?.size > MAX_IMAGE_SIZE) return toast('The maximum image size is 10MB')
        dispatch(createCollection({ ...data, userId, itemConfigs }, navigate))
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
                  <EditCollectionForm onSubmit={handleSubmit}/>
              </Box>
          </Box>
      </>
    )
};

export default CreateCollection;
