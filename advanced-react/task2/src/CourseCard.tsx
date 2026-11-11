export interface Course {
  id: string;
  title: string;
  category: "frontend" | "fullstack" | "quality";
  seats: number;
  version: number;
}

type Props = {
  course: Course;
};

const STORAGE_KEY = "selected-course";

export const CourseCard = ({ course: { id, title } }: Props) => {
  console.log(`[render] CourseCard ${id}`);

  const handleSelect = () => {
    localStorage.setItem(STORAGE_KEY, id);
    console.log(`[click] записан id: ${id}`);
  };

  return (
    <article>
      <h3>{title}</h3>
      <button onClick={() => handleSelect()}>Выбрать</button>
    </article>
  );
};
