import React, {useContext, useState, useEffect} from 'react'
import { Outlet, Link } from "react-router-dom";
import UserContext from '../context/userContext';
import ButtonComponent from './ButtonComponent';


function LayoutComponent() {

  const [user, setUnauthenticated,...rest] = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [authorized, setAuthorized] = useState(false)

  const userContext = useContext(UserContext);

  useEffect(()=>{
      setAuthorized(userContext[0].authorized);
      setUserName(userContext[0].userName)
      console.log("layout", user)
  })

  const signoutHandler = ( ) => {
    setUnauthenticated()
    localStorage.removeItem("accessToken")}

    return (
       <>
    <h2> Authentication and Authorization </h2>
    <h3>It is home for famous teas</h3>

        <nav>
        <ul style={{display:'flex', justifyContent:"space-between", alignItems:"center", listStyle:"none", marginRight:"50px", marginLeft:"50px"}}>
          {authorized?<li>
            <h3>Welcome {userName} !</h3>
          </li>
          :null}                   
          <li>
            <Link to="/">Home</Link>
          </li>
          {!authorized?<li>
            <Link to="/signup">Signup</Link>
          </li>
          :<li>
            <Link to="/myfavorites">My Favorite Teas</Link>
            </li>}
          {!authorized?<li>
            <Link to="/signin">Signin</Link>
          </li>
          :null}
          <li>
            <Link to="/tealist">Famous Teas</Link>
          </li>
          {authorized?<li>
            <ButtonComponent title={"Sign out"} submitHandler={signoutHandler}/>
          </li>
          :null}
        </ul>  
        </nav>
        <Outlet />
       </> 
    )
}

export default LayoutComponent
