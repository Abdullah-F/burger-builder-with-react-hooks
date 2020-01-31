import * as actionTypes from './actionTypes';

export const REMOVE_INGREDIENT= 'REMOVE_INGREDIENT'

export const addIngredient = (type)=>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: type,
    }
}

export const removeIngredient = (type)=>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: type,
    }
}