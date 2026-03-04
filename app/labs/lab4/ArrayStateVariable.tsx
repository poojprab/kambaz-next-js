"use client";
import { useState } from "react";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button onClick={addElement} style={{ backgroundColor: "#1e731f", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", margin: "5px" }}>Add Element</button>
      <ul>
        {array.map((item, index) => (
          <li key={index}>{item}
            <button onClick={() => deleteElement(index)} style={{ backgroundColor: "#f44336", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", margin: "5px" }}>Delete</button>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}