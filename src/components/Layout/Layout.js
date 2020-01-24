import React from 'react'
import Aux from '../../hoc/Aux'
import Classes from './Layout.module.css'
const Layout = (props) => (
    <Aux>
        <div>tool bar ....</div>
        <main className={Classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default Layout;