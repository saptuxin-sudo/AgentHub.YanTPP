# Настройка приложения Cline и его агента

Файл описывает, как настроено приложение Cline в этом окружении, где лежат настройки и как их менять.

## Что за приложение установлено

- Cline Cloud Sandbox: пакет `cline-core` **0.1.35** (`/app/package.json`), рантайм `/app/src/index.ts`.
- SDK Cline: `@cline/core`, `@cline/agents`, `@cline/llms`, `@cline/shared` версии **0.0.93** (`/app/node_modules/@cline`).
- Hub слушает `ws://0.0.0.0:8080/hub`, служебный endpoint `http://0.0.0.0:8081/hub-token`.
- Провайдер по умолчанию — `cline` (Cline Cloud), модель — `cline-cloud/deepseek-v4.1-flash`.
  API-ключ вводить не нужно: доступ выдаётся платформой. Инструменты, субагенты и команды (teams) включены.
- Рабочий каталог сессий — `/workspace`, каталог данных Cline — `/home/node/.cline`
  (он же `/workspace/.cline-home`, это один и тот же каталог; из git исключён через `.git/info/exclude`).

## Что было настроено

### 1. Правила агента для проекта — `.clinerules/`

| Файл | Назначение |
| --- | --- |
| `.clinerules/project.md` | Контекст проекта AgentHub: стек, структура, разделы, конвенции кода, что нельзя ломать |
| `.clinerules/workflow.md` | Рабочий процесс: ветки, обязательные проверки (`npm run lint`, `npm run build`), деплой на Beget |

Cline читает `.clinerules/` (файл или каталог с `.md`), `AGENTS.md`, `.cline/rules/` в корне рабочего каталога.
Правила загружаются при старте сессии — после правки файлов нужно начать новую сессию.

### 2. Общие правила для всех сессий — `/home/node/.cline/rules/agenthub-agent.md`

Язык общения, стиль ответов, работа с ветками git, запрет на вывод секретов.
Этот каталог глобальный: правила действуют для любой сессии в окружении.

### 3. Настройки приложения — `/home/node/.cline/data/settings/global-settings.json`

```json
{
  "telemetryOptOut": false,
  "autoUpdateEnabled": true,
  "compactionEnabled": true,
  "compactionStrategy": "agentic",
  "tools": { "web_search": { "enabled": true } }
}
```

- `compactionEnabled` + `compactionStrategy: "agentic"` — сжатие длинных диалогов без потери контекста.
- `tools.web_search.enabled: true` — веб-поиск доступен агенту.
- Параметр `toolAutoApprove` намеренно не задан: режим подтверждения инструментов остаётся таким, каким его передаёт интерфейс.

### 4. MCP-серверы — `/home/node/.cline/data/settings/cline_mcp_settings.json`

Файл создан с пустым списком серверов: `{"mcpServers": {}}`. Пока MCP-серверы не подключены —
встроенных инструментов (файлы, терминал, веб-поиск, GitHub CLI, Composio-коннекторы) достаточно.

Готовые примеры для добавления внутрь `mcpServers` (по одному серверу за раз):

```json
{
  "mcpServers": {
    "fetch": { "type": "stdio", "command": "uvx", "args": ["mcp-server-fetch"] },
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/workspace"]
    },
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "<ваш токен>" }
    }
  }
}
```

Дополнительные поля сервера: `disabled: true` — временно выключить, `timeout` — таймаут в секундах,
`type: "sse" | "streamableHttp"` + `url`, `headers` — для удалённых серверов.
Изменения применяются при старте следующей сессии.

### 5. Исправление зависимостей проекта

В `package.json` devDependency `esbuild` поднята с `^0.25.0` до `^0.28.0`:
vite 8 требует `esbuild ^0.27 || ^0.28`, из-за чего `npm install` падал с ошибкой `ERESOLVE`.
В коде `esbuild` не используется, на сборку это не влияет.

## Провайдеры и модели Google

### Что работает без настройки

- Провайдер по умолчанию — `cline` (Cline Cloud). Ключ не нужен: доступ выдаёт платформа.
- В каталоге провайдера `cline` 466 моделей, из них **46 — Google**: `google/gemini-3.8-flash`, `google/gemini-4-argon`,
  `google/gemini-3.5-flash`, `google/gemini-3.5-flash-lite`, `google/gemini-nano-banana-2.1` и другие
  (список: `GET https://api.cline.bot/api/v1/ai/cline/models`).
- Проверено вживую: сессии с `google/gemini-3.8-flash` и `google/gemini-4-argon` ответили за 2 и 4 секунды.

### Почему не работает «свой ключ Google»

Провайдер `gemini` берёт ключ из `data/settings/providers.json` либо из переменных окружения
(`GEMINI_API_KEY`, `GOOGLE_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`). В этом окружении файла нет и переменные не заданы,
поэтому запрос падает:

- пустой ключ — `Google Generative AI API key is missing. Pass it using the 'apiKey' parameter or the GOOGLE_GENERATIVE_AI_API_KEY environment variable.`
- неверный ключ — `API key not valid. Please pass a valid API key.`

Ключи, введённые в веб-интерфейсе, в песочницу не передаются: в файле сессии
(`data/sessions/<id>/<id>.json`) и в его `metadata` есть только `provider` и `model`, полей с ключами нет.

### Как подключить свой ключ Google

Создать `/home/node/.cline/data/settings/providers.json` (он же `/workspace/.cline-home/data/settings/providers.json`):

```json
{
  "version": 1,
  "lastUsedProvider": "gemini",
  "modes": {},
  "providers": {
    "gemini": {
      "settings": {
        "provider": "gemini",
        "model": "gemini-3.8-flash",
        "apiKey": "<ключ из Google AI Studio>"
      },
      "updatedAt": "2026-10-16T00:00:00.000Z",
      "tokenSource": "manual"
    }
  }
}
```

Схема проверена через `StoredProviderSettingsSchema` — валидна. Ключ не коммитить: файл лежит в `.cline-home`,
который исключён из git через `.git/info/exclude`.

### Смена модели

Модель фиксируется при старте сессии: переключение модели в интерфейсе не влияет на уже открытую сессию —
нужно начать новую.

## Как проверить конфигурацию

```bash
npm install          # зависимости ставятся без ошибок
npm run lint         # tsc --noEmit — без ошибок
npm run build        # vite build — собирается успешно
```

Список правил, которые видит агент, можно получить через SDK Cline:

```bash
node --experimental-strip-types --input-type=module -e '
import { createCoreSettingsService } from "/app/node_modules/@cline/core/dist/index.js";
const s = await createCoreSettingsService().list({ workspaceRoot: "/workspace" });
console.log(s.rules.map(r => `${r.source}: ${r.name}`).join("\n"));
'
```

Ожидаемый вывод: `workspace: project`, `workspace: workflow`, `global: agenthub-agent`, `global: sandbox-resources`.

## Как откатить изменения

- Правила проекта: удалить каталог `.clinerules/`.
- Общие правила: удалить `/home/node/.cline/rules/agenthub-agent.md`.
- Настройки приложения: удалить `/home/node/.cline/data/settings/global-settings.json` (вернутся значения по умолчанию)
  или отдельные поля файла.
- MCP: очистить объект `mcpServers` в `cline_mcp_settings.json`.
