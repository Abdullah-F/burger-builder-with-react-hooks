import React from 'react'
import Classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
const toolbar=()=>(
    <header className={Classes.Toolbar}>
        <div>MENU</div>
        <div className={Classes.Logo}>
            <Logo/>
        </div>
        <nav>
            <NavigationItems></NavigationItems>
        </nav>
    </header>
)

export default toolbar;