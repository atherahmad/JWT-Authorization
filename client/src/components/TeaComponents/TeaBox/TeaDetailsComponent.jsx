import React from 'react';
import { Link } from 'react-router-dom';
import "./listItem.css";




export default function TeaDetailsComponent(props) {



  return (
    <div className='myListContainer' style={{position:"relative" }}>

        <div className="test" >
          <Link style={{padding:"10px", cursor:"pointer",
                      margin: "1rem",
                      textDecoration: "none",
                      color: 'black',

          }} 
             to = {`/teadetails/${props.teaDetails.teaId}`}>
             
             {props.teaDetails.teaName}
             </Link>
        </div>
        
        <div className='image-box'>

        <i className="fa fa-star my-image" 
          style={{color:props.favorited ? "yellow": "" , position:"absolute", right:10, top:5, cursor:"pointer"}}  
          onClick={props.updateFavorites} 
          id={props.teaDetails.teaId}>

          </i>

        </div>
    </div>
  )
}
