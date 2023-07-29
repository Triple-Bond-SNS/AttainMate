import React from 'react'
import CustomNavbar from '../../Components/Navbar/Navbar'
import './MainPage.scss'
import { Link } from 'react-router-dom';
import onboard from '../../assets/onboard.png'
import bg1 from "../../assets/img-1.png";
import bg2 from "../../assets/img-2.png";
import bg3 from "../../assets/img-3.png";

const MainPage = ({ user }) => {
  return (
    <>
      <CustomNavbar user={user} />
      <div className='main-page-container'>
        <div className="welcome">
          <div className="left">
            <h3>Hi there 👋 <br /> <span style={{ color: "#ff531c" }}> {user.displayName ? user.displayName : user.username} </span> Nice to see you here !</h3>
          </div>
          <div className="right">
            <div className="r-left">
              <h1 style={{ fontSize: "30px" }}>Welcome<span style={{ color: "#F2430B" }}> Onboard</span></h1>
              <p>With AttainMate Student's Attainment Becomes Effortless. It's a seamless and efficient way to generate student attainment reports</p>
            </div>
            <div className="r-right">
              <img width={"100%"} height={"90%"} src={onboard} alt="img" />
            </div>
          </div>
        </div>

        <div className="myTools">
          <h3 style={{ paddingLeft: "50px" }} className="tools">
            My Tools :
          </h3>
          <div className="tool-container">
            <div style={{
              backgroundImage: `url(${bg1})`
            }} className="tool-card">
              <h3>AttainMate's CO Report Generator</h3>
              <p>Generate the students attainment report.</p>
              <Link className="nav-link" to="/reports">
                <button>Get Started</button>
              </Link>
            </div>
            <div style={{
              backgroundImage: `url(${bg2})`
            }} className="tool-card">
              <h3>AttainMate's Student Roll List Maker</h3>
              <p>Generate the students Roll List and manage students.</p>
              <Link className="nav-link" to="/rolllist">
                <button>Get Started</button>
              </Link>
            </div>
            <div style={{
              backgroundImage: `url(${bg3})`
            }} className="tool-card">
              <h3>Graphical Report Visualizer</h3>
              <p>Visualize the report summary graphical reports.</p>
              <Link className="nav-link" to="/graphical-visualizer">
                <button>Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPage