import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import Classes from './Auth.module.css'
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index'
class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: ''
            }
        }
    }

    inputChangedHandler = (event, id) => {
        event.preventDefault();
        let updatedForm = { ...this.state.authForm };
        let updatedFormElement = { ...updatedForm[id] };
        updatedFormElement.value = event.target.value;
        updatedForm[id] = updatedFormElement;
        this.setState({ authForm: updatedForm })
    }

    submintHandler = (event) => {
        event.preventDefault()
        const email = this.state.authForm.email.value;
        const password = this.state.authForm.password.value;
        this.props.onAuth({email: email, password: password});
    }


    getForm() {
        let inputElements = [];
        for (let key in this.state.authForm) {
            inputElements.push({
                id: key,
                config: this.state.authForm[key]
            })
        }
        inputElements = inputElements.map((element) => {
            return <Input changed={(event) => this.inputChangedHandler(event, element.id)} elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value} key={element.id} />
        })
        let form = (
            <form >
                {inputElements}
                <Button buttonType='Success' clicked={this.submintHandler}>Submit</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }
        return form;
    }

    render() {
        console.log('[Auth Render] state :', this.state)
        return (
            <div className={Classes.Auth}>
                {this.getForm()}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: data => dispatch(actionCreators.auth(data))
    }
}
export default connect(null, mapDispatchToProps)(Auth);