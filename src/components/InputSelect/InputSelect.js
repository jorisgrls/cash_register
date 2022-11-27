import React from 'react';
import "./InputSelect.scss";

const InputSelect = (props) => {
    const handleOnChange = (e) => {
        props.onChange(e.target.value);
        
    }
    return (
        <div>
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 flex">
                {props.labelName}
            </label>
            <select id={props.id} name={props.id} value={props.value} onChange={handleOnChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                {props.options.map((option) => (
                    <option key={props.key} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default InputSelect;