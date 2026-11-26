# mentory-pro-home-tasks

Домашние задания курса. Все собранные задачи: https://uglyzonedman.github.io/mentory-pro-home-tasks/

## Структура

```
<раздел>/<задача>/   ← отдельный Vite-проект
```

| Задача | Суть |
| --- | --- |
| [advanced-react/task1](advanced-react/task1) | Рендер vs изменение DOM, реконсиляция, cleanup подписки в `useEffect` |
| [advanced-react/task2](advanced-react/task2) | Ререндеры списка карточек, запись выбора в `localStorage` |
| [advanced-react/task5](advanced-react/task5) | Композиция через слоты: `Panel` с `title`, `children` и `actions`, фильтр курсов по категории |
| [advanced-react/task6](advanced-react/task6) | Управляемый (`useState`) и неуправляемый (`useRef`) фильтр курсов с подписанными полями |
| [advanced-react/task7](advanced-react/task7) | Container / View: `CourseCatalogContainer` со стейтом и фильтром, презентационный `CourseListView` |
| [advanced-react/task8](advanced-react/task8) | Подъём состояния: `App` хранит поиск, категорию и выбор, `FilterPanel` и `CourseListView` получают всё через пропсы |
| [advanced-react/task9](advanced-react/task9) | `useMemo`: сортировка 2000 курсов с замером времени, сравнение списка с мемоизацией и без |
| [advanced-react/task10](advanced-react/task10) | `React.memo` + `useCallback` / `useMemo`: стабильные `onSelect` и `options`, лог изменившихся пропсов `CoursePicker` |
| [advanced-react/task11](advanced-react/task11) | Кастомный hook `useFavorites`: `CourseList` и `FavoritesPanel` делят избранное через `App`, два отдельных вызова hook независимы |
| [advanced-react/task12](advanced-react/task12) | Производные данные: `App` хранит только `query`, `selectedId` и избранное, а отфильтрованный список, выбранный курс и счётчики вычисляет на лету |
| [base-typescript/task1](base-typescript/task1) | Типизация пропсов: `Course`, `CourseCardProps`, проверка ошибки типа через `@ts-expect-error` |

## Деплой

При пуше в `main` GitHub Actions запускает `scripts/build-site.mjs`: он собирает каждую
задачу в `_site/<раздел>/<задача>/` и генерирует главную страницу со ссылками.
Чтобы добавить домашку — просто создай новую папку `<раздел>/<задача>` с Vite-проектом.
