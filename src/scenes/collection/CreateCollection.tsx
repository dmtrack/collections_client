import { Box, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hook/redux';

const CreateCollection = () => {
    const navigate = useNavigate();
    const { isAuth } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuth) navigate('/');
    }, [isAuth, navigate]);
    const themes = useAppSelector((state) => state.collections.themes);

    const handleSubmit = () => {
        console.log('submit');
    };

    // const onSubmit: SubmitHandler<Inputs> = (data) => {
    //     const itemConfigs = configInputs.filter(
    //         (config) => config.type && config.label
    //     );
    //     if (data.image[0]?.size > MAX_IMAGE_SIZE)
    //         return snackbar('The maximum photo size is 10MB');
    //     if (editable) {
    //         const removedConfigs = editable.itemConfigs.filter((config) => {
    //             return !configInputs.find(
    //                 (newConfig) => newConfig.id === config.id
    //             );
    //         });
    //         // const sendData: EditCollectionPayload = {
    //         //     ...editable.collection,
    //         //     ...data,
    //         //     image: data.image[0],
    //         //     itemConfigs,
    //         //     removedConfigs,
    //         // };
    //         // if (editable.collection.imageUrl && !data.existingImage) {
    //         //     sendData.deletedImage = editable.collection.imageUrl;
    //         // }
    //         // dispatch(editCollection(sendData, navigate));
    //         // } else {
    //         // dispatch(
    //         //     createCollection(
    //         //         { ...data, image: data.image[0], itemConfigs, userId },
    //         //         navigate
    //         //     )
    //         // );
    //     }
    // };

    return (
        <Box width='80%' m='120px auto 80px auto' className='create-collection'>
            {/* <Box
                component='form'
                display='flex'
                flexDirection='column'
                mx='auto'
                px={1}
                onSubmit={handleSubmit}> */}
            {/* <TextField
                    label={t('Title')}
                    margin='normal'
                    {...register('title', { required: true })}
                    error={!!errors.title}
                />
                <TextField
                    select
                    label={t('Theme')}
                    defaultValue={editable?.collection.themeId || ''}
                    margin='normal'
                    {...register('themeId', { required: true })}
                    error={!!errors.themeId}>
                    {themes.map((theme) => (
                        <MenuItem key={theme.id} value={theme.id}>
                            {theme.name}
                        </MenuItem>
                    ))}
                </TextField> */}
            {/* <Text variant='h6'>
                    If you want, add a picture of the collection
                </Text>
                <Box mx='auto'>
                    <ImageDrop
                        imageFile={imageFile}
                        inputProps={{ ...register('image') }}
                        clearFile={clearImage}
                        existingImageUrl={getValues().existingImage}
                    />
                </Box> */}
            {/* <Box mb={2}>
                    <MarkdownFormControl
                        control={control}
                        controlName='description'
                        label='Enter a description'
                    />
                </Box> */}
            {/* /* <FixedConfigInputs />
                <ConfigInputs
                    configInputs={configInputs}
                    setConfigInputs={setConfigInputs}
                    editable={editable}
                />
                {loading ? (
                    <Box ml='auto'>
                        <Spinner />
                    </Box>
                ) : (
                    <Box display='flex' justifyContent='space-between'>
                        <TransButton
                            variant='outlined'
                            color='inherit'
                            onClick={() => navigate(-1)}>
                            Cancel
                        </TransButton>
                        <TransButton type='submit' variant='outlined'>
                            Save
                        </TransButton>
                    </Box>
                )}
            </Box> */}
        </Box>
    );
};

export default CreateCollection;
