import React from "react";
import "./home.css";
import Maincard from "../maincard/maincard";

function Home({ darkMode }) {
    return (
        <>
            <div className={`home ${darkMode ? "dark-mode" : ""}`}>
                <h1>Welcome to StudyBase 🎯</h1>
                <p>From attendance to to-dos — everything you need to study smarter.</p>
            </div>
            <div className="stylecontainer">
                <div className="card1">
                    <Maincard />
                </div>
            </div>
            <div className="warningcontainer">
                <div className={`warning ${darkMode ? "dark-mode" : ""}`}>
                        <p>
                            ⚠️ <strong>Disclaimer:</strong> This tool is designed solely to help students calculate their attendance percentage.
                            It does <em>not</em> encourage skipping or leaving classes. Please use it responsibly — regular class attendance
                            is important for your learning and success.
                        </p>
                    </div>
                </div>
        </>
    );
}

export default Home;