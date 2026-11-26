import { useState } from "react";
import { CourseEditForm } from "./CourseEditForm";
import type { Course } from "./types";
import { courses } from "./consts/courses";

const App = () => {
  const [course, setCourse] = useState<Course>(courses[0]);

  return (
    <main>
      <h1>Редактирование курса</h1>
      <CourseEditForm course={course} onSave={setCourse} />
      <h2>Сохранённая запись</h2>
      <pre className="saved">{JSON.stringify(course, null, 2)}</pre>
    </main>
  );
};

export default App;
