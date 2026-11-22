import type { Course } from "./types";

type Props = {
  items: Course[];
  onToggle: (id: string) => void;
  onClear: () => void;
};

export const FavoritesPanel = ({ items, onToggle, onClear }: Props) => (
  <section className="block">
    <h2 className="block__title">Избранное ({items.length})</h2>
    {items.length === 0 ? (
      <p className="courses__empty">Пока ничего нет</p>
    ) : (
      <ul className="courses">
        {items.map((c) => (
          <li key={c.id} className="courses__item">
            <span className="courses__title">{c.title}</span>
            <button onClick={() => onToggle(c.id)}>Убрать</button>
          </li>
        ))}
      </ul>
    )}
    <div>
      <button onClick={onClear} disabled={items.length === 0}>
        Очистить избранное
      </button>
    </div>
  </section>
);
