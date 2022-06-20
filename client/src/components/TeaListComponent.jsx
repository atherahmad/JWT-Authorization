import React, {useEffect, useState} from 'react'
import TeaDetailsComponent from './TeaDetailsComponent';

function TeaListComponent(props) {

    const [errorMessage, setErrorMessage] = useState("");
    const [teaList, setTeaList] = useState([])

    useEffect(()=>{
        fetch("http://localhost:5000/api/toplist")
        .then(response=>{
            if (response.ok) return response.json()
            else new Error(response.message)
        })
        .then(data=>setTeaList(data))
        .catch(err=>setErrorMessage(err))
    },[])

    return (
        <div>
            <h3>Top Tea List</h3>
            <ul className='myList'>
                {teaList.map((item)=>
                <TeaDetailsComponent key={item.teaId} teaDetails={item} favoriteHandler={()=>console.log(item)}/>
                )}
            </ul>
            
        </div>
    )
}

export default TeaListComponent
