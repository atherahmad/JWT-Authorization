import React from 'react'
import { Outlet, Link } from "react-router-dom";


function LayoutComponent() {
    return (
       <>
    <h2> Authentication and Authorization </h2>

        <nav>
        <ul style={{display:'flex', justifyContent:"space-between", alignItems:"center", listStyle:"none", marginRight:"50px", marginLeft:"50px"}}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/signin">Signin</Link>
          </li>
          <li>
            <Link to="/tealist">Famous Teas</Link>
          </li>
        </ul>  
        </nav>
        <Outlet />
       </> 
    )
}

export default LayoutComponent
