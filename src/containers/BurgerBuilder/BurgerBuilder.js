import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
const INGREDIENTS_PRICES ={
    salad: 0.5,
    meat: 0.7,
    bacon: 2,
    cheese: 1.5,
}
class BurgerBuilder extends Component{

    state = {
        ingredients:null,
        totalPrice: 4,
        purchasing: false,
        loading: false
    }

    componentDidMount(){
        Axios.get('/ingredients.json')
             .then(response=> this.setState({ingredients: response.data}))
             .catch(error=>error);
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

    continuePurchaseHandler=()=>{
        var queryString = Object.keys(this.state.ingredients)
            .map(key => key + '=' + this.state.ingredients[key]).join('&');
        queryString = `${queryString}&price=${this.state.totalPrice}`
        this.props.history.push(`/checkout?${queryString}`);
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
    
    modalContent=()=>{
        let content =(
            <OrderSummary ingredients={this.state.ingredients}
            cancel={this.cancelPurchaseHandler}
            continue={this.continuePurchaseHandler}
            price={this.state.totalPrice}></OrderSummary>
        )

        if(!this.state.ingredients){
            content =null;
        }
        if(this.state.loading){
            content = (<Spinner/>)
        }
        return content;
    }

    burgerContent= ()=>{
        let content = <Spinner/>;
        if(this.state.ingredients){
            content = (
                <Aux>
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
        return content;
    }
    render(){
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                  {this.modalContent()}
                </Modal>
                {this.burgerContent()}
            </Aux>
        )
    }
}

export default WithErrorHandler(BurgerBuilder, Axios);