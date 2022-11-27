import React from 'react';
import "./InputNoLabel.scss";

const InputNoLabel = (props) => {
    const handleOnChange = (e) => {
        props.onChange(e.target.value);
    }
    return ( 
        <div>
            <input type={props.type} name={props.id} id={props.id} onChange={handleOnChange} value={props.value} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder={props.placeholder}/>
        </div>
    );
};

export default InputNoLabel;