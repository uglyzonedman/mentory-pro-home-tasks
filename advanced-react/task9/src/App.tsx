import { useState } from "react";
import { coursesDouble } from "./coursesDouble";
import { ListWithMemo } from "./ListWithMemo";
import { ListWithoutMemo } from "./ListWithoutMemo";
import type { Direction, SortKey } from "./types";

const App = () => {
  const [withMemo, setWithMemo] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [direction, setDirection] = useState<Direction>("asc");
  const [count, setCount] = useState(0);

  return (
    <main>
      <section className="block">
        <h2 className="block__title">Настройки</h2>

        <label className="block__check">
          <input
            type="checkbox"
            checked={withMemo}
            onChange={(e) => setWithMemo(e.target.checked)}
          />
          Использовать useMemo
        </label>

        <div className="block__row">
          <label className="block__label">
            Сортировать по
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
            >
              <option value="title">названию</option>
              <option value="seats">местам</option>
            </select>
          </label>
          <label className="block__label">
            Направление
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as Direction)}
            >
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
          </label>
        </div>

        <div>
          <button onClick={() => setCount((c) => c + 1)}>
            Несвязанный счётчик: {count}
          </button>
        </div>
      </section>

      <section className="block">
        <h2 className="block__title">Первые 10 курсов</h2>
        <p className="block__selected">
          Всего записей: <strong>{coursesDouble.length}</strong>, исходный
          первый id: <strong>{coursesDouble[0].id}</strong>
        </p>

        {withMemo ? (
          <ListWithMemo
            direction={direction}
            items={coursesDouble}
            sortKey={sortKey}
          />
        ) : (
          <ListWithoutMemo
            direction={direction}
            items={coursesDouble}
            sortKey={sortKey}
          />
        )}
      </section>
    </main>
  );
};

export default App;
