import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Database, 
  FileText, 
  Server, 
  ArrowRight,
  TrendingDown,
  EyeOff,
  BellRing
} from 'lucide-react';

export const PromptArchitectView: React.FC = () => {
  const { showToast } = useApp();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const enhancedPromptText = `### РАСШИРЕННЫЙ ПРОМПТ / ТЗ ДЛЯ КОРПОРАТИВНОЙ ПЛАТФОРМЫ AGENTHUB

Разработать отказоустойчивую корпоративную платформу управления ИИ-агентами (AgentOps & LLM Gateway) со следующими функциональными подсистемами:

1. Cryptographic Key Vault & Multi-Account Billing:
   - Изолированное хранилище секретов с шифрованием AES-256-GCM.
   - Привязка API ключей к конкретным владельцам, корпоративным аккаунтам и центрам затрат (Cost Centers).
   - Автоматический пинг-мониторинг латентности эндпоинтов и проверка валидности токенов.
   - Управление квотами: Hard Cap и Soft Cap на уровне месяца/дня для каждого ключа.

2. Agent Lifecycle & Visual Launchpad:
   - Реестр агентных приложений с привязкой Primary LLM и Fallback Failover провайдера.
   - Генерация защищенных токенизированных ссылок для мгновенного запуска (URL Query Tokens, Bearer Header).
   - Графическое представление эндпоинтов, топологии потоков данных и QR-кодов для мобильного доступа.
   - Встроенный интерактивный веб-раннер с возможностью подстройки гиперпараметров (Temperature, Max Tokens, System Context).

3. Real-Time Token Telemetry & Streaming:
   - Потоковый мониторинг расхода токенов через Server-Sent Events (SSE) / WebSockets.
   - Расчет Burn Rate (токенов/сек, токенов/час) и прогнозирование истощения пула (Runway в днях).
   - Настраиваемые пороги алертинга (Webhook в Telegram/Slack/Email при остатке < 20%).

4. Team Collaboration & RBAC:
   - Роли: Owner, Admin, Agent Operator, Viewer.
   - Генерация готовых интеграционных сниппетов (cURL, Python SDK, Node.js, iframe embed).
   - Полный аудит-лог вызовов с фиксацией IP, токенов, стоимости и времени ответа.`;

  const techStackItems = [
    {
      category: 'LLM Gateway & Failover',
      title: 'LiteLLM Proxy / Portkey AI Gateway',
      desc: 'Единый шлюз с автоматическим переключением провайдеров (Google Gemini -> Claude -> DeepSeek) при 429 Rate Limit и балансировкой нагрузки.',
      icon: Server,
      badge: 'Routing'
    },
    {
      category: 'Криптография & Секреты',
      title: 'HashiCorp Vault / Cloud KMS + AES-256',
      desc: 'Envelope encryption для хранения API ключей без риска утечки в логи или клиентские бандлы.',
      icon: ShieldCheck,
      badge: 'Security'
    },
    {
      category: 'Rate Limiting & Очереди',
      title: 'Redis Token Bucket & BullMQ',
      desc: 'Ограничение частоты запросов (RPS) по алгоритму Token Bucket для предотвращения превышения квот провайдеров.',
      icon: Zap,
      badge: 'Performance'
    },
    {
      category: 'Трейсинг & Observability',
      title: 'OpenTelemetry + Langfuse / Helicone',
      desc: 'Сквозной трейсинг каждого вызова агента: детализация prompt/completion токенов, латентность каждого шага, оценка качества.',
      icon: Layers,
      badge: 'Analytics'
    },
    {
      category: 'База данных & RAG',
      title: 'PostgreSQL + pgvector / Supabase',
      desc: 'Реляционная структура для связывания аккаунтов, ролей и агентов + векторный индекс HNSW для контекстного поиска знаний.',
      icon: Database,
      badge: 'Storage'
    },
    {
      category: 'Real-Time протокол',
      title: 'Server-Sent Events (SSE) & WebSocket',
      desc: 'Легковесная двунаправленная передача телеметрии расхода токенов и потоковой генерации ответов LLM без задержек.',
      icon: Cpu,
      badge: 'Real-time'
    }
  ];

  const suggestedFeatures = [
    {
      title: 'Автоматический Cost Optimizer',
      desc: 'Динамическая замена дорогой модели (Gemini 2.5 Pro / GPT-4o) на экономичную (Gemini 2.5 Flash / Groq) для простых запросов с экономией до 70% бюджета.',
      icon: TrendingDown
    },
    {
      title: 'Семантическое кэширование (Semantic Cache)',
      desc: 'Кэширование ответов по векторной близости (cosine similarity > 0.94) в Redis, снижающее расход токенов до 40% при повторяющихся типовых запросах.',
      icon: Zap
    },
    {
      title: 'PII DLP Маскирование (Data Loss Prevention)',
      desc: 'Автоматическое скрытие персональных данных (номера телефонов, паспорта, токены) регулярными выражениями и NER перед отправкой во внешний API.',
      icon: EyeOff
    },
    {
      title: 'Smart Hard Cap & Гранулярные лимиты',
      desc: 'Жесткая блокировка вызовов при исчерпании суточного бюджета для предотвращения случайного выгорания баланса из-за зацикленных агентов.',
      icon: BellRing
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    showToast('Текст скопирован в буфер обмена', 'success');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownloadSpec = () => {
    const blob = new Blob([enhancedPromptText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AgentHub_Architecture_Spec.md';
    link.click();
    showToast('Спецификация скачана в формате Markdown', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Доработка промпта & Архитектурные рекомендации
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Готовая расширенная спецификация ТЗ, передовые технологии для масштабирования и новые функции.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopy(enhancedPromptText, 'prompt')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium transition-colors shadow-sm"
          >
            {copiedSection === 'prompt' ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Копировать промпт</span>
          </button>
          <button
            onClick={handleDownloadSpec}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-900/20 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Скачать Markdown ТЗ</span>
          </button>
        </div>
      </div>

      {/* Enhanced Prompt Display Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200">
              Доработанный промпт (Engineering Prompt Specification)
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/60 text-purple-700 dark:text-purple-300">
            PRODUCTION READY
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
          {enhancedPromptText}
        </div>
      </div>

      {/* Recommended Tech Stack Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2 font-mono">
            <Server className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            Рекомендуемый технологический стек для Enterprise реализации
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Architecture Matrix</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStackItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 uppercase">
                      {item.badge}
                    </span>
                    <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  Слой: {item.category}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested Advanced Features Grid */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm transition-colors">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            Рекомендуемые дополнительные бизнес-функции
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Опции, позволяющие оптимизировать расходы на LLM и гарантировать безопасность данных.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestedFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5 shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 mb-1">{feat.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
