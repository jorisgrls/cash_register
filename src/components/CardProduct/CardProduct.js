import React from 'react';

const CardProduct = (props) => {
    // on a besoin du nom et du prix
    return (
        <div id={props.id} onClick={props.onClick} className="flex flex-col justify-center items-center py-2 border-solid border-2 border-grey-600 w-3/12 rounded-md mt-2">
            <h2 className="font-medium">{props.name}</h2>
            <p>{props.price}€</p>
        </div>
    );
};

export default CardProduct;