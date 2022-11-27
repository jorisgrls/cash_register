import React from 'react';
import "./CheckLayout.scss";

const CheckLayout = (props) => {
    return (
        <div className="check-layout">
            <div className="check-layout__title">
                <h1>{props.name}</h1>
            </div>
            <div className="check-layout__content">
                {props.children}
            </div>
        </div>
    );
};

export default CheckLayout;