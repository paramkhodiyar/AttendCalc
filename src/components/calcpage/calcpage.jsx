import React, { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { FaInfoCircle } from "react-icons/fa";
import "./calcpage.css";
import Settings from "../settings/settings";

function CalcPage({ darkMode }) {
    const [percentage, setPercentage] = useState("");
    const [classesTotal, setClassesTotal] = useState(null);
    const [classesAttended, setClassesAttended] = useState(null);
    const [classesSemester, setClassesSemester] = useState(null);
    const [criteria, setCriteria] = useState(75);
    const [showInfo, setShowInfo] = useState(false);
    const [isCalculated, setIsCalculated] = useState(false);
    const [currcriteria, setCurrCriteria] = useState(75);
    const [infoVisible, setinfoVisible] = useState(false)
    function show() {
        setinfoVisible(true);
    }
    function hideinfo() {
        setinfoVisible(false);
    }
    function handleSubmit(e) {
        e.preventDefault();
        const total = parseFloat(e.target[0].value);
        const attended = parseFloat(e.target[1].value);
        const semester = parseFloat(e.target[2].value);
        const selectedCriteria = parseFloat(e.target.criteria.value);
        if (total <= 0 || attended < 0 || semester <= 0) {
            alert("Please enter positive values for all inputs.");
            return;
        }
        setClassesTotal(total);
        setClassesAttended(attended);
        setClassesSemester(semester);
        setCriteria(selectedCriteria);
        setIsCalculated(true);
        setCurrCriteria(selectedCriteria);
        if (selectedCriteria < 0 || selectedCriteria > 100) {
            alert("Please enter a valid criteria percentage between 0 and 100.");
            return;
        }
        if (attended > total) {
            alert("Attended classes cannot exceed total classes.");
            return;
        }
        if (attended < 0) {
            alert("Attended classes cannot be negative.");
            return;
        }
        if (total < 0) {
            alert("Total classes cannot be negative.");
            return;
        }
        if (semester < 0) {
            alert("Semester classes cannot be negative.");
            return;
        }
        if (attended === 0 && total === 0) {
            setPercentage("0.00");
        } else if (attended === 0 && total > 0) {
            setPercentage("0.00");
        } else if (attended > 0 && total === 0) {
            setPercentage("Invalid input");
        } else if (attended > 0 && total > 0) {
            const calculatedPercentage = (attended / total) * 100;
            setPercentage(calculatedPercentage.toFixed(2));
        }

        if (total > 0) {
            const calculatedPercentage = (attended / total) * 100;
            setPercentage(calculatedPercentage.toFixed(2));
        } else {
            setPercentage("Invalid input");
        }
    }
    const classesLeftToAttend =
        classesSemester !== null && classesTotal !== null
            ? classesSemester - classesTotal
            : "";
    const noskipclasses =
        classesSemester !== null && classesTotal !== null
            ? (((classesAttended + classesLeftToAttend) / classesSemester) * 100).toFixed(2)
            : "";
    const keepuppercentage =
        percentage !== null && classesSemester !== null
            ? Math.max(0, Math.ceil(((percentage * classesSemester) / 100) - classesAttended))
            : "";
    const criteriaClassesToMaintain =
        criteria !== null && classesSemester !== null
            ? Math.max(0, Math.ceil(((criteria / 100) * classesSemester) - classesAttended))
            : "";
    return (
        <>
            <div className="mainpage">
                <div className="container">
                    <div className="card">
                        <div className="cardheader"><h1>Calculator</h1><div className="iconholder" onMouseEnter={show} onMouseLeave={hideinfo} ><FaInfoCircle style={{ fontWeight: "bolder", cursor: "pointer" }} />
                            {infoVisible && (
                                <div
                                style={{
                                    position: "absolute",
                                    bottom: "120%",
                                    right: "-10px", 
                                    left:"px",
                                    backgroundColor: "#333",
                                    color: "#fff",
                                    padding: "8px 12px",
                                    borderRadius: "5px",
                                    fontSize: "0.85rem",
                                    whiteSpace: "nowrap",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                    zIndex: 999,
                                    display:"flex",
                                    flexWrap:"wrap",
                                    transform:"translateX(380px)"
                                  }}
                                >
                                    The Default classes per day is 3.Customisation coming soon.
                                </div>
                            )}
                        </div></div>
                        <p>Calculate your attendance stats with ease!</p>
                        <span
                            className="info-icon"
                            onMouseEnter={() => setShowInfo(true)}
                            onMouseLeave={() => setShowInfo(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="14"
                                viewBox="0 -960 960 960"
                                width="14"
                                fill="#e8eaed"
                                className="info-icon-svg"
                            />
                            {showInfo && (
                                <div className="tooltip">
                                    <p><strong>Defaults:</strong></p>
                                    <p>📌 Classes per day: <strong>3</strong></p>
                                    <p>📌 Default attendance criteria: <strong>75%</strong></p>
                                    <p>📌 Attendance is calculated as (Attended/Total) * 100</p>
                                    <p>📌 No partial attendance is counted</p>
                                </div>
                            )}
                        </span>
                        <div className="formcontainer">
                            <form className="form" onSubmit={handleSubmit}>
                                <input type="number" placeholder="Classes Total so-far" required />
                                <input type="number" placeholder="Classes Attended so-far" required />
                                <input type="number" placeholder="Total classes for the semester" required />
                                <label htmlFor="criteria">Criteria:</label>
                                <select id="criteria" name="criteria">
                                    <option value="60">60%</option>
                                    <option value="65">65%</option>
                                    <option value="70">70%</option>
                                    <option value="75">75%</option>
                                    <option value="80">80%</option>
                                    <option value="85">85%</option>
                                </select>
                                <button type="submit">Calculate</button>
                            </form>
                        </div>
                    </div>
                    {/* <Arrow38 /> */}
                    <div className="analysiscard p-6 bg-gray-900 text-white rounded-lg shadow-md">
                        {isCalculated ? (
                            <>
                                <h2 className="text-2xl font-bold mb-2">Analysis</h2>
                                <p className="text-gray-400 mb-4">
                                    This calculator helps you determine your attendance percentage and the number of classes you need to attend to meet the criteria.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { title: "Attendance", value: `${percentage}%` },
                                        { title: "Classes Left to Attend", value: classesLeftToAttend },
                                        { title: "Projected Attendance if No Skips", value: `${noskipclasses}%` },
                                        { title: "Classes Needed to Maintain Criteria", value: criteriaClassesToMaintain },
                                        { title: "Classes Needed to Keep Up", value: keepuppercentage },
                                        { title: `Classes Needed to Maintain ${criteria} Criteria`, value: Math.max(0, Math.ceil(((80 / 100) * classesSemester) - classesAttended)) },
                                    ].map((item, index) => (
                                        <div key={index} className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
                                            <h3 className="text-lg font-bold">{item.title}</h3>
                                            <p className="text-2xl">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <h2 className="text-xl font-bold">Welcome to AttendCalc 🎯</h2>
                                <p>Enter your details and click <strong>"Calculate"</strong> to see your attendance analysis.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default CalcPage;
