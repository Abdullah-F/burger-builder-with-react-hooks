import React from 'react'
import Classes from './Order.module.css';

const order=(props)=>{
    let ingredients =[];
    for(const ingre in props.ingredients){
        ingredients.push({name: ingre, amount: props.ingredients[ingre]})
    }
    ingredients = ingredients.map((ingre) => {
        return `${ingre.name} (${ingre.amount})`;
    }).join(' ');
    return (
        <div className={Classes.Order}>
            <p>ingredients: {ingredients}</p>
            <p>price: <strong>{props.price} USD</strong></p>
        </div>
    );
}

export default order;