import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './Pages/MainPage/MainPage';
import { useEffect, useState } from "react";
import Login from "./Pages/LoginPage/Login";
import ReportPage from './Pages/ReportGenerator/ReportPage';

export function getName() {
  console.log("Hello");
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:8080/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }
      }).then(response => {
        if (response.status === 200) {
          return response.json()
        }
        throw new Error("Authentication has been failed!");
      }).then(resObject => {
        setUser(resObject.user)
      }).catch(err => {
        console.log("Error!");
      })
    }
    getUser();
  }, [])

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
        <Route path="/home" element={user ? <MainPage user = {user} /> : <Navigate to="/" />} />
        <Route path="/reports" element = {user ? <ReportPage user = {user}/> : <Navigate to="/" />}/>
        <Route path="/*" element = {user ? <Navigate to="/home" /> : <Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
