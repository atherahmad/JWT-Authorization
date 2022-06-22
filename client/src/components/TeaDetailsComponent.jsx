import React from 'react';
import "../components/styles/listItem.css";



export default function TeaDetailsComponent(props) {



  return (
    <div className='myListContainer'>

        <div className="test" ><p>{props.teaDetails.teaName}</p></div>
        <div className='image-box'>
        {/* <img  src='star.png'/> */} 
        <i className="fa fa-star my-image" style={{color:props.favorited ? "yellow": "" }}  onClick={props.updateFavorites} id={props.teaDetails.teaId}></i>

        </div>
    </div>
  )
}
