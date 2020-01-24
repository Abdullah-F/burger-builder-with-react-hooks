import React from 'react'
import Classes from './BurgerIngredient.module.css'


const burgerIngredient = (props) =>{
    const ingredient = null;

    switch(props.type){
        case('bread-bottom'):
          ingredient = <div className={Classes.BreadBottom}></div>;
          break;
        case('bread-top'):
          ingredient = (
              <div className={Classes.BreadTop}></div>
              <div className={Classes.Seeds1}></div>
              <div className={Classes.Seeds2}></div>
          );
          break;
        case('meat'):
          ingredient = <div className={Classes.Meat}></div>;
          break;
        case('cheese'):
          ingredient = <div className={Classes.Cheese}></div>;
          break;
        case('salad'):
          ingredient = <div className={Classes.Salad}></div>;
          break;
        case('Bacon'):
          ingredient = <div className={Classes.Meat}></div>;
          break;
        default:
            ingredient = null;
    }
    return ingredient;
}

export default burgerIngredient;