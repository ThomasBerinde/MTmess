import React from 'react';
import './App.css';
import Feed from './components/Feed';
import Login from './components/Login';
import Register from './components/Register'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {useState, useEffect} from 'react';

function App () {

  const getUserFromLocalStorage = () => {
    const data = localStorage.getItem("userSaved");
    console.log("Feed/getFromLocalStorage/user?: " + data)
    if (data) {
      console.log("Debug 1 " + data);
      //console.log("Before " + user);
      const pdata = JSON.parse(data)
      return pdata;
    }
  };

  const [user, setUser] = useState(getUserFromLocalStorage());

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setUser={setUser}/>}/>
          <Route  path="/register" element={<Register/>}/>
          <Route path="/feed" element={<Feed user={user} setUser={setUser}/>} isPrivate/>
          <Route element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
