import { useState } from "react";
import { CoursesList } from "./CoursesList";

export const ControlledFilter = () => {
  const [query, setQuery] = useState("");

  return (
    <section className="filter">
      <h2 className="filter__title">Управляемый компонент</h2>
      <div className="filter__controls">
        <label className="filter__label">
          Название курса
          <input
            placeholder="Поиск курсов"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button onClick={() => setQuery("")}>Сбросить</button>
      </div>

      <CoursesList query={query} />
    </section>
  );
};
