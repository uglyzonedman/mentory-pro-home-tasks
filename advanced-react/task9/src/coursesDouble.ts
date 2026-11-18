import courses from "./courses.json";

export const coursesDouble = Array.from({ length: 2000 }, (_, i) => {
  const base = courses[i % courses.length];

  return {
    ...base,
    id: `${base.id}-${i}`,
    title: `${base.title} ${i}`,
    seats: (base.seats + i * 7) % 50,
  };
});
