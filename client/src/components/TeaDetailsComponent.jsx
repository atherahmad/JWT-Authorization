import React from 'react';
import "../components/styles/listItem.css"

export default function TeaDetailsComponent(props) {


  return (
    <div className='myListContainer'>

        <div className="test" ><p>{props.teaDetails.teaName}</p></div>
        <div className='image-box'>
        {/* <img  src='star.png'/> */}
        <i class="fa fa-star" className='my-image' aria-hidden="true"></i>
        <i class="fa fa-star-o" aria-hidden="true"></i>
        </div>
    </div>
  )
}
