import React from 'react';
import Classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label:'Salad', type:'salad'},
    {label:'Meat', type:'meat'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
];
const buildControls = (props) =>{

    return(
        <div className={Classes.BuildControls}>
            <p>Current Price is: <strong>{props.totalPrice}</strong></p>
            {controls.map((ctrl)=>{
                return <BuildControl added={()=>props.ingredientAdded(ctrl.type)}
                        removed={()=>props.ingredientRemoved(ctrl.type)}
                        label={ctrl.label} key={ctrl.label}
                        disabled={props.disabledInfo[ctrl.type]}/>
            })}
            <button className={Classes.OrderButton}
                   disabled={props.purchaseable}
                   onClick={props.ordered}>{props.isAuthenticated? 'ORDER NOW': 'SIGNUP TO ORDER'}</button>
        </div>
    );
}

export default buildControls;