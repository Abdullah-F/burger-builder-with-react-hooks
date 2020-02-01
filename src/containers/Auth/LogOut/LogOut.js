import React, { Component } from 'react'
import { Redirect } from 'react-router'
import {connect} from 'react-redux'
import * as actionCreators from '../../../store/actions/index'
class LogOut extends Component{
    
    componentDidMount(){
        this.props.onLogOut();
    }

    render(){
        return <Redirect to='/auth'/>;
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        onLogOut: () => dispatch(actionCreators.authLogOut()),
    }
}

export default connect(null, mapDispatchToProps)(LogOut);