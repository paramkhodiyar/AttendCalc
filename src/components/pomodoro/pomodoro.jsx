import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import { FaPlus } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import "./pomodoro.css";

function Pomodoro({ darkMode }) {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [settings, setSettings] = useState(false);
    const [breakTime, setBreakTime] = useState(5 * 60);
    const [showQuickNote, setShowQuickNote] = useState(false);
    const [youtubeLink, setYoutubeLink] = useState("");
    const [videoId, setVideoId] = useState(null);

    function extractVideoId(url) {
        const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Color,
        ],
        content: '<p>Hey There....<p>',
    })
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "auto";
        };
    }, []);

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            setTimeLeft(breakTime);
            alert("Time's up!");
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, breakTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const handleStartPause = () => {
        setIsRunning((prev) => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(25 * 60);
    };

    const handleShortBreak = () => {
        setIsRunning(false);
        setTimeLeft(breakTime);
    };
    
    useEffect(() => {
        if (!settings) return;

        const handleClickOutside = (event) => {
            if (settings &&
                !event.target.closest('.settings-menu') &&
                !event.target.closest('.settingsbutton')) {
                setSettings(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [settings]);

    const toggleSettings = (e) => {
        e.stopPropagation();
        setSettings(!settings);
    };

    return (
        <>
            <div className={`maincontainer ${darkMode ? " dark-mode" : ""}`}>
                <div className={`header ${darkMode ? " dark-mode" : ""}`}>
                    <h1 className="title">Stay focused. Get things done.</h1>
                    <p>Your personal Pomodoro Timer for your focus sessions</p>
                </div>
                
                <div className={`youtube-input-container ${darkMode ? "dark-mode" : ""}`}>
                    <div className="youtube-input-wrapper">
                        <FaYoutube className="youtube-icon" />
                        <input
                            type="text"
                            placeholder="Paste YouTube link here to study along..."
                            value={youtubeLink}
                            onChange={(e) => {
                                const url = e.target.value;
                                setYoutubeLink(url);
                                const id = extractVideoId(url);
                                if (id) setVideoId(id);
                            }}
                        />
                    </div>
                </div>
                
                {videoId && (
                    <div className="youtube-player">
                        <iframe
                            width="80%"
                            height="450"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube Video"
                        ></iframe>
                    </div>
                )}
                
                <div className={`timercontainer ${videoId ? "with-video" : ""} ${darkMode ? " dark-mode" : ""}`}>
                    <div className={`button-group ${darkMode ? " dark-mode" : ""}`}>
                        <button onClick={handleShortBreak}>Short Break</button>
                    </div>
                    <h1 className="title">TimeLoopr</h1>
                    <h1>{formatTime(timeLeft)}</h1>
                    <div className={`timercontrols ${darkMode ? " dark-mode" : ""}`}>
                        <button onClick={handleStartPause}>
                            {isRunning ? "Pause" : "Start"}
                        </button>
                        <button onClick={handleReset}>Reset</button>
                    </div>
                </div>

                <button
                    className={`quicknotebutton ${darkMode ? "dark-mode" : ""}`}
                    onClick={() => setShowQuickNote(!showQuickNote)}
                >
                    <FaPlus style={{ marginRight: "8px" }} /> Add QuickNote
                </button>
                {showQuickNote && (
                    <div className={`quicknote-editor ${darkMode ? "dark-mode" : ""}`}>
                        <EditorContent editor={editor} />
                    </div>
                )}

                <div className={`settings-wrapper`}>
                    <div className={`settingsbutton ${darkMode ? "dark-mode" : ""}`}>
                        <button onClick={toggleSettings}>
                            <IoSettings />
                        </button>
                    </div>
                    {settings && (
                        <div className={`settings-menu ${darkMode ? "dark-mode" : ""}`} onClick={(e) => e.stopPropagation()}>
                            <div className="settingscontainer">
                                <h4>Settings</h4>
                                <div className="timersettings">
                                    <label>
                                        Timer (mm:ss):{" "}
                                        <input
                                            type="text"
                                            placeholder="25:00"
                                            onChange={(e) => {
                                                const [mins, secs] = e.target.value.split(":").map(Number);
                                                if (!isNaN(mins) && !isNaN(secs)) {
                                                    setTimeLeft(mins * 60 + secs);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                <div className="breaksettings">
                                    <label>
                                        Break (mm:ss):{" "}
                                        <input
                                            type="text"
                                            placeholder="05:00"
                                            onChange={(e) => {
                                                const [mins, secs] = e.target.value.split(":").map(Number);
                                                if (!isNaN(mins) && !isNaN(secs)) {
                                                    setBreakTime(mins * 60 + secs);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Pomodoro;