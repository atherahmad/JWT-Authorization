import './App.css';
import SigninComponent from './components/SigninComponent';
import SignupComponent from './components/SignupComponent';
import TeaListComponent from './components/TeaListComponent';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayoutComponent from './components/LayoutComponent';
import UserContext from './context/userContext';
import {useState} from "react"



function App() {

  const [userProfile, setUserProfile] = useState({
    userName:"",
    authorized:true
  });

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
          <Route path="signin" element={<SigninComponent />} >
            {userProfile.authorized ? <Navigate to="/" />:null}
          </Route>
          <Route path="tealist" element={<TeaListComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
    </div>
  );
}

export default App;
