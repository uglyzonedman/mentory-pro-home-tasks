import courses from "./courses.json";

type Props = {
  ids: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
};

export const FavoritesPanel = ({ ids, onToggle, onClear }: Props) => {
  const favorites = courses.filter((c) => ids.includes(c.id));

  return (
    <section className="block">
      <h2 className="block__title">Избранное ({ids.length})</h2>
      {favorites.length === 0 ? (
        <p className="courses__empty">Пока ничего не выбрано</p>
      ) : (
        <ul className="courses">
          {favorites.map((c) => (
            <li key={c.id} className="courses__item">
              <span className="courses__title">{c.title}</span>
              <button onClick={() => onToggle(c.id)}>Убрать</button>
            </li>
          ))}
        </ul>
      )}
      <div className="block__footer">
        <p className="block__selected">
          ids: <strong className="block__code">[{ids.join(", ")}]</strong>
        </p>
        <button onClick={onClear} disabled={ids.length === 0}>
          Очистить
        </button>
      </div>
    </section>
  );
};
