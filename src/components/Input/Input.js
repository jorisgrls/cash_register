import React from 'react';
import "./Input.scss";

const Input = (props) => {
    const handleOnChange = (e) => {
        props.onChange(e.target.value);
    }
    return (
        <div>
            <label for={props.id} className="block text-sm font-medium text-gray-700 flex">{props.labelName}</label>
            <div class="mt-1">
                <input type={props.type} name={props.id} id={props.id} onChange={handleOnChange} value={props.value} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder={props.placeholder} disabled={props.disabled}/>
            </div>
        </div>


    );
};

export default Input;