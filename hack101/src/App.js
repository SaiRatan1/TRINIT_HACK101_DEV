
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
import React from 'react';

function App() {

    console.log('App component is reloading');

  return (
    <>
        <Router>
        <Navbar/>
            <Routes>
                
            <Route path='/' element={<Homepage />}></Route>
            <Route exact path='/usersignup' element={<Usersignup />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            </Routes>
        </Router>

    </>
  );
}

export default App;
