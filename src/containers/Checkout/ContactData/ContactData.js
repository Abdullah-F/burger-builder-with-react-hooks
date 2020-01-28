import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import Classes from './ContactData.module.css'
import Axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends Component{
    
    state = {
        name: '',
        email:'',
        address:{

        },
        loading:false,

    }

    orderHandler = (event)=>{
        event.preventDefault();
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name:"Abdullah",
                address:{
                    street:"mdfjdhfdjhdf",
                    zipCode:"jdfhdjfhdjf",
                    country:"mkjdhjdhfjd"
                }
            },
            deliveryMethod: "fast"
        }
        this.setState({loading: true});
        Axios.post('/orders.json', order)
        .then(response=>{
            console.log(response);
            this.setState( { loading: false } );
            this.props.history.push("/")
        })
        .catch(errors=>{
            console.log(errors);
                this.setState( { loading: false} );
        });
    }


    getForm(){
        let form  = (
        <form>
            <input className={Classes.Input} type='text' name='name' placeholder='your name'/>
            <input className={Classes.Input} type='email' name='email' placeholder='your email'/>
            <input className={Classes.Input} type='text' name='street' placeholder='your street address'/>
            <input className={Classes.Input} type='text' name='postal code' placeholder='your postal code'/>
            <Button buttonType='Success' clicked={this.orderHandler}>Order</Button>
        </form>
        );

        if(this.state.loading){
            form = <Spinner/>
        }
        return form;
    }

    render(){
        console.log(this.props.ingredients)
        return (
        <div className={Classes.ContactData}>
            <h4>Enter Your Conact Date :</h4>
            {this.getForm()}
        </div>
        );
    }
}

export default ContactData;