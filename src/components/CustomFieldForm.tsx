import {
    MenuItem,
    TextField,
    Tooltip,
    Fab,
    Box,
    useMediaQuery,
    Button,
} from '@mui/material';
import React, { MouseEventHandler, useState } from 'react';
import { v4 } from 'uuid';
import { customFieldsTypes } from '../utils/constants';
import { useTranslation } from 'react-i18next';
import {
    ICustomFieldFormValuesWithId,
    SelectOption,
} from '../models/ICollection';
import { SetState } from '../models/global';
import ReactSelect from 'react-select';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import ControlPointSharpIcon from '@mui/icons-material/ControlPointSharp';
import EmptyContainer from './Common/EmptyContainer/EmptyContainer';

export interface IField {
    name: string;
    type: string;
}

interface ICustomFieldFormProps {
    fields: ICustomFieldFormValuesWithId[];
    setFields: SetState<ICustomFieldFormValuesWithId[]>;
    startFieldsIds: string;
}

const CustomFieldForm: React.FC<ICustomFieldFormProps> = ({
    fields,
    setFields,
    startFieldsIds,
}) => {
    const { t } = useTranslation('translation', { keyPrefix: 'collections' });
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const defaultCustomField: ICustomFieldFormValuesWithId = {
        id: v4(),
        type: '',
        label: '',
    };
    const customFieldTypesOptions: SelectOption[] = customFieldsTypes.map(
        (type) => ({
            value: type,
            label: `${t(type)}`,
        })
    );

    const getValueFromOption = (value: string) =>
        value
            ? customFieldTypesOptions.find((option) => option.value === value)
            : '';

    const addField = () => {
        setFields((prev) => [...prev, defaultCustomField]);
    };

    const removeField = (fieldId: string) => {
        setFields((prev) => prev.filter((field) => field.id !== fieldId));
    };

    const updateField = (key: string, value: string, id: string) => {
        setFields((prev) =>
            prev.map((field) =>
                field.id === id ? { ...field, [key]: value } : field
            )
        );
    };

    return (
        <Box display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='row' gap='12px'>
                {fields.length > 0 ? (
                    fields.map((field) => (
                        <Box
                            className='d-flex gap-2 align-items-center'
                            key={field.id}>
                            <TextField
                                sx={{ ml: '8px' }}
                                label={t('labelPlaceholder')}
                                margin='normal'
                                required
                                type='text'
                                value={field.label}
                                onChange={({ target }) =>
                                    updateField('label', target.value, field.id)
                                }
                            />

                            <ReactSelect
                                options={customFieldTypesOptions}
                                placeholder={t('typePlaceholder')}
                                onChange={(newValue) =>
                                    updateField(
                                        'type',
                                        (newValue as SelectOption).value,
                                        field.id
                                    )
                                }
                                value={getValueFromOption(field.type)}
                                className='react-select-container'
                                classNamePrefix='react-select'
                                isDisabled={startFieldsIds.includes(field.id)}
                            />
                            <Button type='button' onClick={addField}>
                                <ControlPointSharpIcon />
                            </Button>

                            <Button
                                type='button'
                                onClick={() => removeField(field.id)}>
                                <RemoveCircleSharpIcon />
                            </Button>
                        </Box>
                    ))
                ) : (
                    <EmptyContainer
                        title={t('emptyTitle')}
                        text={t('emptyText')}
                    />
                )}
            </Box>
        </Box>
    );
};

export default CustomFieldForm;
