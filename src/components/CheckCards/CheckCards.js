import React from 'react';
import CheckLayout from '../CheckLayout/CheckLayout';
import "./CheckCards.scss";

const CheckCards = (props) => {
    return (
        <div className={props.className}>
            <div class="bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <CheckLayout name={props.name}>
                        {props.children}
                    </CheckLayout>
                </div>
            </div>
        </div>
    );
};

export default CheckCards;