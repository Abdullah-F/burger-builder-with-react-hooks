import React from 'react';
import Classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = ()=>(
    <ul className={Classes.NavigationItems}>
        <NavigationItem link="/"> Burger Builder</NavigationItem>
        <NavigationItem link="/orders"> Orders</NavigationItem>
        <NavigationItem link="/auth"> SIGN IN</NavigationItem>
    </ul>
)

export default navigationItems