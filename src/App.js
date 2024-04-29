import React, { useEffect } from 'react';
import Navbar from './Components/Navigation/Navbar';
import Main from './Components/Home/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashHome from './Components/Dashboard/DashHome';
import Create from './Components/Dashboard/Create';
import { DashDetail } from './Components/Dashboard/DashDetail';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Reports from './Components/Dashboard/Reports';
import Cookies from 'universal-cookie';
import { RootState } from './Context/Context';
import { jwtDecode } from 'jwt-decode';



function App() {

  const cookies = new Cookies()
  const {authState, authDispatch} = RootState()

  useEffect(() => {
    if(cookies.get('token')){
      console.log(jwtDecode(cookies.get('token')))
      const user = jwtDecode(cookies.get('token'))
      authDispatch({
        type: "LOGIN",
        payload: {
          user: user
        }
      })
    }
    else{
      authDispatch({
        type: "LOGOUT"
      })
      // window.location.replace("/")
    }
  },[])

  console.log(authState)

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path="/dashboard" element={<DashHome />} />
          <Route path="/create" element={<Create />} />
          <Route path="/dashboard/:id" element={<DashDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
