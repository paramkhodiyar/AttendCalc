import { Link } from "react-router-dom";
import { useState } from "react";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import "./navbar.css";
export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <div className="nav-container">
        <div className="logo-menu">
          <h1 className="logo">StudyBase 🎯</h1>
        </div>
        <div className="linksholder">
          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            <li onClick={() => setMenuOpen(false)}><Link to="/">Home</Link></li>
            <li onClick={() => setMenuOpen(false)}><Link to="/pomodoro">Pomodoro</Link></li>
            <li onClick={() => setMenuOpen(false)}><Link to="/notetaker">Scribl</Link></li>
            <li onClick={() => setMenuOpen(false)}><Link to="/calculator">AttendCalc</Link></li>
            <li onClick={() => setMenuOpen(false)}><Link to="/taskmanager">TaskManager</Link></li>
            {/* <li onClick={() => setMenuOpen(false)}><Link to="/settings">Settings</Link></li> */}
          </ul>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
        <div className="modetoggler">
          {/* <MdSunny style={{fontSize:"24px"}}/> */}
        <label className="switch">

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
         
        </label>
        {/* <FaMoon style={{fontSize:"18px"}}/> */}
        </div>
      </div>
    </nav>
  );
}