import React, {useState, useEffect} from "react";

function Product ({key, sku, name, price}) {
    return (
        <div key={key} id={sku} className="product">
            <h3>{name}</h3>
            <p>${price}</p>
        </div>
    );
}

export default Product;