import React from 'react'
import Burger from '../../Burger/Burger'
import Classes from './CheckoutSummary.module.css'
import Button from '../../UI/Button/Button'
const checkoutSummary = (props)=>{
    return (
        <div className={Classes.CheckoutSummary}>
            <h1>we hope you will like the taste of our burger</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
                <Button buttonType='Danger' clicked>CANCEL</Button>
                <Button buttonType='Success' clicked>CANCEL</Button>
            </div>
        </div>
    )
}

export default checkoutSummary;