import courses from "./courses.json";

export type Course = (typeof courses)[number];
export type SortKey = "title" | "seats";
export type Direction = "asc" | "desc";

export type ListProps = {
  items: Course[];
  sortKey: SortKey;
  direction: Direction;
};
