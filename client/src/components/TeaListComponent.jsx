import React, {useEffect, useState} from 'react'
import TeaDetailsComponent from './TeaDetailsComponent';
import axios from 'axios';

function TeaListComponent(props) {

    const [errorMessage, setErrorMessage] = useState("");
    const [teaList, setTeaList] = useState([])
    const [favoriteList, setFavoriteList] = useState([])

    const updateFavorites = (e) => {

        if(!localStorage.getItem("accessToken")) return setErrorMessage("Please login to favorite the item!")
        const updateFavorite = !e.target.style.color ? "set" : "unset"
        axios.post(`/api/auth/favorite/${updateFavorite}`,{teaId:e.target.id},{headers: {  "Authorization": localStorage.getItem("accessToken")  }})
        .then(response=>{
          if(response.data) {
           
            e.target.style.color = e.target.style.color ? "" :"yellow";}
          else throw new Error( response.statusText)  
        })
        .catch(err=>setErrorMessage(err))
    
    }

    useEffect(()=>{

        fetch("/api/toplist")
        .then(response=>{
            if (response.ok) return response.json()
            else new Error(response.message)
        })
        .then(data=>setTeaList(data))
        .catch(err=>setErrorMessage(err))

        if(localStorage.getItem("accessToken")){
            fetch("/api/getfavorite",{
                headers: {  "Authorization": localStorage.getItem("accessToken")  }  
            })
            .then(response=>{
                if (response.ok) return response.json()
                else new Error(response.message)
            })
            .then(data=>{
                console.log(data, "datra")
                setFavoriteList(data)})
            .catch(err=>setErrorMessage(err))
        }
    },[])

    return (
        <div>
            <h3>Top Tea List</h3>
            <ul className='myList'>
                {teaList.map((item)=>
                <TeaDetailsComponent key={item.teaId} updateFavorites={updateFavorites} teaDetails={item} favorited={favoriteList.includes(item.teaId.toString())} favoriteHandler={()=>console.log(item)}/>
                )}
            </ul>
            {errorMessage}
            {favoriteList.map(item=><p>{item}</p>)}
        </div>
    )
}

export default TeaListComponent
