import { useMemo } from "react";
import { CourseTable } from "./CourseTable";
import { sortedCourse } from "./sortedCourse";
import type { ListProps } from "./types";

export const ListWithMemo = ({ items, sortKey, direction }: ListProps) => {
  const list = useMemo(
    () => sortedCourse(items, sortKey, direction),
    [items, sortKey, direction],
  );
  return <CourseTable list={list} />;
};
