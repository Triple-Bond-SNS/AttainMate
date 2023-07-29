import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import googleIcon from '../../assets/google-color-icon.svg';
import githubIcon from '../../assets/github-icon.svg';
import './Login.scss'
import logo from "../../assets/logo.png"

const Login = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toggleSection = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  const google = () => {
    window.open('http://localhost:8080/auth/google', '_self');
  };

  const github = () => {
    window.open('http://localhost:8080/auth/github', '_self');
  };

  const renderSection = () => {
    if (showLogin) {
      return (
        <div className="right" style={{ opacity: showLogin ? 1 : 0, transition: 'opacity 0.3s' }}>
          <h3>Login</h3>
          <div className="inputs">
            <input
              type="text"
              placeholder="user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>
            Don't have an account? <a onClick={toggleSection}>Create Your Account</a> it takes
            less than a minute
          </p>
          <button onClick={handleLogin}>Login</button>
        </div>
      );
    } else {
      return (
        <div className="right" style={{ opacity: showLogin ? 0 : 1, transition: 'opacity 0.3s' }}>
          <h3>Signup</h3>
          <div className="inputs">
            <input
              type="text"
              placeholder="user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>
            Already have an account? <a onClick={toggleSection}>Login</a>
          </p>
          <button onClick={handleSignup}>Signup</button>
        </div>
      );
    }
  };

  const handleLogin = () => {
    // Implement the login logic here
    const userData = { username, password };
    // Make a POST request to the backend login route
    fetch('http://localhost:8080/auth/loginViaMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Login Successful!!!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          return response.json(); // Parse the JSON response
        } else {
          toast.error('Login Failed!!!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .then((data) => {
        // Update the user state with the authenticated user
        let userData = data.user
        onLogin(userData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSignup = () => {
    // Implement the signup logic here
    const userData = { username, email, password };
    // Make a POST request to the backend signup route
    fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('SignUp Successful!!!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          toggleSection();
        } else {
          console.log(response.body);
          toast.error('Sign Up Failed !!!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div>
      <div style={{position: 'absolute', top: '30px', left:'90px', display:'flex', alignItems:'center' }}  className="logo">
        <img width={"40px"} height={"40px"} style={{borderRadius: '50%'}} src={logo} alt="img" />
        <h4 style={{margin: "0px", marginLeft: "10px"}} >AttainMate</h4>
      </div>
      <div className="login-page-container">
        <div className="login-container">
          <h2 style={{ textAlign: "center", marginTop: "30px" }}>Log Into AttainMate</h2>
          <div className="login-box">
            <div className="via-mail">
              {renderSection()}
            </div>
            <div className="OR">
              <p>OR</p>
            </div>
            <div className="Auth">
              <h3>Authenticate Yourself</h3>
              <div className='social-login-container'>
                <div onClick={google} className="google">
                  <img width={"25px"} height={"25px"} src={googleIcon} alt="google" />
                  <p>Continue With Google</p>
                </div>
                <div onClick={github} className="github">
                  <img width={"25px"} height={"25px"} src={githubIcon} alt="google" />
                  <p>Continue With GitHub</p>
                </div>
              </div>
            </div>
          </div>
          <p className='login-footer'>
            Secure Login With AttainMate Subject to Google's <a href="https://www.google.com/accounts/authsub/terms.html" target='_blank'>Terms</a> and <a href="https://support.google.com/accounts/answer/147806?hl=en" target='_blank'>Policy.</a>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default Login