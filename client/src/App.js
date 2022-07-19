import './App.css';
import SigninComponent from './components/AuthComponents/Login/SigninComponent';
import SignupComponent from './components/AuthComponents/Signup/SignupComponent';
import TeaListComponent from './components/TeaComponents/TeaList/TeaListComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutComponent from './components/NavBar/LayoutComponent';
import UserContext from './context/userContext';
import {useState, useEffect} from "react"
import FavoriteComponent from './components/Favorite/FavoriteComponent';
import TeaDetails from './components/TeaComponents/TeaDetails/TeaDetails';



function App() {

  const [userProfile, setUserProfile] = useState({
    userName:"",
    authorized:false
  });

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(()=>{
    if(localStorage.getItem("accessToken")) 
      fetch("/api/auth/validate",{
        headers: {  "Authorization": localStorage.getItem("accessToken")  }
      }
      )
      .then(response=>{
          if(response.ok) return response.json()
          else throw new Error(response.statusText)
        })
      .then(data=>setAuthenticated(data))
      .catch(err=>{
        localStorage.removeItem("accessToken")
        setErrorMessage(err)})
},[])

  const setAuthenticated = (profileName) => {
    setUserProfile({
      userName:profileName,
      authorized:true})
  }

  const setUnauthenticated = () => {
    setUserProfile({
      userName:"",
      authorized:false
    })
  }

  return (
    <div className="App">
      <UserContext.Provider value={[userProfile,setUnauthenticated, setAuthenticated ]}>
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<LayoutComponent />}>
          <Route path="signup" element={<SignupComponent />} />
          <Route path="signin" element={<SigninComponent />} />
          <Route path="tealist" element={<TeaListComponent />} />
          <Route path="myfavorites" element={<FavoriteComponent />} />
          <Route path='teadetails/:id' element={<TeaDetails />} />
          <Route path='*' element={<TeaListComponent />} />


        </Route>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
    </div>
  );
}

export default App;
