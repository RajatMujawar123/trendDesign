import React from 'react';
import logo from "../Components/Images/AppLogo.png"
import loginLogo from "../Components/Images/6681221.png"
import Nav from "../Css/Nav.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to="/">
      <img src={logo} alt="App Logo" className="responsive-logo" />
      </Link>


       <Link to="/Login" className="login-link">
       <h1 style={{color: 'black'}}>Login</h1>
      </Link>
    </div>
  )
}

export default Navbar
