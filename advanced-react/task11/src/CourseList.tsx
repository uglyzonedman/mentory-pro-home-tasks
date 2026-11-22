import courses from "./courses.json";

type Props = {
  ids: string[];
  onToggle: (id: string) => void;
};

export const CourseList = ({ ids, onToggle }: Props) => (
  <section className="block">
    <h2 className="block__title">Курсы</h2>
    <ul className="courses">
      {courses.map((c) => {
        const isFav = ids.includes(c.id);
        return (
          <li key={c.id} className="courses__item">
            <span className="courses__title">{c.title}</span>
            <button onClick={() => onToggle(c.id)} aria-pressed={isFav}>
              {isFav ? "Убрать из избранного" : "В избранное"}
            </button>
          </li>
        );
      })}
    </ul>
  </section>
);
