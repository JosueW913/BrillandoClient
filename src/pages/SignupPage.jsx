// src/pages/SignupPage.jsx

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import { post } from "../services/authService";



function SignupPage() {

  const [user, setUser] = useState({
    email: "",
    password: "",
    fullName: "",
    username: ""
  })

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    post('/auth/signup', user)
      .then((response) => {
        console.log('JWT token', response.data.authToken);
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/');
      })
      .catch((error) => {
        console.log("Error", error)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };


  return (
    <div className="forms">
      <div className="form-layout">
        <div className="form-container">
          <h1>Sign Up</h1>

          <form onSubmit={handleSignupSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleTextChange}
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleTextChange}
            />

            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleTextChange}
            />

            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleTextChange}
            />

            <button type="submit">Sign Up</button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Already have an account?
          <Link to="/login"> Login</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default SignupPage;