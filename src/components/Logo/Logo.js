import React from 'react';
import burgerLogo from '../../assests/images/burger-logo.png';
import Classes from './Logo.module.css';
const logo=()=>{
    return (
        <div className={Classes.Logo}>
            <img src={burgerLogo} alt="MyBurger"/>
        </div>
    )
}

export default logo;