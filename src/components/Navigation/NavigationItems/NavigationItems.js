import React from 'react';
import Classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = (props) => (
    <ul className={Classes.NavigationItems}>
        <NavigationItem link="/"> Burger Builder</NavigationItem>
        {props.isAuthenticated?<NavigationItem link="/orders"> Orders</NavigationItem>:null}
        {
            props.isAuthenticated? <NavigationItem link="/logout"> LOG OUT</NavigationItem>
             : <NavigationItem link="/auth"> SIGN IN</NavigationItem>
        }
    </ul>
)

export default navigationItems