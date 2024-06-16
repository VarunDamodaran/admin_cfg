import React, { useState, useEffect } from "react";
import "./App_admin.css";
import BarChart from "../src/components/BarChart"; // Assuming you have a BarChart component
import { UserData } from "./Data"; // Assuming UserData is imported correctly
import principalIcon from './principal-icon.png'; // Path to your icon image

function App_admin() {
  const [schoolName, setSchoolName] = useState(""); // State to store the entered school name
  const [allUserData, setAllUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Students (All Schools)",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const [schoolUserData, setSchoolUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Students",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  // useEffect to calculate number of students at each level when component mounts
  useEffect(() => {
    // Initialize an object to store count of students at each level
    const levelCounts = {};

    // Count students at each level
    UserData.forEach(student => {
      const { student_level } = student;
      if (levelCounts[student_level]) {
        levelCounts[student_level]++;
      } else {
        levelCounts[student_level] = 1;
      }
    });

    // Extract labels (levels) and data (student counts) from levelCounts object
    const labels = Object.keys(levelCounts).map(level => parseInt(level)); // Convert keys to integers
    const data = Object.values(levelCounts);

    // Update state with labels and data
    setAllUserData({
      labels: labels,
      datasets: [
        {
          label: "Number of Students (All Schools)",
          data: data,
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, []); // Empty dependency array to run effect only once on component mount

  // useEffect to update data when schoolName changes
  useEffect(() => {
    if (!schoolName) {
      // If schoolName is empty, reset schoolUserData to initial state
      setSchoolUserData({
        labels: [],
        datasets: [
          {
            label: "Number of Students",
            data: [],
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
      return;
    }

    // Filter UserData based on schoolName
    const filteredData = UserData.filter(student => student.student_school.toLowerCase() === schoolName.toLowerCase());

    // Initialize an object to store count of students at each level
    const levelCounts = {};

    // Count students at each level for the filtered data
    filteredData.forEach(student => {
      const { student_level } = student;
      if (levelCounts[student_level]) {
        levelCounts[student_level]++;
      } else {
        levelCounts[student_level] = 1;
      }
    });

    // Extract labels (levels) and data (student counts) from levelCounts object
    const labels = Object.keys(levelCounts).map(level => parseInt(level)); // Convert keys to integers
    const data = Object.values(levelCounts);

    // Update state with labels and data
    setSchoolUserData({
      labels: labels,
      datasets: [
        {
          label: `Number of Students - ${schoolName}`,
          data: data,
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [schoolName]); // Dependency array includes schoolName to run effect whenever it changes

  const handleInputChange = (event) => {
    setSchoolName(event.target.value); // Update schoolName state with input value
  };

  return (
    <div className="App_admin">
      <div className="principal-info">
        <img src={principalIcon} alt="Principal" />
        <div className="details">
          <h4>Principal's Name</h4>
          <p>School's Name</p>
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="schoolName">Enter School Name: </label>
        <input
          type="text"
          id="schoolName"
          value={schoolName}
          onChange={handleInputChange}
          placeholder="Type school name..."
        />
      </div>
      <div className="chart-container">
        <BarChart chartData={allUserData} />
        {schoolName && <BarChart chartData={schoolUserData} />}
      </div>
    </div>
  );
}

export default App_admin;
