import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Usersignup from './usersignup'
import Ngosignup from './ngosignup'
import Login from './ngologin'
import Homepage from './homepage'
import Navbar from './navbar'
import Userdata from './userdata'
import Ngodata from './ngodata'
import Group from './group'

function App() {
  window.localStorage.removeItem('credentials')
  console.log('App component is reloading');

  return (
    <>

        <Router>
        <Navbar/>
        
        {/* <Userdata />  */}
            <Routes>
                
            <Route exact path='/' element={<Homepage />}></Route>
            <Route exact path='/usersignup' element={<Usersignup />}></Route>
            <Route exact path='/ngosignup' element={<Ngosignup />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/userdata' element={<Userdata />}></Route>
            <Route exact path='/ngo/63e69d113dc92d19c3ae419a' element={<Ngodata/>}></Route>
            <Route exact path='/grouppage/:id' element={<Group/>}></Route>
            </Routes>
        </Router>
    </>
  );
}

export default App;
