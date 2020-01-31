import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'
import {connect} from 'react-redux'

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        Axios.get('/ingredients.json')
            .then(response => this.setState({ ingredients: response.data }))
            .catch(error => error);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false })
    }

    continuePurchaseHandler = () => {
        var queryString = Object.keys(this.props.ingredients)
            .map(key => key + '=' + this.props.ingredients[key]).join('&');
        queryString = `${queryString}&price=${this.props.totalPrice}`
        this.props.history.push(`/checkout?${queryString}`);
    }

    disabledInfo = () => {
        const info = { ...this.props.ingredients }
        for (const key in info) {
            info[key] = info[key] <= 0;
        }
        return info;
    }

    purchaseable = () => {
        const mappedBooleans = this.disabledInfo();
        const booleans = Object.keys(mappedBooleans).map((key) => mappedBooleans[key]);
        return booleans.find((b) => !b) === undefined;
    }

    modalContent = () => {
        let content = (
            <OrderSummary ingredients={this.props.ingredients}
                cancel={this.cancelPurchaseHandler}
                continue={this.continuePurchaseHandler}
                price={this.props.totalPrice}></OrderSummary>
        )

        if (!this.props.ingredients) {
            content = null;
        }
        if (this.state.loading) {
            content = (<Spinner />)
        }
        return content;
    }

    burgerContent = () => {
        let content = <Spinner />;
        if (this.props.ingredients) {
            content = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}></Burger>
                    <BuildControls ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabledInfo={this.disabledInfo()}
                        totalPrice={this.props.totalPrice}
                        purchaseable={this.purchaseable()}
                        ordered={this.purchaseHandler} />
                </Aux>
            )
        }
        return content;
    }
    render() {
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
const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    }
}

const mapDispatchToProps =(dispatch)=>{
    return {
        onAddIngredient:(type) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientType:type}),
        onRemoveIngredient:(type) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientType:type}),
    }
}

export default WithErrorHandler(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), Axios);