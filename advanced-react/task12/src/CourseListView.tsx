import type { Course } from "./types";

type Props = {
  items: Course[];
  selectedId: string | null;
  favoriteIds: string[];
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

export const CourseListView = ({
  items,
  selectedId,
  favoriteIds,
  onSelect,
  onToggleFavorite,
}: Props) => {
  if (items.length === 0)
    return <p className="courses__empty">По запросу ничего не найдено</p>;

  return (
    <ul className="courses">
      {items.map((c) => {
        const isFav = favoriteIds.includes(c.id);
        const isSelected = c.id === selectedId;
        return (
          <li
            key={c.id}
            className={`courses__item${isSelected ? " courses__item--active" : ""}`}
          >
            <span className="courses__title">{c.title}</span>
            <span className="courses__actions">
              <button onClick={() => onSelect(c.id)} disabled={isSelected}>
                {isSelected ? "Выбран" : "Выбрать"}
              </button>
              <button
                onClick={() => onToggleFavorite(c.id)}
                aria-pressed={isFav}
              >
                {isFav ? "★ В избранном" : "☆ В избранное"}
              </button>
            </span>
          </li>
        );
      })}
    </ul>
  );
};
