import { CourseTable } from "./CourseTable";
import { sortedCourse } from "./sortedCourse";
import type { ListProps } from "./types";

export const ListWithoutMemo = ({ items, sortKey, direction }: ListProps) => {
  const list = sortedCourse(items, sortKey, direction);
  return <CourseTable list={list} />;
};
