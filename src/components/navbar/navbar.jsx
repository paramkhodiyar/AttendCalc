import { Link } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";
export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <div className="nav-container">
        <h1 className="logo">AttendCalc 🎯</h1>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li onClick={() => setMenuOpen(false)}><Link to="/">Home</Link></li>
          <li onClick={() => setMenuOpen(false)}><Link to="/calculator">Calculator</Link></li>
          <li onClick={() => setMenuOpen(false)}><Link to="/settings">Settings</Link></li>
        </ul>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </nav>
  );
}