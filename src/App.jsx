import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import CalcPage from "./components/calcpage/calcpage";
import Settings from "./components/settings/settings";
import TaskManager from "./components/taskmanager/taskmanager";
import Pomodoro from "./components/pomodoro/pomodoro";
import Notetaker from "./components/notetaker/notetaker";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/calculator" element={<CalcPage darkMode={darkMode} />} />
        <Route path="/taskmanager" element={<TaskManager darkMode={darkMode} />} />
        <Route path="/pomodoro" element={<Pomodoro darkMode={darkMode} />} />
        <Route path="/notetaker" element={<Notetaker darkMode={darkMode} />} />
        <Route path="/settings" element={<Settings darkMode={darkMode} />} />
        <Route path="*" element={<Navigate to="/" />} />
      
      </Routes>
    </Router>
  );
}

export default App;