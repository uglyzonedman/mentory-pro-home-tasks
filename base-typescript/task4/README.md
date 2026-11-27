# Task 4 — дженерик groupBy

Функция `groupBy<T>` раскладывает массив по группам и сохраняет тип элементов:
в группах курсов лежат `Course`, в группах заявок — `CourseRequest`.

## Что внутри

- `groupBy.ts` — `groupBy<T>(items: readonly T[], getKey: (item: T) => string): Record<string, T[]>`,
  собирает группы через `Map` и не мутирует исходный массив.
- `requests.ts` — `RequestStatus` (`"new" | "approved" | "rejected"`) и заявки `CourseRequest`.
- `groupBy.typecheck.ts` — проверки типов через `@ts-expect-error`: у `Course` нет
  `status`, у `CourseRequest` нет `title`, ключ `seats: number` запрещён.
- `App` — показывает группы курсов по `category`, заявок по `status`, результат для
  пустого массива и список рантайм-проверок.

## Что проверяем

| Проверка | Ожидание |
| --- | --- |
| `courses` и `requests` после группировки | Не изменились |
| `groupBy([], …)` | `{}` |
| `byCategory.frontend` | 2 курса |
| `byStatus.new` | 2 заявки |

## Запуск

```bash
npm install
npm run dev
```
