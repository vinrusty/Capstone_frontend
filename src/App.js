import React from 'react';
import Navbar from './Components/Navigation/Navbar';
import Main from './Components/Home/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashHome from './Components/Dashboard/DashHome';
import Create from './Components/Dashboard/Create';
import { DashDetail } from './Components/Dashboard/DashDetail';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Reports from './Components/Dashboard/Reports';
import Electronics from './Components/Dashboard/Electronics';
import Transport from './Components/Dashboard/Transport';
import Sensor from './Components/Dashboard/Sensor';



function App() {


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path="/records" element={<DashHome />} />
          {/* <Route path="/create" element={<Create />} /> */}
          <Route path="/records/:id" element={<DashDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Reports />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/sensors" element={<Sensor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
