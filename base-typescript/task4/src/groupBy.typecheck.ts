import { requests } from "./requests";
import { groupBy } from "./groupBy";
import type { Course } from "./types";
import type { CourseRequest } from "./requests";
import { courses } from "./consts/courses";

export function typeChecks() {
  const byCategory = groupBy(courses, (c) => c.category);
  const byStatus = groupBy(requests, (r) => r.status);

  const courseGroup: Course[] = byCategory.frontend;
  const requestGroup: CourseRequest[] = byStatus.new;

  // @ts-expect-error в группе курсов лежат Course, у них нет поля status
  const wrong1 = byCategory.frontend[0].status;

  // @ts-expect-error в группе заявок лежат CourseRequest, у них нет поля title
  const wrong2 = byStatus.new[0].title;

  // @ts-expect-error ключ должен быть string, а seats это number
  const wrong3 = groupBy(courses, (c) => c.seats);

  return { courseGroup, requestGroup, wrong1, wrong2, wrong3 };
}
