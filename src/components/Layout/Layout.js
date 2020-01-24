import React from 'react'
import Aux from '../../hoc/Aux'
const Layout = (props) => (
    <Aux>
        <div>tool bar ....</div>
        <main>
            {props.children}
        </main>
    </Aux>
);