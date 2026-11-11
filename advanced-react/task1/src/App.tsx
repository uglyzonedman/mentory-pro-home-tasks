import { useState } from "react";
import "./App.css";
import courses from "./courses.json";
import { Child } from "./Child";

function App() {
  const [count, setCount] = useState(0);
  const [i, setI] = useState(0);
  const [mounted, setMounted] = useState(false);

  return (
    <main>
      <h3>Счетчик: {count}</h3>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Увеличить на 1
      </button>
      <button onClick={() => setI(i === courses.length - 1 ? 0 : i + 1)}>
        Сменить title
      </button>
      <button onClick={() => setMounted((prev) => !prev)}>
        Размонтировать / Монтировать
      </button>

      {mounted && <Child title={courses[i].title} />}
    </main>
  );
}

export default App;
