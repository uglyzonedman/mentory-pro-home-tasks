# Task 1 — типизация пропсов

Список курсов с выбором одного из них. Все данные и пропсы описаны типами
TypeScript, а неправильное использование компонента ловится на этапе `tsc`.

## Что внутри

- `types.ts` — интерфейс `Course` (`id`, `title`, `category`, `seats`, `version`).
- `consts/courses.ts` — массив `Course[]`.
- `CourseCard` — карточка курса с типизированными пропсами `CourseCardProps`:
  `course`, `selectedId: string | null`, `onSelect: (id: string) => void`.
- `App` — хранит `selectedId` в `useState<string | null>` и рендерит карточки.
- `WrongSelectedId` — намеренно передаёт `selectedId={42}`; ошибка типа
  подавлена `@ts-expect-error`, поэтому сборка проходит, а если ошибку
  «починить» — `tsc` упадёт из-за лишней директивы.

## Что проверяем

| Действие | Результат |
| --- | --- |
| Жмём «Выбрать» на карточке | Карточка подсвечивается, кнопка «Выбран» блокируется |
| Убираем `@ts-expect-error` в `WrongSelectedId` | `tsc` ругается: `number` не присваивается `string \| null` |
| `npm run build` | Сборка проходит без ошибок |

## Запуск

```bash
npm install
npm run dev
```
