// import { FC, useEffect, useState } from "react"
// import { ItemField } from "./ItemField"
// import { Box, TextField } from "@mui/material"
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
// import { useAppDispatch } from "../../store/store"
// import { createItem, editItem } from "../../store/actions/itemActions"
// import { useCollection } from "../../hooks/collectionStateHook"
// import { TagsArea } from "./TagsArea"
// import { Text } from "../../common/Text"
// import { TransButton } from "../../common/TransButton"
// import { useTranslation } from "react-i18next"
// import { BlurDialog } from "../../common/BlurDialog"
// import { Fields, Item, Tag } from "../../../../common/types/item"

// interface EditItemDialogProps {
//   open: boolean
//   onClose: () => void
//   collectionId: number
//   item?: Item
// }

// export const EditItemDialog: FC<EditItemDialogProps> = ({ open, onClose, collectionId, item }) => {
//   const { t } = useTranslation()
//   const dispatch = useAppDispatch()
//   const { register, handleSubmit, formState: { errors }, control, setValue, reset } = useForm<FieldValues>({})
//   const itemConfigs = useCollection().itemConfigs.filter(config => !config.hidden)
//   const [addedTags, setAddedTags] = useState<Tag[]>([])

//   useEffect(() => {
//     if (item) {
//       Object.entries(item).forEach(([key, value]) => setValue(key, value))
//       setAddedTags(item.tags)
//     }
//   }, [item, setValue])

//   const closeHandler = () => {
//     reset()
//     setAddedTags([])
//     onClose()
//   }

//   const submitHandler: SubmitHandler<FieldValues> = (data) => {
//     if (item) {
//       dispatch(editItem({ ...data, tags: addedTags } as Item))
//     } else {
//       dispatch(createItem({ collectionId, fields: { ...data } as Fields, tags: addedTags }))
//     }
//     closeHandler()
//   }

//   return (
//     <BlurDialog open={open} fullWidth onClose={closeHandler}>
//       <Box component="form" px={3} py={1} onSubmit={handleSubmit(submitHandler)} minHeight={400}
//            display="flex" flexDirection="column" justifyContent="space-between">
//         <Box>

//           <Text variant="h5">{item ? 'Edit' : 'Create'} item</Text>
//           <TextField label={t("title")} size="small" margin="dense" fullWidth
//                      {...register('name', { required: true })}
//                      error={!!errors.name}/>
//           <Box my={1}>
//             <TagsArea value={addedTags} setValue={setAddedTags}/>
//           </Box>

//           {itemConfigs.map(config => {
//               const required = config.type.slice(0, -1) !== 'bool'
//               return (
//                 <div key={config.id}>
//                   <ItemField type={config.type} label={config.label} control={control} required={required}/>
//                 </div>
//               )
//             }
//           )}
//         </Box>
//         <Box display="flex" justifyContent="space-between">
//           <TransButton onClick={closeHandler} color="inherit">Cancel</TransButton>
//           <TransButton type="submit">Save</TransButton>
//         </Box>
//       </Box>
//     </BlurDialog>
//   )
// }

export {};
