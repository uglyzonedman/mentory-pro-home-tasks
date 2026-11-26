import { courses } from "./consts/courses";
import { CourseCard } from "./CourseCard";

export function WrongSelectedId() {
  return (
    <CourseCard
      course={courses[0]}
      // @ts-expect-error selectedId должен быть string | null, а не number
      selectedId={42}
      onSelect={() => {}}
    />
  );
}
