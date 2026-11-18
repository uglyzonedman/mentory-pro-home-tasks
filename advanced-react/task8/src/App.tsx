import { useState } from "react";
import { CourseListView } from "./CourseListView";
import { FilterPanel } from "./FilterPanel";
import courses from "./courses.json";

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const queryClear = query.trim().toLowerCase();

  const [category, setCategory] = useState("all");

  const filterCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(queryClear) &&
      (category == "all" || c.category == category),
  );

  return (
    <main>
      <FilterPanel
        category={category}
        onCategoryChange={(value: string) => setCategory(value)}
        onQueryChange={(value: string) => setQuery(value)}
        onReset={() => {
          setCategory("all");
          setQuery("");
        }}
        query={query}
      />

      <section className="block">
        <h2 className="block__title">Курсы</h2>
        <p className="block__selected">
          Найдено: <strong>{filterCourses.length}</strong>
        </p>
        <p className="block__selected">
          Выбран: <strong>{selectedId ?? "ничего"}</strong>
        </p>

        <CourseListView
          emptyText="По заданным фильтрам ничего не найдено"
          items={filterCourses}
          onSelect={(value) => setSelectedId(value)}
        />
      </section>
    </main>
  );
};

export default App;
