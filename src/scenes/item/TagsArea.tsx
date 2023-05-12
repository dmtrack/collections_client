import { FC, useState } from 'react';
import { Autocomplete, TextField, UseAutocompleteProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TagType } from '../../models/IItem';
import { useAppSelector } from '../../hook/redux';
import { RootState } from '../../state';
import { toast } from 'react-toastify';
import { matchSorter } from 'match-sorter';

interface TagsAreaProps {
    value: TagType[];
    setValue: (tags: TagType[]) => void;
    freeSolo?: boolean;
    placeholder?: string;
}

export const TagsArea: FC<TagsAreaProps> = ({
    value,
    setValue,
    freeSolo = true,
    placeholder = 'tags',
}) => {
    const { t } = useTranslation();
    const tags = useAppSelector((state: RootState) => state.items.tags);
    const [inputValue, setInputValue] = useState('');
    type AutocompleteProps = UseAutocompleteProps<TagType, true, false, true>;

    const setValueHandler = (values: (string | TagType)[]) => {
        setValue(
            values.map((value) => {
                if (typeof value === 'string') {
                    const existingTag = tags.find((tag) => tag.name === value);
                    if (existingTag) return existingTag;
                    else return { name: value };
                } else {
                    return value;
                }
            })
        );
    };

    const tagsHandler: AutocompleteProps['onChange'] = (...args) => {
        const [_, values, reason, details] = args;
        if (
            reason !== 'removeOption' &&
            value.find((tag) => tag.name === getTagName(details?.option))
        ) {
            return toast('This tag already exists');
        }
        setValueHandler(values);
    };

    const inputHandler = (value: string) => {
        setInputValue(value);
    };

    const getTagName = (option?: string | TagType) => {
        if (!option) return '';
        return typeof option === 'string' ? option : option.name;
    };

    const filterOptions: AutocompleteProps['filterOptions'] = (
        options,
        { inputValue }
    ) => {
        return matchSorter(options, inputValue, { keys: ['name'] });
    };

    return (
        <Autocomplete
            disablePortal
            clearOnEscape
            freeSolo={freeSolo}
            noOptionsText={t('No tags found')}
            autoComplete
            multiple
            options={tags}
            size='small'
            value={value}
            onChange={tagsHandler}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => inputHandler(newInputValue)}
            getOptionLabel={getTagName}
            // isOptionEqualToValue={(option, value) => option.id === value.id}
            filterOptions={filterOptions}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField {...params} size='small' label={t(placeholder)} />
            )}
        />
    );
};
