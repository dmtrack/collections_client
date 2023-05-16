import { FC } from 'react';
import { Box, IconButton, MenuItem, TextField, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ItemConfigType } from '../../../state/models/ICollection.state';
import { ICollection } from '../../../models/ICollection';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';

interface ConfigInputsProps {
    configInputs: ItemConfigType[];
    setConfigInputs: (configs: ItemConfigType[]) => void;
    editable?: { collection: ICollection; itemConfigs: ItemConfigType[] };
}

export const ConfigInputs: FC<ConfigInputsProps> = ({
    configInputs,
    setConfigInputs,
    editable,
}) => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'items',
    });

    const configTypeHandler = (index: number, type: string) => {
        const newConfig = [...configInputs];
        const count =
            newConfig.filter((config) => config.type.includes(type)).length + 1;
        if (count > 3) {
            return toast.error(
                t(
                    'You have reached the maximum number of fields with this type'
                )
            );
        }
        newConfig[index].type = type + count;
        if (editable) newConfig[index].collectionId = editable.collection.id;
        setConfigInputs(newConfig);
    };

    const configLabelHandler = (index: number, label: string) => {
        const newConfig = [...configInputs];
        newConfig[index].label = label;
        setConfigInputs(newConfig);
    };

    const addConfigInput = () => {
        setConfigInputs([...configInputs, { type: '', label: '' }]);
    };

    const removeConfigInput = (index: number) => {
        if (editable && configInputs[index].id !== undefined) {
            if (window.confirm(t('deleteFieldWarning'))) {
                setConfigInputs(configInputs.filter((_, i) => i !== index));
            }
        } else setConfigInputs(configInputs.filter((_, i) => i !== index));
    };

    const toggleVisible = (index: number) => {
        const newConfig = [...configInputs];
        newConfig[index].hidden = !newConfig[index].hidden;
        setConfigInputs(newConfig);
    };

    const getInputActions = (config: ItemConfigType, index: number) => (
        <>
            <IconButton color='error' onClick={() => removeConfigInput(index)}>
                <RemoveIcon className='red' />
            </IconButton>
            {config.hidden ? (
                <Tooltip title={t('showField')}>
                    <IconButton onClick={() => toggleVisible(index)}>
                        <VisibilityOffIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title={t('hideField')}>
                    <IconButton onClick={() => toggleVisible(index)}>
                        <VisibilityIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
            )}
        </>
    );

    return (
        <>
            {configInputs.map((config, index) => (
                <Box display='flex' my={1} key={index}>
                    <TextField
                        sx={{ mr: 2 }}
                        select
                        label={t('type')}
                        fullWidth
                        value={config.type.slice(0, -1)}
                        onChange={(e) =>
                            configTypeHandler(index, e.target.value)
                        }>
                        <MenuItem value='str'>{t('string')}</MenuItem>
                        <MenuItem value='txt'>markdown</MenuItem>
                        <MenuItem value='numb'>{t('number')}</MenuItem>
                        <MenuItem value='bool'>{t('checkbox')}</MenuItem>
                        <MenuItem value='date'>{t('date')}</MenuItem>
                    </TextField>
                    <TextField
                        label={t('label')}
                        fullWidth
                        value={config.label}
                        onChange={(e) =>
                            configLabelHandler(index, e.target.value)
                        }
                        InputProps={{
                            endAdornment: getInputActions(config, index),
                        }}
                    />
                </Box>
            ))}
            <IconButton className='w-min pulse' onClick={addConfigInput}>
                <AddIcon className='blue' />
            </IconButton>
        </>
    );
};
