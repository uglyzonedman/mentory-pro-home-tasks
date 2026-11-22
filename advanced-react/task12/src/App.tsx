import { useState } from "react";
import courses from "./courses.json";
import { useFavorites } from "./useFavorites";
import { SearchPanel } from "./SearchPanel";
import { CourseListView } from "./CourseListView";
import { SelectedCourse } from "./SelectedCourse";
import { FavoritesPanel } from "./FavoritesPanel";

export default function App() {
  // первичный state
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const favorites = useFavorites();

  // производные данные — вычисляются, в state не хранятся
  const cleanQuery = query.trim().toLowerCase();
  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(cleanQuery),
  );
  const selectedCourse = courses.find((c) => c.id === selectedId) ?? null;
  const isSelectedInFilter = filtered.some((c) => c.id === selectedId);
  const favoriteCourses = courses.filter((c) => favorites.ids.includes(c.id));

  return (
    <main>
      <SearchPanel
        query={query}
        onQueryChange={setQuery}
        onClear={() => setQuery("")}
      />

      <section className="block">
        <h2 className="block__title">Курсы</h2>
        <p className="block__selected">
          Найдено: <strong>{filtered.length}</strong> · Избранное:{" "}
          <strong>{favoriteCourses.length}</strong>
        </p>

        <CourseListView
          items={filtered}
          selectedId={selectedId}
          favoriteIds={favorites.ids}
          onSelect={setSelectedId}
          onToggleFavorite={favorites.toggle}
        />
      </section>

      <SelectedCourse
        course={selectedCourse}
        isInFilter={isSelectedInFilter}
        onReset={() => setSelectedId(null)}
      />

      <FavoritesPanel
        items={favoriteCourses}
        onToggle={favorites.toggle}
        onClear={favorites.clear}
      />
    </main>
  );
}
