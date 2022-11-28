import { FC } from "react";

import InputProps from "../props/inputProps";
import StyledProps from "../props/styledProps";

interface InputTextProps extends InputProps<string | number>, StyledProps {
    minLength?: number;
    maxLength?: number;
}

const InputText: FC<InputTextProps> = ({ id, name, label, horizontal, placeholder, value, disabled, required, minLength, maxLength, inputClassName, inputRef, onChange, onInput, className }) => (
    <div className={className}>
        <div className={`flex ${horizontal ? 'items-center' : 'flex-col'} gap-1 w-full h-full`}>
            {label && <label htmlFor={id}>{label}</label>}
            <input className={`flex-1 w-full px-2 py-1 border-gray-100 border-2 rounded-r-sm transition-all focus:border-gray-300${inputClassName ? ' ' + inputClassName : ''}`}
                id={id}
                name={name}
                type="text" 
                autoComplete="off" 
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                ref={inputRef}
                onChange={onChange ? e => onChange(e.currentTarget.value) : undefined}
                onInput={onInput ? e => onInput(e.currentTarget.value) : undefined}
            />
        </div>
    </div>
);

export default InputText;