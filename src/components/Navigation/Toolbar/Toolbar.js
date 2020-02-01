import React from 'react'
import Classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle'
const toolbar=(props)=>(
    <header className={Classes.Toolbar}>
        <div >
            <DrawerToggle clicked={props.menuButtonClicked}/>
        </div>
        <div className={Classes.Logo}>
            <Logo/>
        </div>
        <nav className={Classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated}></NavigationItems>
        </nav>
    </header>
)

export default toolbar;