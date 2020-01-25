import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'
class OrderSummary extends Component{

    render(){
        let ingredientsSummary = this.props.ingredients;
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
                <p><strong>Total Price is: {this.props.price}</strong></p>
                <Button clicked={this.props.cancel} buttonType="Danger" >CANCEL</Button>
                <Button clicked={this.props.continue} buttonType="Success">CONTINUE</Button>
            </Aux>
        );
    }
}
export default OrderSummary;