import type { Course } from "./types";

interface CourseCardProps {
  course: Course;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CourseCard({ course, selectedId, onSelect }: CourseCardProps) {
  const isSelected = course.id === selectedId;

  return (
    <article className={isSelected ? "card card--selected" : "card"}>
      <div>
        <h3 className="card__title">{course.title}</h3>
        <p className="card__meta">
          {course.category} · мест: {course.seats} · версия: {course.version}
        </p>
      </div>
      <button onClick={() => onSelect(course.id)} disabled={isSelected}>
        {isSelected ? "Выбран" : "Выбрать"}
      </button>
    </article>
  );
}
