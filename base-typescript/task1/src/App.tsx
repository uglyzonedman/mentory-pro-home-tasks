import { useState } from "react";
import { courses } from "./consts/courses";
import { CourseCard } from "./CourseCard";

const App = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <main>
      <section className="block">
        <h2 className="block__title">Курсы</h2>
        <p className="block__selected">
          Выбран: <strong>{selectedId ?? "ничего"}</strong>
        </p>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        ))}
      </section>
    </main>
  );
};

export default App;
