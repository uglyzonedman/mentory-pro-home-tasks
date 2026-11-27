import { courses } from "./consts/courses";

export const SelectedInfo = ({ selectedId }: { selectedId: string | null }) => {
  if (selectedId === null) {
    return <p className="block__selected">Курс не выбран</p>;
  }

  const course = courses.find((item) => item.id == selectedId);

  if (course == undefined) {
    return (
      <p className="block__selected">
        Курс с id «<strong>{selectedId}</strong>» не найден
      </p>
    );
  }

  return (
    <p className="block__selected">
      Выбран: <strong>{course.title}</strong> (мест: {course.seats})
    </p>
  );
};
