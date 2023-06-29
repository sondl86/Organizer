import { useField } from 'formik';
import React from 'react'
import { Form, Label } from 'semantic-ui-react';
import DatePicker, {ReactDatePickerProps} from 'react-datepicker'

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

// Partial makes every single property optional
export default function MyDateInput(props : Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!);

    // !! make the object into a boolean, because it is a string or undefined, so we need to cast it into a Boolean
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker 
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />            
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null }
        </Form.Field>
    )
}