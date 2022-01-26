import { ChangeEventHandler } from "react";

interface ITextField {
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    disabled?: boolean,
    placeholder: string
}
export const TextField = ({value, onChange, disabled = false, placeholder}: ITextField) => {
    return (
        <input
            type="text"
            className="transition-all w-2/3 outline outline-red-300 rounded-md p-3 shadow-md focus:scale-105 focus:outline-4 focus:outline-red-500"
            onChange={onChange}
            value = {value}
            disabled={disabled}
            placeholder={placeholder}
        />
    );
};
