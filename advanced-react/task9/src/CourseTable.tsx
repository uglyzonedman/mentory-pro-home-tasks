import type { Course } from "./types";

export const CourseTable = ({ list }: { list: Course[] }) => {
  return (
    <ol className="courses">
      {list.slice(0, 10).map((c, i) => (
        <li key={c.id} className="courses__item">
          <span className="courses__title">
            <span className="courses__index">{i + 1}.</span> {c.title}
          </span>
          <span className="courses__meta">мест: {c.seats}</span>
        </li>
      ))}
    </ol>
  );
};
