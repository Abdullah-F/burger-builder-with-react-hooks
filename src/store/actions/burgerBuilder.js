import * as actionTypes from './actionTypes';

export const addIngredient = (type) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: type,
    };
}

export const removeIngredient = (type) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: type,
    };
}

export const storeIngredients = (ingredients) => {
    return {
        type: actionTypes.STORE_INGREDIENTS,
        ingredients: ingredients,
    };
}

export const fetchIngredients = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS
    };
}

export const building =()=>{
    return {
        type: actionTypes.BUILDING,
    };
}