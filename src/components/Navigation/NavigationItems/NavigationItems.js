import React from 'react';
import Classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = ()=>(
    <ul className={Classes.NavigationItems}>
        <NavigationItem active > Burger Builder</NavigationItem>
        <NavigationItem> Checkout</NavigationItem>

    </ul>
)

export default navigationItems