import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import Classes from './ContactData.module.css'
class ContactData extends Component{
    
    state = {
        name: '',
        email:'',
        address:{

        }
    }
    render(){
        return (
        <div className={Classes.ContactData}>
            <h4>Enter Your Conact Date :</h4>
            <form>
                <input className={Classes.Input} type='text' name='name' placeholder='your name'/>
                <input className={Classes.Input} type='email' name='email' placeholder='your email'/>
                <input className={Classes.Input} type='text' name='street' placeholder='your street address'/>
                <input className={Classes.Input} type='text' name='postal code' placeholder='your postal code'/>
                <Button buttonType='Success'>Order</Button>
            </form>
        </div>
        );
    }
}

export default ContactData;