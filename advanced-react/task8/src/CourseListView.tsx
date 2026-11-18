type Props = {
  items: {
    id: string;
    title: string;
    category: string;
    seats: number;
    version: number;
  }[];
  emptyText: string;
  onSelect: (id: string) => void;
};

export const CourseListView = ({ items, emptyText, onSelect }: Props) => {
  if (items.length === 0) {
    return <p className="courses__empty">{emptyText}</p>;
  }
  return (
    <ul className="courses">
      {items.map((course) => (
        <li key={course.id} className="courses__item">
          <span className="courses__title">{course.title}</span>
          <button onClick={() => onSelect(course.id)}>Выбрать</button>
        </li>
      ))}
    </ul>
  );
};
