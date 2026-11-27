import { courses } from "./consts/courses";
import { useSelection } from "./hooks/useSelection";
import { SelectedInfo } from "./SelectedInfo";

export function CourseButtonsView() {
  const { selectedId, select, reset } = useSelection(null);

  return (
    <section className="block">
      <h2 className="block__title">Представление 1: кнопки</h2>
      <ul className="courses">
        {courses.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => select(c.id)}
              aria-pressed={c.id === selectedId}
            >
              {c.title}
            </button>
          </li>
        ))}
      </ul>
      <SelectedInfo selectedId={selectedId} />
      <button onClick={reset} disabled={selectedId === null}>
        Сбросить
      </button>
    </section>
  );
}
