interface InputProps<T extends string | number | boolean> {
    id?: string;
    name?: string;
    label?: string;
    horizontal?: boolean;
    placeholder?: string;
    value?: T;
    disabled?: boolean;
    required?: boolean;
    inputClassName?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
    onChange?: (value: T) => void;
    onInput?: (value: T) => void;
}

export default InputProps;