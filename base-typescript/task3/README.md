# Task 3 — типизированный хук useSelection

Хук `useSelection` хранит выбранный курс и отдаёт типизированные `select`
и `reset`. Два независимых представления используют один и тот же хук.

## Что внутри

- `types.ts` — `Course` и `UseSelectionResult` (`selectedId: string | null`,
  `select: (id: string) => void`, `reset: () => void`).
- `hooks/useSelection.ts` — `useState` + стабильные `select` / `reset` через `useCallback`.
- `hooks/useSelection.errors.tsx` — проверка типа через `@ts-expect-error`:
  `select(42)` не компилируется, хук принимает только `string`.
- `CourseButtonsView` — выбор курса кнопками (`aria-pressed` у выбранной).
- `CourseDropdownView` — выбор курса через `<select>`, пустой вариант сбрасывает выбор.
- `SelectedInfo` — показывает выбранный курс, «не выбран» или «не найден».

## Что проверяем

| Действие | Результат |
| --- | --- |
| Жмём кнопку курса | Кнопка подсвечена, ниже «Выбран: …» |
| Выбираем курс в списке | Меняется только второе представление — состояния независимы |
| Жмём «Сбросить» | Выбор очищается, кнопка «Сбросить» снова неактивна |

## Запуск

```bash
npm install
npm run dev
```
