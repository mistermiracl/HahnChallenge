import { FC } from "react";

import StyledProps from "../props/styledProps";

interface InputText extends StyledProps {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    onInput?: (text: string) => void;
}

const InputText: FC<InputText> = ({ id, name, label, placeholder, onInput, className }) => {
    return (
        <div className={className}>
            <div className="flex flex-col w-full h-full">
                {label && <label htmlFor={id}>{label}</label>}
                <input className="flex-1 w-full px-2 border-gray-100 border-2 rounded-r-sm transition-all focus:border-gray-300"
                    id={id}
                    name={name}
                    type="text" 
                    autoComplete="off" 
                    placeholder={placeholder}
                    onInput={e => onInput ? onInput(e.currentTarget.value) : undefined}
                />
            </div>
        </div>
    );
};

export default InputText;