import React from 'react'
import Classes from './BackDrop.module.css'
const backDrop = (props)=>{
    return (
        props.show? <div className={Classes.BackDrop}
         onClick={props.modalClosed}></div>:null
    );
}

export default backDrop;