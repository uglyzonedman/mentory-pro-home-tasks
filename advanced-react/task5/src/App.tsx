import { useState } from "react";
import courses from "./courses.json";
import { Panel } from "./Panel";

const allCourses = [
  ...courses,
  {
    id: "long_uuid",
    title:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga sint tenetur exercitationem ex, dicta modi nulla molestias aut non nihil.",
    category: "quality",
    seats: 3,
    version: 1,
  },
];

const App = () => {
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<null | string>(null);

  const visibleData = allCourses.filter((course) => {
    if (category == "all") return true;
    return course.category === category;
  });

  return (
    <main>
      <Panel
        title="Фильтр"
        actions={
          <button onClick={() => setCategory("all")}>Сбросить фильтры</button>
        }
      >
        <label>
          Категория{" "}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={"all"}>Все</option>
            <option value={"frontend"}>Frontend</option>
            <option value={"fullstack"}>FullStack</option>
            <option value={"quality"}>Quality</option>
          </select>
        </label>
      </Panel>

      <p>
        Выбран: <strong>{selected ?? "Курс не выбран"}</strong>
      </p>

      {visibleData.map((item) => (
        <Panel
          key={item.id}
          title={item.title}
          actions={
            item.seats > 0 ? (
              <button onClick={() => setSelected(item.id)}>Выбрать курс</button>
            ) : undefined
          }
        >
          <p>Категория: {item.category}</p>
          <p>Мест: {item.seats}</p>
        </Panel>
      ))}
    </main>
  );
};

export default App;
