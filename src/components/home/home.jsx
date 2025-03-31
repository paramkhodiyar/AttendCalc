import React from "react";
import "./home.css";
import Maincard from "../maincard/maincard";

function Home({ darkMode }) {
    return (
        <>
            <div className={`home ${darkMode ? "dark-mode" : ""}`}>
                <h1>Welcome to AttendCalc 🎯</h1>
                <p>Calculate your attendance percentage with ease!</p>
            </div>
            <div className="stylecontainer">
                <div className="card1">
                    <Maincard />
                </div>
            </div>
        </>
    );
}

export default Home;