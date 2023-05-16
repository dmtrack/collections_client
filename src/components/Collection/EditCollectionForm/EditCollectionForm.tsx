import { FC, useEffect, useState } from 'react'
import { ICollectionFormValues, ITheme } from '../../../models/ICollection'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../../hook/redux'
import { useNavigate } from 'react-router-dom'
import { Box, MenuItem, TextField, useTheme } from '@mui/material'
import { MarkdownFormControl } from '../../Markdown/MarkdownFormControl'
import DragAndDrop from '../../DragAndDrop/DragAndDrop'
import { fileTypes } from '../../../utils/constants'
import { FixedConfigInputs } from '../ConfigInputs/FixedConfigInputs'
import { ConfigInputs } from '../ConfigInputs/ConfigInputs'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { shades } from '../../../theme'

interface EditCollectionFormProps {
  onSubmit: (data: ICollectionFormValues) => void
  editable?: ICollectionFormValues
}

export const EditCollectionForm: FC<EditCollectionFormProps> = ({ onSubmit, editable }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'collections' })
  const navigate = useNavigate()
  const theme = useTheme()
  const colors = shades(theme.palette.mode)

  const [image, setImage] = useState<File | null>(null)
  const {
    register,
    handleSubmit,
    control,
    setFocus,
    setValue,
    formState: { errors },
    watch,
    reset
  } = useForm<ICollectionFormValues>({ defaultValues: { itemConfigs: [{ type: '', label: '' }] } })
  const themes = useAppSelector((state) => state.collections.themes)

  useEffect(() => {
    setFocus('name')
    if (editable) {
      const { description, name, themeId, itemConfigs } = editable
      console.log({ description, name, themeId, itemConfigs })
      reset({ description, name, themeId, itemConfigs })
    }
  }, [editable, navigate, reset, setFocus])

  const submitHandler = handleSubmit((data) => {
    onSubmit(data)
  })

  const handleSetImage = (image: File) => {
    setImage(image)
  }

  return (
    <Box component="form" display="flex" flexDirection="column" gap="12px" px={1} onSubmit={submitHandler}>
      <TextField
        select
        label={t('theme')}
        defaultValue={editable?.themeId || ''}
        margin="normal"
        {...register('themeId', { required: true })}
        error={!!errors.themeId}
        sx={{ mb: '0px' }}>
        {themes.map((theme: ITheme) => (
          <MenuItem
            key={theme.id}
            value={Number(theme.id)}>
            {theme.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField label={t('name')} margin="normal"{...register('name', { required: true })} error={!!errors.name}/>

      <Box mb="8px">
        <MarkdownFormControl control={control} controlName="description" label=""/>
      </Box>

      <Box>
        <DragAndDrop
          chooseFile={(file: File) => handleSetImage(file)}
          fileTypes={fileTypes}
          isDisabled
          hoverTitle={t('Drop here')}
          name="image"
          caption={image ? 'collections.file' : 'collections.noFile'}
        />
      </Box>

      <FixedConfigInputs/>
      <ConfigInputs configInputs={watch('itemConfigs')} setConfigInputs={configs => setValue('itemConfigs', configs)}/>

      <Box alignSelf="start">
        <Stack spacing={2} direction="row">
          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{ backgroundColor: `${colors.secondary[800]}` }}
          >
            {t('save')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{ backgroundColor: `${colors.secondary[800]}` }}
          >
            {t('cancel')}
          </Button>{' '}
        </Stack>
      </Box>
    </Box>
  )
}
