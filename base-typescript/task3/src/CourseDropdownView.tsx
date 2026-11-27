import { courses } from "./consts/courses";
import { useSelection } from "./hooks/useSelection";
import { SelectedInfo } from "./SelectedInfo";

export function CourseDropdownView() {
  const { selectedId, select, reset } = useSelection(null);

  return (
    <section className="block">
      <h2 className="block__title">Представление 2: выпадающий список</h2>
      <label className="block__label">
        Курс
        <select
          value={selectedId ?? ""}
          onChange={(e) =>
            e.target.value === "" ? reset() : select(e.target.value)
          }
        >
          <option value="">— не выбран —</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </label>
      <SelectedInfo selectedId={selectedId} />
      <button onClick={reset} disabled={selectedId === null}>
        Сбросить
      </button>
    </section>
  );
}
