import courses from "./courses.json";

export const CoursesList = ({ query }: { query: string }) => {
  const queryClean = query.trim().toLowerCase();

  const listCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(queryClean),
  );

  if (listCourses.length === 0) {
    return <p className="courses__empty">Ничего не найдено</p>;
  }

  return (
    <ul className="courses">
      {listCourses.map((course) => (
        <li key={course.id}>{course.title}</li>
      ))}
    </ul>
  );
};
