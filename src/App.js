import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Calendar from './components/pages/Calendar';
import ContactUs from './components/pages/ContactUs';
import Admin from './components/pages/Admin';

function App() {


  // think this works as a base for the navbar, might need some work as well
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Logout' element={<Logout/>} />
        <Route path='/Calendar' element={<Calendar/>} />
        <Route path='/ContactUs' element={<ContactUs/>} />
        <Route path='/Admin' element={<Admin/>} />
      </Routes>
    </Router>
  );
}

export default App;