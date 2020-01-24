import React from 'react'
import Classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
const controls = [
    {label:'Salad', type:'salad'},
    {label:'Meat', type:'meat'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
]
const buildControls = (props) =>{
    return(
        <div className={Classes.BuildControls}>
            {controls.map((ctrl)=>{
                return <BuildControl label={ctrl.label} key={ctrl.label}/>
            })}
        </div>
    );
}

export default buildControls;