import React, {useEffect, useState} from 'react'
import TeaDetailsComponent from '../TeaBox/TeaDetailsComponent';
import axios from 'axios';

function TeaListComponent(props) {

    const [errorMessage, setErrorMessage] = useState("");
    const [teaList, setTeaList] = useState([])
    const [favoriteList, setFavoriteList] = useState([])

    const updateFavorites = (e) => {

        if(!localStorage.getItem("accessToken")) return setErrorMessage("Please login to favorite the item!")
        const updateFavorite = !e.target.style.color ? "set" : "unset"
        axios.post(`/api/favorite/${updateFavorite}`,
            {   
                teaId:e.target.id
            },
            {
                headers: 
                    {"Authorization": localStorage.getItem("accessToken")  }
                })
        .then(response=>{
          if(response.data) {
           
            e.target.style.color = e.target.style.color ? "" :"yellow";}
          else throw new Error( response.statusText)  
        })
        .catch(err=>setErrorMessage(err))
    
    }

    useEffect(()=>{

        fetch("/api/tea/all")
        .then(response=>{
            if (response.ok) return response.json()
            else new Error(response.message)
        })
        .then(data=>setTeaList(data))
        .catch(err=>setErrorMessage(err))

        if(localStorage.getItem("accessToken")){
            fetch("/api/favorite/list",{
                headers: {  "Authorization": localStorage.getItem("accessToken")  }  
            })
            .then(response=>{
                if (response.ok) return response.json()
                else new Error(response.message)
            })
            .then(data=>{
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

        </div>
    )
}

export default TeaListComponent
