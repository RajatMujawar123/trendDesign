import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Css/LoginPage.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  // Fixed credentials
  const FIXED_EMAIL = 'admin@example.com'
  const FIXED_PASSWORD = 'password123.786#'

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

     if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
      setIsLoggedIn(true)
      navigate('/addProducts') 
    } else {
      setError('Invalid email or password')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
    setError('')
  }

  if (isLoggedIn) {
    return (
      <div className="container">
        <div className="card">
          <div className="welcome-content">
            <h2 className="welcome-title">Welcome!</h2>
            <p className="welcome-text">You have successfully logged in.</p>
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h2 className="title">Login</h2>
          {/* <p className="subtitle">
            Use: admin@example.com / password123
          </p> */}
        </div>
        
        <div>
          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input password-input"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="button-container">
            <button
              className="submit-btn"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login