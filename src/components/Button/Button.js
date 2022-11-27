import React from 'react';
import "./Button.scss";

const Button = (props) => {
    return (
        <>
            <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={props.onClick}>{props.value}</button>
        </>
         );
};

export default Button;