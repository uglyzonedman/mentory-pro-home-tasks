import { useCallback, useMemo, useState } from "react";
import courses from "./courses.json";
import { CoursePicker } from "./CoursePicker";

export default function App() {
  const [count, setCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [useCb, setUseCb] = useState(false);
  const [stableOptions, setStableOptions] = useState(true);

  // новая функция на каждый render
  const inlineSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  // одна и та же функция между render'ами
  const memoSelect = useCallback((id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const memoOptions = useMemo(() => ({ showSeats: true }), []);
  const newOptions = { showSeats: true };

  return (
    <main>
      <section className="block">
        <h2 className="block__title">Настройки</h2>

        <label className="block__check">
          <input
            type="checkbox"
            checked={useCb}
            onChange={(e) => setUseCb(e.target.checked)}
          />
          onSelect через useCallback
        </label>

        <label className="block__check">
          <input
            type="checkbox"
            checked={stableOptions}
            onChange={(e) => setStableOptions(e.target.checked)}
          />
          Стабильный объект options (useMemo)
        </label>

        <div className="block__row">
          <button onClick={() => setCount((c) => c + 1)}>
            Несвязанный счётчик: {count}
          </button>
          <button onClick={() => setSelectedIds([])}>Очистить выбор</button>
        </div>
      </section>

      <section className="block">
        <h2 className="block__title">Курсы</h2>
        <p className="block__selected">
          Выбрано: <strong>{selectedIds.join(", ") || "ничего"}</strong>
        </p>

        <CoursePicker
          items={courses}
          selectedIds={selectedIds}
          onSelect={useCb ? memoSelect : inlineSelect}
          options={stableOptions ? memoOptions : newOptions}
        />
      </section>
    </main>
  );
}
