import React from 'react'
import Aux from '../../hoc/Aux'
import Button from '../../UI/Button/Button'
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
            <p><strong>Total Price is: {props.price}</strong></p>
            <Button clicked={props.cancel} buttonType="Danger" >CANCEL</Button>
            <Button clicked={props.continue} buttonType="Success">CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;