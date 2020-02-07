import React from 'react';
import Classes from './Button.module.css';
const button =(props)=>(
  <button className={[Classes.Button, Classes[props.buttonType]].join(' ')}
  onClick={props.clicked}>{props.children}</button>
);

export default button;