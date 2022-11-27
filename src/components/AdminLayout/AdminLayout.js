import React from 'react';
import './AdminLayout.scss';

const AdminLayout = (props) => {
    return (
        <div className="payments-layout">
            <div className="payments-layout__title">
                <h1>{props.name}</h1>
            </div>
            <div className="payments-layout__content">
                {props.children}
            </div>
        </div>
    );
};

export default AdminLayout;