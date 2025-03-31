import { Link } from "react-router-dom";
import "./navbar.css";
export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <div className="nav-container">
        <h1 className="logo">AttendCalc 🎯</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/calculator">Calculator</Link></li>
          <li><Link to="/settings">Settings</Link></li>
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