import React from 'react'
import Aux from '../../hoc/Aux'
const orderSummary = (props) =>{
    let ingredientsSummary = props.ingredients;
    ingredientsSummary = Object.keys(ingredientsSummary).map(
        (ingre,i) => {
            return (
            <li key={ingre+ i}>
                <span style={{textTransform: 'capitalize'}}>{ingre}</span>
                 : {ingredientsSummary[ingre]}
            </li>
            )
        }
    );
    return (
        <Aux>
            <h3>Your Order summary</h3>
            <p>A delecious order with the following ingredients : </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout ?</p>
        </Aux>
    );
}

export default orderSummary;