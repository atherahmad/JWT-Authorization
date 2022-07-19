import React from 'react'
/***/

function ButtonComponent(props) {
    return (
        <button onClick={props.submitHandler} style={{margin:"10px", padding:"5px"}}>{props.title}</button>
    )
}

export default ButtonComponent