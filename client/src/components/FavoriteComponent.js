import axios from 'axios';
import React, {useEffect, useState, useContext} from 'react'
import {  useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext'
import TeaDetailsComponent from './TeaDetailsComponent';

export default function FavoriteComponent() {

    const [myFavoriteTeaList, setMyFavoriteTeaList] = useState([])
    const [userProfile, setUserProfile] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    const [user,setUnauthorized, setAuthorized] = useContext(UserContext);
    const navigate = useNavigate()

    useEffect(()=>{
      axios.get("/api/favorite/detailedlist",{
        headers:{
          'Authorization': localStorage.getItem("accessToken")
        }
      })
      .then(response=>setMyFavoriteTeaList(response.data))
      .catch(err=>setAuthorized(false))
        setUserProfile(user)
    },[])

      useEffect(()=>{
        if(!user.authorized) navigate("/")
    })  

    const updateFavorites = (e) =>{
      axios.post(`/api/favorite/unset`,{teaId:e.target.id},{headers: {  "Authorization": localStorage.getItem("accessToken")  }})
      .then(response=>{
        if(response.data) setMyFavoriteTeaList(oldState=>oldState.filter(item=>item.teaId !== +e.target.id))

        else throw new Error( response.statusText)  
      })
      .catch(err=>setErrorMessage(err))
    }
    
  return (
    <div>
        <h2>
            Your Favorite Tea List!
        </h2>
        <ul className='myList'>
          {console.log(myFavoriteTeaList)}
                {myFavoriteTeaList.map((item)=>
              
                <TeaDetailsComponent key={item.teaId} updateFavorites={updateFavorites} teaDetails={item} favorited={true} />
                )}
            </ul>
            {errorMessage}
        
    </div>
  )
}
