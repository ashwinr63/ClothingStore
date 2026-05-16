import { Input, FormInputLabel, Group } from './form-input.styles.jsx'

const FormInput = ({ label, ...otherProps }) => {
    const shouldShrink = Boolean(otherProps.value && otherProps.value.length);

    return (
        <Group>
            <Input
                {...otherProps} />
            {label && (
                <FormInputLabel shrink={shouldShrink}>{label}</FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput