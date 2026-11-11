import { useState } from "react";
import "./App.css";
import { CourseCard } from "./CourseCard";
import courses from "./courses.json";
import type { Course } from "./CourseCard";

const typedCourses = courses as Course[];

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Изменить render (count: {count})
      </button>
      <button
        onClick={() =>
          console.log(
            `[check] localStorage ${localStorage.getItem("selected-course")}`,
          )
        }
      >
        Проверка localStorage на значение
      </button>

      {typedCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </main>
  );
}

export default App;
