import React, {useEffect, useState} from 'react'

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
            <ul>
                {teaList.map((item)=><li key={item.teaId}>{item.teaName}</li>)}
            </ul>
        </div>
    )
}

export default TeaListComponent
