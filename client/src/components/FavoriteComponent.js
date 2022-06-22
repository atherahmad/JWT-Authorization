import React, {useEffect, useState, useContext} from 'react'
import {  useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext'

export default function FavoriteComponent() {

    const [myFavoriteTeaList, setMyFavoriteTeaList] = useState([])
    const [userProfile, setUserProfile] = useState({})

    const [user,setUnauthorized, setAuthorized] = useContext(UserContext);
    const navigate = useNavigate()

    useEffect(()=>{
        setUserProfile(user)
    },[userProfile])

      useEffect(()=>{
        if(!user.authorized) navigate("/")
    })  
    
  return (
    <div>
        <h2 onClick={()=>setUnauthorized()}>
            Your Favorite Tea List!
        </h2>
        <ul >
            {
            myFavoriteTeaList.map(tea=>
            <li key={tea.id}>
                {tea.name}
            </li>
            )}
        </ul>
    </div>
  )
}
