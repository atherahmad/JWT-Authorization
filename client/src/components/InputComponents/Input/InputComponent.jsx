import React from 'react'

function InputComponent(props) {
    return (
        <input onChange={props.changeHandler} type={props.type} style={{margin:"10px"}} name={props.name}/>
    )
}

export default InputComponent
