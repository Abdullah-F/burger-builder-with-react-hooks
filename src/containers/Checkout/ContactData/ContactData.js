import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import Classes from './ContactData.module.css'
import Axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component{
    
    state = {
        orderForm: {
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'email'
                },
                value:'hdhdhd@some.com'
            },
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'Abdullah Fadhel'
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'Faisal street'
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'54545'
                },
                value:'zip code'
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'Yemen'
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:"fastest", displayValue:"Fastest"},
                        {value:"cheapest", displayValue:"Cheapest"},                    ]
                },
                value:'Abdullah Fadhel'
            },
        }

    }

    orderHandler = (event)=>{
        event.preventDefault();
        const formData ={};
        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            orderData:formData,
            ingredients: this.props.ingredients,
            price: this.props.price,    
        }
        this.setState({loading: true});
        Axios.post('/orders.json', order)
        .then(response=>{
            this.setState( { loading: false } );
            this.props.history.push("/")
        })
        .catch(errors=>{
                this.setState( { loading: false} );
        });
    }


    getForm(){
        let inputElements = [];
        for(let key in this.state.orderForm){
            inputElements.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        inputElements = inputElements.map((element)=>{
            return <Input changed={(event)=>this.inputChangedHandler(event, element.id)} elementType={element.config.elementType}
            elementConfig={element.config.elementConfig} 
            value={element.config.value} key={element.id}/>
        })
        let form  = (
        <form >
            {inputElements}
            <Button buttonType='Success' clicked={this.orderHandler}>Order</Button>
        </form>
        );

        if(this.state.loading){
            form = <Spinner/>
        }
        return form;
    }

    inputChangedHandler = (event, id)=>{
        event.preventDefault();
        let updatedForm = {...this.state.orderForm};
        let updatedFormElement={...updatedForm[id]};
        updatedFormElement.value = event.target.value;
        updatedForm[id] = updatedFormElement;
        this.setState({orderForm: updatedForm})
    }
    render(){
        return (
        <div className={Classes.ContactData}>
            <h4>Enter Your Conact Date :</h4>
            {this.getForm()}
        </div>
        );
    }
}

export default ContactData;