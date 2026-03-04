import { useState } from "react";
export default function Counter() {
  //let count = 7;
  const [count, setCount] = useState(7);
  console.log(count);
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}
              id="wd-counter-up-click" style={{ backgroundColor: "#1e731f", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", margin: "5px" }}>Up</button>
      <button onClick={() => setCount(count - 1)}
              id="wd-counter-down-click" style={{ backgroundColor: "#f44336", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", margin: "5px" }}>Down</button>
<hr/></div>);}