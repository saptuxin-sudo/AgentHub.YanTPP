# Проект AgentHub (AgentHub.YanTPP)

## Что это за проект

Единый веб-дашборд для работы с ИИ-агентами. Разделы (вкладки):

- **Launchpad** (`launchpad`) — графический запуск агентов, модальное окно `AgentRunnerModal`.
- **FreeModels** (`free_ai`) — каталог бесплатных нейросетей и инструкции по получению ключей.
- **Agents** (`agents`) — каталог и управление агентами (`AgentsListView`, `CreateAgentModal`).
- **Vault** (`vault`) — хранилище API-ключей, ключи маскируются и не уходят на сервер.
- **TokenMonitor** (`tokens`) — мониторинг расхода токенов и стоимости в реальном времени.
- **Sharing** (`sharing`) — командный доступ, роли Owner / Admin / Agent Operator / Viewer.
- **PromptArchitect** (`architecture`) — ТЗ и архитектура, основной экран режима PRO.
- **Guide** (`guide`) — два мануала: для обычного пользователя и PRO-мануал для администратора.

Целевая аудитория — малый бизнес в РФ (бухгалтерия, юристы, перевозчики, ФГИС Зерно/Меркурий/Сатурн/ВетИС, «Честный знак»).
Весь текст интерфейса — на русском языке, простыми словами, без технического сленга.

## Стек

- React 19 + TypeScript, сборка Vite 8 (`@vitejs/plugin-react`)
- Tailwind CSS 4 через `@tailwindcss/vite`
- Иконки — `lucide-react`, анимации — `motion`
- В зависимостях также `express`, `dotenv`, `@google/genai` (серверная часть в UI не используется)
- Скрипты: `npm run dev` (порт 3000), `npm run build`, `npm run preview`, `npm run lint` (`tsc --noEmit`), `npm run clean`

## Структура

- `src/App.tsx` — сборка экрана: `Navbar`, переключение вкладок, модальные окна, футер.
- `src/context/AppContext.tsx` — единое состояние приложения (тема, режим simple/pro, фильтры, данные, тосты). Тип вкладок: `NavTabType`.
- `src/components/<Раздел>/<Раздел>View.tsx` — экраны разделов; модальные окна — в той же папке.
- `src/components/Navbar.tsx` — верхняя навигация и переключатели темы/режима.
- `src/types/index.ts` — все доменные типы (`ApiKeyItem`, `AgentApplication`, `FreeAiModel`, `LiveTokenEvent`, `TeamMember`, `ExecutionRunResult`, `ProviderType`, `AgentCategory`).
- `src/data/initialData.ts` — стартовые демо-данные (ключи, агенты, события, команда).
- `src/data/freeAiModels.ts` — каталог бесплатных моделей.
- `public/` — готовые архивы для деплоя (`dist-beget.zip`, `full-project.zip`).
- `index.html`, `vite.config.ts`, `metadata.json`, `.env.example` — конфигурация проекта.

## Конвенции проекта

1. Компоненты — функциональные, стиль `export const XxxView: React.FC = () => {...}`.
2. Данные и состояние — только через `useApp()` из `src/context/AppContext.tsx`; не дублировать состояние локально.
3. Новые сущности: тип — в `src/types/index.ts`, стартовые данные — в `src/data/*`, логика — в `AppContext`.
4. Новая вкладка: добавить id в `NavTabType` (`AppContext.tsx`), пункт в массив навигации `Navbar.tsx`, ветку рендера в `App.tsx`.
5. Стили — утилитарные классы Tailwind прямо в JSX. Палитра: `slate` + акцент `cyan`/`purple`/`emerald`. Карточки: `rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm`. Для каждого цвета обязателен парный вариант с `dark:`.
6. Все пользовательские тексты, подсказки и комментарии — на русском. У сущностей есть «человеческие» пояснения (`easyExplanation`, `simpleExplanation`).
7. Иконки — только из `lucide-react`. Новые зависимости не добавлять без явной необходимости.
8. `vite.config.ts` не менять: HMR и watch отключены переменной `DISABLE_HMR` для корректной работы ИИ-агентов.

## Что нельзя ломать

- Не коммитить в `main` напрямую и не перезаписывать историю.
- Не добавлять в репозиторий секреты и реальные API-ключи: `.env*` (кроме `.env.example`), `node_modules/`, `dist/`, каталог `.cline-home/`.
- Не удалять существующие демо-данные: на них построены все экраны и мануалы.
