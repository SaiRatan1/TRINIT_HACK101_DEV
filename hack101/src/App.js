import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Usersignup from './usersignup'
import Login from './ngologin'
import Homepage from './homepage'
import Navbar from './navbar'
import Userdata from './userdata'

function App() {

    console.log('App component is reloading');

  return (
    <>
        <Router>
        <Navbar/>
        <Userdata />
            <Routes>
                
            <Route path='/' element={<Homepage />}></Route>
            <Route exact path='/usersignup' element={<Usersignup />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/userdata' element={<Userdata />}></Route>
            </Routes>
        </Router>

    </>
  );
}

export default App;
