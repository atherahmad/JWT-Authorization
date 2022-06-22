import React, {useState,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import ButtonComponent from './ButtonComponent'
import InputComponent from './InputComponent'

function SignupComponent() {

    const [userData, setUserData] = useState({});
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false)
    const [err, setError] = useState("")

    useEffect(()=>{
        setAuthorized(userContext[0].authorized)
        if(authorized) navigate("/")
    }, [authorized])

    const changeHandler = (e) =>{
        setUserData((oldState)=>{
            return {
                ...oldState,[e.target.name]:e.target.value}})
    }

    const submitHandler = () =>{

        fetch("/api/signup", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response=>{
    if(response.ok) navigate("/signin")
    else throw new Error(response.statusText)
    })
    .catch(err=>setError(err))


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
