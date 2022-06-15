import React, {useState} from 'react'
import ButtonComponent from './ButtonComponent'
import InputComponent from './InputComponent'

function SignupComponent() {

    const [userData, setUserData] = useState({});

    const changeHandler = (e) =>{
        console.log(e.target.name)
        setUserData((oldState)=>{
            return {
                ...oldState,[e.target.name]:e.target.value}})
    }

    const submitHandler = () =>{
        console.log(userData)

        fetch("http://localhost:5000/api/signup", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });


    }


    return (
        <div>
         
            <div>
                Name : <InputComponent type = "text" changeHandler={changeHandler} name={"fullName"}/>
            </div>

            <div>
                username : <InputComponent type = "text" changeHandler={changeHandler} name={"username"}/>
            </div>

            <div>
                password : <InputComponent type = "password" changeHandler={changeHandler} name={"password"}/>
            </div>
            <ButtonComponent title={"Signup"} submitHandler={submitHandler}/>
        </div>
    )
}

export default SignupComponent
