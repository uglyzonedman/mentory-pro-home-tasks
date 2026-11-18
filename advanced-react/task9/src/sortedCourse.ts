import type { Course, Direction, SortKey } from "./types";

export const sortedCourse = (
  list: Course[],
  sortKey: SortKey,
  direction: Direction,
) => {
  const start = performance.now();

  const sorted = [...list].sort((a, b) => {
    const result =
      sortKey == "title" ? a.title.localeCompare(b.title) : a.seats - b.seats;
    return direction == "asc" ? result : -result;
  });

  console.log(
    `[sort] ${sortKey} ${direction}: ${(performance.now() - start).toFixed(2)} мс`,
  );

  return sorted;
};
