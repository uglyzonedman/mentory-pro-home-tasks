import { useState } from "react";
import courses from "./courses.json";

import { CourseListView } from "./CourseListView";
export const CourseCatalogContainer = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const cleanQuery = query.trim().toLowerCase();

  const listFilter = courses.filter((item) =>
    item.title.toLowerCase().includes(cleanQuery),
  );

  return (
    <section className="block">
      <h2 className="block__title">Контейнер</h2>
      <label className="block__label">
        Поиск
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <p className="block__selected">
        Выбран: <strong>{selectedId ?? "ничего"}</strong>
      </p>

      <CourseListView
        emptyText="По запросу ничего не найдено"
        items={listFilter}
        onSelect={setSelectedId}
      />
    </section>
  );
};
