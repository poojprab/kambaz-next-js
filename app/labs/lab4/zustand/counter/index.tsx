"use client";
import { useCounterStore } from "./store";

export default function ZustandCounter() {
  const { count, increase, decrease, setCount, reset } = useCounterStore(
    (state) => state,
  );

  return (
    <div className="m-2">
      <h2>Zustand Counter</h2>
      Count: {count}
      <br />
      <button onClick={() => increase(1)}>Increase</button>
      <button onClick={() => decrease(1)}>Decrease</button>
      <button onClick={() => setCount(10)}>Set to 10</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}