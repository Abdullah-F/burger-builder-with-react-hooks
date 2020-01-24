import React from 'react'
import Aux from '../../hoc/Aux'
import Classes from './Layout.module.css'
import ToolBar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
const Layout = (props) => (
    <Aux>
        <ToolBar/>
        <SideDrawer/>
        <main className={Classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default Layout;