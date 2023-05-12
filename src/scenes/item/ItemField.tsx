import { FC } from 'react';
import {
    Box,
    Checkbox,
    TextField,
    TextFieldProps,
    Typography,
} from '@mui/material';
import { Control, Controller, RefCallBack } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/ru';
import { useApp } from '../../hook/appState';
import { MarkdownFormControl } from '../../components/Markdown/MarkdownFormControl';

interface ItemFieldProps {
    type: string;
    label: string;
    control: Control<any>;
    required?: boolean;
}

export const ItemField: FC<ItemFieldProps> = ({
    type,
    label,
    control,
    required = true,
}) => {
    const sliceType = type.slice(0, -1);
    if (sliceType === 'txt') {
        return (
            <Box mb={0.7}>
                <MarkdownFormControl
                    control={control}
                    controlName={type}
                    label={label}
                />
            </Box>
        );
    }
    return (
        <Controller
            name={type}
            control={control}
            rules={{ required }}
            render={({
                field: { onChange, ref, onBlur, value },
                formState: { errors },
            }) => (
                <Field
                    field={{
                        onBlur,
                        onChange,
                        inputRef: ref,
                        defaultValue: value,
                    }}
                    textFieldConfig={{
                        label,
                        error: !!errors[type],
                        size: 'small',
                        margin: 'dense',
                        fullWidth: true,
                    }}
                    sliceType={sliceType}
                />
            )}
        />
    );
};

type FieldPropsType = {
    field: {
        onBlur: () => void;
        onChange: () => void;
        inputRef: RefCallBack;
        defaultValue: any;
    };
    sliceType: string;
    textFieldConfig: TextFieldProps;
};

const Field = (props: FieldPropsType) => {
    const { field, sliceType, textFieldConfig } = props;
    switch (sliceType) {
        case 'str':
            return <TextField {...field} {...textFieldConfig} />;
        case 'date':
            return <DateInput {...props} />;
        case 'numb':
            return <TextField {...field} type='number' {...textFieldConfig} />;
        case 'bool':
            return <CheckboxInput {...props} />;
        default:
            return <></>;
    }
};

const DateInput = (props: FieldPropsType) => {
    const lang = useApp().lang;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang}>
            <DatePicker
                {...props.field}
                label={props.textFieldConfig.label}
                value={props.field.defaultValue || null}
                // renderInput={(params) => (
                //     <TextField
                //         {...params}
                //         {...props.textFieldConfig}
                //         error={params.error || props.textFieldConfig.error}
                //     />
                // )}
            />
        </LocalizationProvider>
    );
};

const CheckboxInput = (props: FieldPropsType) => {
    return (
        <Box display='flex' className='flex'>
            <Typography alignSelf='center'>
                {props.textFieldConfig.label}
            </Typography>
            <Checkbox {...props.field} checked={!!props.field.defaultValue} />
        </Box>
    );
};
