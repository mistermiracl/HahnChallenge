import { FC } from "react";

import StyledProps from "../props/styledProps";

interface InputText extends StyledProps {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    onInput?: (text: string) => void;
}

const InputText: FC<InputText> = ({ id, name, label, placeholder, onInput }) => {
    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input className="flex-1 px-2 border-gray-100 border-2 rounded-r-sm transition-all focus:border-gray-300"
                id={id}
                name={name}
                type="text" 
                autoComplete="off" 
                placeholder={placeholder}
                onInput={e => onInput ? onInput(e.currentTarget.value) : undefined}
            />
        </div>
    );
};

export default InputText;