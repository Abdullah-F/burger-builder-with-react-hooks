import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/BuildControls/BuildControls"
import Modal from '../../UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
const INGREDIENTS_PRICES ={
    salad: 0.5,
    meat: 0.7,
    bacon: 2,
    cheese: 1.5,
}
class BurgerBuilder extends Component{

    state = {
        ingredients:{
            salad: 0,
            cheese: 0,
            bacon:0,
            meat:0,
        },
        totalPrice: 4,
        purchasing: false
    }

    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        updatedIngredients[type] = updatedCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0){
            const updatedCount = oldCount-1; 
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedCount;
            const priceSubtraction = INGREDIENTS_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceSubtraction;
            updatedIngredients[type] = updatedCount;
        
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });
        }

    }

    purchaseHandler =()=> {
        this.setState({purchasing: true})
    }

    cancelPurchaseHandler =()=> {
        this.setState({purchasing: false})
    }

    disabledInfo = ()=>{
        const info = {...this.state.ingredients}
        for(const key in info){
            info[key] = info[key] <= 0; 
        }
        return info;
    }

    purchaseable = ()=>{
        const mappedBooleans = this.disabledInfo();
        const booleans = Object.keys(mappedBooleans).map((key)=> mappedBooleans[key]);
        return booleans.find((b)=> !b) === undefined;
    }

    render(){
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                   ingredientRemoved={this.removeIngredientHandler}
                   disabledInfo={this.disabledInfo()}
                   totalPrice={this.state.totalPrice}
                   purchaseable={this.purchaseable()}
                   ordered={this.purchaseHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;