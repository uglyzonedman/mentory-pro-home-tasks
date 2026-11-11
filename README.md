# mentory-pro-home-tasks

Домашние задания курса. Все собранные задачи: https://uglyzonedman.github.io/mentory-pro-home-tasks/

## Структура

```
<раздел>/<задача>/   ← отдельный Vite-проект
```

| Задача | Суть |
| --- | --- |
| [advanced-react/task1](advanced-react/task1) | Рендер vs изменение DOM, реконсиляция, cleanup подписки в `useEffect` |

## Деплой

При пуше в `main` GitHub Actions запускает `scripts/build-site.mjs`: он собирает каждую
задачу в `_site/<раздел>/<задача>/` и генерирует главную страницу со ссылками.
Чтобы добавить домашку — просто создай новую папку `<раздел>/<задача>` с Vite-проектом.
