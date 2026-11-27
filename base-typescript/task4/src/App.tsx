import { requests } from "./requests";
import { groupBy } from "./groupBy";
import { courses } from "./consts/courses";

const coursesBefore = JSON.stringify(courses);
const requestsBefore = JSON.stringify(requests);

const byCategory = groupBy(courses, (c) => c.category);
const byStatus = groupBy(requests, (r) => r.status);
const empty = groupBy([], (x: { id: string }) => x.id);

const checks = [
  { name: "courses не изменён", ok: JSON.stringify(courses) === coursesBefore },
  {
    name: "requests не изменён",
    ok: JSON.stringify(requests) === requestsBefore,
  },
  { name: "пустой массив → {}", ok: JSON.stringify(empty) === "{}" },
  { name: "frontend: 2 курса", ok: byCategory.frontend.length === 2 },
  { name: "new: 2 заявки", ok: byStatus.new.length === 2 },
];

export default function App() {
  return (
    <main>
      <h1>
        <code>groupBy</code>
      </h1>

      <section className="block">
        <h2 className="block__title">
          Курсы по <code>category</code>
        </h2>
        <pre className="saved">{JSON.stringify(byCategory, null, 2)}</pre>
      </section>

      <section className="block">
        <h2 className="block__title">
          Заявки по <code>status</code>
        </h2>
        <pre className="saved">{JSON.stringify(byStatus, null, 2)}</pre>
      </section>

      <section className="block">
        <h2 className="block__title">Пустой массив</h2>
        <pre className="saved">{JSON.stringify(empty)}</pre>
      </section>

      <section className="block">
        <h2 className="block__title">Проверки</h2>
        <ul className="checks">
          {checks.map((c) => (
            <li
              key={c.name}
              className={
                c.ok
                  ? "checks__item checks__item--ok"
                  : "checks__item checks__item--fail"
              }
            >
              <span className="checks__mark" aria-hidden="true">
                {c.ok ? "✓" : "✕"}
              </span>
              {c.name}
              <span className="visually-hidden">
                {c.ok ? " — пройдена" : " — не пройдена"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
