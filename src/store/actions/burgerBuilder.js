import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'

export const addIngredient = (type) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: type,
    }
}

export const removeIngredient = (type) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: type,
    }
}

export const storeIngredients = (ingredients) => {
    return {
        type: actionTypes.STORE_INGREDIENTS,
        ingredients: ingredients,
    }
}

export const fetchIngredients = () => {
    return (dispatch) => {
        Axios.get('/ingredients.json')
            .then(response => dispatch(storeIngredients(response.data)))
            .catch(error => error);
    }
}

export const building =()=>{
    return {
        type: actionTypes.BUILDING,
    }
}