import React from 'react'
import classes from './Button.module.css'

const Button = props => (
    <button 
        className={classes[props.btnType]}
        onClick={props.onClick}
        disabled={props.disabled}
    >
        {props.value}
    </button>
)

export default Button