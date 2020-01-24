import React from 'react'
import Classes from './Modal.module.css'
import Aux from '../../hoc/Aux'
import BackDrop from '../Backdrop/Backdrop'
const modal = (props) =>{
    console.log(props);
    return (
        <Aux>
            <BackDrop show={props.show} modalClosed={props.modalClosed}/>
            <div className={Classes.Modal}
            style={{
                transform: props.show? 'translateY(0)':'translateY(-100vh)',
                opacity: props.show? '1':'0'
            }}
            >
                {props.children}
            </div>
        </Aux>
    )
}

export default modal;