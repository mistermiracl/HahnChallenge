import { FC, ReactElement } from "react";

import StyledProps from "../props/styledProps";

interface SelectProps extends StyledProps {
    id?: string;
    name?: string;
    label?: string;
    value?: string | number;
    selectRef?: React.RefObject<HTMLSelectElement>;
    children: ReactElement<HTMLOptionElement> | ReactElement<HTMLOptionElement>[];
    onChange?: (value: string) => void;
}

const Select: FC<SelectProps> = ({ id, name, label, value, selectRef, onChange, children, className }) => (
    <div className={className}>
        <div className="flex flex-col w-full h-full">
            {label && <label htmlFor={id}>{label}</label>}
            <select id={id} name={name} ref={selectRef} className="px-2 py-1 border-gray-100 border-2 rounded-sm transition-all focus:border-gray-300"
                value={value}
                onChange={onChange ? e => onChange(e.currentTarget.value) : undefined}>
                {children}
            </select>
        </div>
    </div>  
);

export default Select;