import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Classes from './Layout.module.css'
import ToolBar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'


class Layout extends Component{
    
    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer: false})
    }

    sideDrawerOpenHandler =()=>{
        this.setState({showSideDrawer: true})
    }
    render(){
        return (
            <Aux>
                <ToolBar menuButtonClicked={this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
       );
    }
}

export default Layout;