import type { Course } from "./types";

type Props = {
  course: Course | null;
  isInFilter: boolean;
  onReset: () => void;
};

export const SelectedCourse = ({ course, isInFilter, onReset }: Props) => (
  <section className="block">
    <h2 className="block__title">Выбранный курс</h2>
    {course ? (
      <>
        <div className="block__footer">
          <p className="block__selected">
            <strong>{course.title}</strong> ({course.category}, мест:{" "}
            {course.seats})
          </p>
          <button onClick={onReset}>Снять выбор</button>
        </div>
        {!isInFilter && (
          <p className="block__note">
            Курс не входит в текущий поиск, но остаётся выбранным
          </p>
        )}
      </>
    ) : (
      <p className="courses__empty">Курс не выбран</p>
    )}
  </section>
);
