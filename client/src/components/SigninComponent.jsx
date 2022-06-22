import React, {useState,useEffect} from 'react'
import { useContext } from 'react';
import UserContext from '../context/userContext';
import ButtonComponent from './ButtonComponent'
import InputComponent from './InputComponent'
import { Navigate } from 'react-router-dom'

function SigninComponent() {

    const [userData, setUserData] = useState({});
    const userContext = useContext(UserContext);
    console.log(userContext)

    useEffect(()=>{
        if(userContext[0].authorized) <Navigate to="/" />
    }, [])

    const changeHandler = (e) =>{
        console.log(e.target.name)
        setUserData((oldState)=>{
            return {
                ...oldState,[e.target.name]:e.target.value}})
    }

    const submitHandler = () =>{
        console.log(userData)

        fetch("http://localhost:5000/api/signin", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response=>{
    if(response.ok)return response.json()
    throw new Error(response.statusText)

    })
    .then(data=>localStorage.setItem("accessToken", data.accessToken))
    .catch(err=>console.log(err))


    }

    return (
        <div>
            <div>
                username : <InputComponent type="text" changeHandler={changeHandler} name={"username"}/>
            </div>

            <div>
                password : <InputComponent type="password" changeHandler={changeHandler} name={"password"} />
            </div>

            <ButtonComponent title={"Signin"} submitHandler={submitHandler} />
        </div>
    )
}

export default SigninComponent