import { FC } from "react";

import InputProps from "../props/inputProps";
import StyledProps from "../props/styledProps";

interface InputNumberProps extends InputProps<number>, StyledProps {
    min?: number;
    max?: number;
    value?: number;
}

const InputNumber: FC<InputNumberProps> = ({ id, name, label, placeholder, value, min, max, disabled, required, inputRef, onChange, onInput, className }) => (
    <div className={className}>
        <div className="flex flex-col w-full h-full">
            {label && <label htmlFor={id}>{label}</label>}
            <input className="flex-1 w-full px-2 py-1 border-gray-100 border-2 rounded-r-sm transition-all focus:border-gray-300"
                id={id}
                name={name}
                type="number" 
                autoComplete="off" 
                placeholder={placeholder}
                min={min}
                max={max}
                value={value}
                disabled={disabled}
                required={required}
                ref={inputRef}
                onChange={onChange ? e => onChange(parseInt(e.currentTarget.value)) : undefined}
                onInput={onInput ? e => onInput(parseInt(e.currentTarget.value)) : undefined}
            />
        </div>
    </div>
);

export default InputNumber;