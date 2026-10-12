import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  ApiKeyItem, 
  AgentApplication, 
  LiveTokenEvent, 
  TeamMember, 
  ExecutionRunResult,
  ProviderType,
  EnvironmentType,
  FreeAiModel,
  AgentCategory
} from '../types';
import { 
  INITIAL_API_KEYS, 
  INITIAL_AGENTS, 
  INITIAL_LIVE_EVENTS, 
  INITIAL_TEAM_MEMBERS 
} from '../data/initialData';
import { FREE_AI_MODELS } from '../data/freeAiModels';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export type NavTabType = 'launchpad' | 'free_ai' | 'agents' | 'vault' | 'tokens' | 'sharing' | 'architecture' | 'guide';

interface AppContextType {
  // Theme: Dark vs Light mode
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;

  // Mode: Simple (for regular users) vs Pro (for developers & sysadmins)
  userMode: 'simple' | 'pro';
  setUserMode: (mode: 'simple' | 'pro') => void;
  toggleUserMode: () => void;

  // On-screen Russian explanatory tooltips & guidance
  showHelpTooltips: boolean;
  setShowHelpTooltips: (show: boolean) => void;
  toggleHelpTooltips: () => void;

  // Navigation
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;

  // Search & Global filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  selectedProviderFilter: ProviderType | 'all';
  setSelectedProviderFilter: (p: ProviderType | 'all') => void;
  selectedEnvFilter: EnvironmentType | 'all';
  setSelectedEnvFilter: (env: EnvironmentType | 'all') => void;

  // Free AI Models Catalog
  freeModels: FreeAiModel[];

  // API Keys
  apiKeys: ApiKeyItem[];
  addApiKey: (key: Omit<ApiKeyItem, 'id' | 'createdAt' | 'lastUsedAt' | 'consumedTokensMonth' | 'linkedAgentCount'>) => void;
  updateApiKey: (id: string, updates: Partial<ApiKeyItem>) => void;
  deleteApiKey: (id: string) => void;
  toggleKeyActive: (id: string) => void;
  testKeyLatency: (id: string) => Promise<number>;
  revealedKeyIds: Set<string>;
  toggleRevealKey: (id: string) => void;

  // Agent Applications
  agents: AgentApplication[];
  addAgent: (agent: Omit<AgentApplication, 'id' | 'totalExecutions' | 'totalTokensBurned' | 'lastExecutedAt' | 'costEstimateUsd'>) => void;
  updateAgent: (id: string, updates: Partial<AgentApplication>) => void;
  deleteAgent: (id: string) => void;
  toggleAgentStatus: (id: string) => void;
  regenerateAgentToken: (id: string) => void;

  // Real-time Token Monitor
  liveEvents: LiveTokenEvent[];
  isLiveSimulationActive: boolean;
  setIsLiveSimulationActive: (active: boolean) => void;
  totalPoolTokens: number;
  consumedPoolTokens: number;
  todayTokensBurned: number;
  todayCostUsd: number;
  lowBalanceThresholdPercent: number;
  setLowBalanceThresholdPercent: (val: number) => void;
  resetTokenMetrics: () => void;

  // Interactive Runner Modal
  runnerModalAgent: AgentApplication | null;
  openRunnerModal: (agent: AgentApplication, initialPrompt?: string) => void;
  closeRunnerModal: () => void;
  runAgentExecution: (agentId: string, promptText: string) => Promise<ExecutionRunResult>;
  recentRuns: ExecutionRunResult[];
  runnerInitialPrompt: string;

  // Team
  teamMembers: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id' | 'lastActive'>) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'agenthub_v2_';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state: light by default as requested
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}theme_pref`);
      if (saved === 'dark') return 'dark';
      if (saved === 'light') return 'light';
      return 'light'; // Светлая тема по умолчанию
    } catch {
      return 'light';
    }
  });

  // Sync theme with <html> classList
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}theme_pref`, theme);
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}theme`, theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast(
        next === 'light' ? 'Включена светлая тема оформления' : 'Включена темная тема оформления',
        'info'
      );
      return next;
    });
  };

  // Mode state: default to 'simple' for intuitive user experience as requested!
  const [userMode, setUserMode] = useState<'simple' | 'pro'>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}mode`);
      return saved === 'pro' ? 'pro' : 'simple';
    } catch {
      return 'simple';
    }
  });

  const [showHelpTooltips, setShowHelpTooltips] = useState<boolean>(true);

  // Navigation
  const [activeTab, setActiveTab] = useState<NavTabType>('launchpad');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedProviderFilter, setSelectedProviderFilter] = useState<ProviderType | 'all'>('all');
  const [selectedEnvFilter, setSelectedEnvFilter] = useState<EnvironmentType | 'all'>('all');

  // Keys
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}keys`);
      return saved ? JSON.parse(saved) : INITIAL_API_KEYS;
    } catch {
      return INITIAL_API_KEYS;
    }
  });

  const [revealedKeyIds, setRevealedKeyIds] = useState<Set<string>>(new Set());

  // Agents
  const [agents, setAgents] = useState<AgentApplication[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}agents`);
      if (saved) {
        const parsed: AgentApplication[] = JSON.parse(saved);
        // Exclude obsolete telematics agent
        const filtered = parsed.filter((a) => a.id !== 'agent-telematics-glonass-rf');
        const requiredNewIds = [
          'agent-fgis-zerno',
          'agent-chestny-znak',
          'agent-fgis-mercury',
          'agent-fgis-saturn',
          'agent-vetis-platform'
        ];
        const existingIds = new Set(filtered.map((a) => a.id));
        const missingFromInitial = INITIAL_AGENTS.filter((a) => requiredNewIds.includes(a.id) && !existingIds.has(a.id));
        if (missingFromInitial.length > 0 || filtered.length !== parsed.length) {
          const merged = [...filtered, ...missingFromInitial];
          try {
            localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}agents`, JSON.stringify(merged));
          } catch {}
          return merged;
        }
        return parsed;
      }
      return INITIAL_AGENTS;
    } catch {
      return INITIAL_AGENTS;
    }
  });

  // Live Token Events
  const [liveEvents, setLiveEvents] = useState<LiveTokenEvent[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}live_events`);
      return saved ? JSON.parse(saved) : INITIAL_LIVE_EVENTS;
    } catch {
      return INITIAL_LIVE_EVENTS;
    }
  });

  const [isLiveSimulationActive, setIsLiveSimulationActive] = useState<boolean>(true);
  const [todayTokensBurned, setTodayTokensBurned] = useState<number>(3124500);
  const [todayCostUsd, setTodayCostUsd] = useState<number>(7.42);
  const [totalPoolTokens] = useState<number>(150000000);
  const [consumedPoolTokens, setConsumedPoolTokens] = useState<number>(24500000);
  const [lowBalanceThresholdPercent, setLowBalanceThresholdPercent] = useState<number>(25);

  // Runner
  const [runnerModalAgent, setRunnerModalAgent] = useState<AgentApplication | null>(null);
  const [runnerInitialPrompt, setRunnerInitialPrompt] = useState<string>('');
  const [recentRuns, setRecentRuns] = useState<ExecutionRunResult[]>([]);

  // Team
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}team`);
      return saved ? JSON.parse(saved) : INITIAL_TEAM_MEMBERS;
    } catch {
      return INITIAL_TEAM_MEMBERS;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleUserMode = () => {
    setUserMode((prev) => {
      const next = prev === 'simple' ? 'pro' : 'simple';
      try {
        localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}mode`, next);
      } catch {}
      showToast(
        next === 'simple' 
          ? 'Включен Простой режим (упрощенный интерфейс с подсказками)' 
          : 'Включен Режим разработчика / PRO (расширенные параметры и cURL)',
        'info'
      );
      return next;
    });
  };

  const toggleHelpTooltips = () => {
    setShowHelpTooltips((prev) => {
      const next = !prev;
      showToast(next ? 'Подробные подсказки включены' : 'Подсказки скрыты', 'info');
      return next;
    });
  };

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}keys`, JSON.stringify(apiKeys));
    } catch {}
  }, [apiKeys]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}agents`, JSON.stringify(agents));
    } catch {}
  }, [agents]);

  // Recalculate linked agent counts for keys
  useEffect(() => {
    setApiKeys((prevKeys) => 
      prevKeys.map((key) => {
        const count = agents.filter(
          (a) => a.primaryKeyId === key.id || a.fallbackKeyId === key.id
        ).length;
        return key.linkedAgentCount !== count ? { ...key, linkedAgentCount: count } : key;
      })
    );
  }, [agents]);

  // Real-time token consumption ticker simulation
  useEffect(() => {
    if (!isLiveSimulationActive) return;

    const interval = setInterval(() => {
      const activeAgents = agents.filter((a) => a.status === 'online' || a.status === 'running');
      if (activeAgents.length === 0) return;

      const randomAgent = activeAgents[Math.floor(Math.random() * activeAgents.length)];
      const linkedKey = apiKeys.find((k) => k.id === randomAgent.primaryKeyId);
      const provider = linkedKey?.provider || 'google';

      const promptTokens = Math.floor(Math.random() * 600) + 120;
      const completionTokens = Math.floor(Math.random() * 500) + 90;
      const totalTokens = promptTokens + completionTokens;
      
      const costPerThousand = provider === 'anthropic' ? 0.003 : provider === 'gigachat' ? 0.001 : provider === 'google' ? 0.0008 : 0.0005;
      const cost = Number(((totalTokens / 1000) * costPerThousand).toFixed(5));

      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      const newEvent: LiveTokenEvent = {
        id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: timeStr,
        agentId: randomAgent.id,
        agentName: randomAgent.name,
        provider,
        model: randomAgent.model,
        accountOwner: `${randomAgent.accountOwner} (${randomAgent.accountEmail})`,
        promptTokens,
        completionTokens,
        totalTokens,
        costUsd: cost,
        durationMs: Math.floor(Math.random() * 500) + 80,
        status: 'success'
      };

      setLiveEvents((prev) => [newEvent, ...prev.slice(0, 49)]);
      setTodayTokensBurned((prev) => prev + totalTokens);
      setTodayCostUsd((prev) => Number((prev + cost).toFixed(4)));
      setConsumedPoolTokens((prev) => prev + totalTokens);

      setAgents((prev) => 
        prev.map((a) => 
          a.id === randomAgent.id 
            ? {
                ...a,
                totalExecutions: a.totalExecutions + 1,
                totalTokensBurned: a.totalTokensBurned + totalTokens,
                costEstimateUsd: Number((a.costEstimateUsd + cost).toFixed(2)),
                lastExecutedAt: 'Только что'
              }
            : a
        )
      );

      if (linkedKey) {
        setApiKeys((prev) =>
          prev.map((k) =>
            k.id === linkedKey.id
              ? {
                  ...k,
                  consumedTokensMonth: k.consumedTokensMonth + totalTokens,
                  lastUsedAt: 'Только что'
                }
              : k
          )
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveSimulationActive, agents, apiKeys]);

  // Key operations
  const addApiKey = (newKeyData: Omit<ApiKeyItem, 'id' | 'createdAt' | 'lastUsedAt' | 'consumedTokensMonth' | 'linkedAgentCount'>) => {
    const id = `key-${Date.now().toString(36)}`;
    const masked = newKeyData.keyValue.length > 8
      ? `${newKeyData.keyValue.substring(0, 7)}...${newKeyData.keyValue.substring(newKeyData.keyValue.length - 4)}`
      : '***...***';

    const newKey: ApiKeyItem = {
      ...newKeyData,
      id,
      keyMasked: masked,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsedAt: 'Никогда',
      consumedTokensMonth: 0,
      linkedAgentCount: 0,
      pingLatencyMs: Math.floor(Math.random() * 70) + 30
    };

    setApiKeys((prev) => [newKey, ...prev]);
    showToast(`Ключ "${newKey.name}" добавлен в ваш сейф`, 'success');
  };

  const updateApiKey = (id: string, updates: Partial<ApiKeyItem>) => {
    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, ...updates } : k))
    );
    showToast('Параметры ключа сохранены', 'success');
  };

  const deleteApiKey = (id: string) => {
    const keyToDelete = apiKeys.find((k) => k.id === id);
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
    showToast(`Ключ "${keyToDelete?.name || id}" удален`, 'info');
  };

  const toggleKeyActive = (id: string) => {
    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, isActive: !k.isActive } : k))
    );
  };

  const testKeyLatency = async (id: string): Promise<number> => {
    const start = performance.now();
    await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 90) + 40));
    const latency = Math.round(performance.now() - start);

    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, pingLatencyMs: latency, lastUsedAt: 'Только что' } : k))
    );
    showToast(`Ключ активен! Связь отличная: отклик ${latency} мс`, 'success');
    return latency;
  };

  const toggleRevealKey = (id: string) => {
    setRevealedKeyIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Agent operations
  const addAgent = (agentData: Omit<AgentApplication, 'id' | 'totalExecutions' | 'totalTokensBurned' | 'lastExecutedAt' | 'costEstimateUsd'>) => {
    const id = `agent-${Date.now().toString(36)}`;
    const newAgent: AgentApplication = {
      ...agentData,
      id,
      totalExecutions: 0,
      totalTokensBurned: 0,
      lastExecutedAt: 'Никогда',
      costEstimateUsd: 0,
    };
    setAgents((prev) => [newAgent, ...prev]);
    showToast(`Помощник "${newAgent.name}" успешно создан!`, 'success');
  };

  const updateAgent = (id: string, updates: Partial<AgentApplication>) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
    showToast('Настройки помощника обновлены', 'success');
  };

  const deleteAgent = (id: string) => {
    const a = agents.find((ag) => ag.id === id);
    setAgents((prev) => prev.filter((ag) => ag.id !== id));
    showToast(`Помощник "${a?.name || id}" удален`, 'info');
  };

  const toggleAgentStatus = (id: string) => {
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'online' || a.status === 'running' ? 'idle' : 'online';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const regenerateAgentToken = (id: string) => {
    const newToken = `ag_live_${Math.random().toString(36).substring(2, 12)}`;
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const baseUrl = a.launchUrl.split('?')[0];
          return {
            ...a,
            sharedToken: newToken,
            launchUrl: `${baseUrl}?token=${newToken}`
          };
        }
        return a;
      })
    );
    showToast('Секретная ссылка и токен доступа успешно обновлены', 'success');
  };

  const openRunnerModal = (agent: AgentApplication, initialPrompt?: string) => {
    setRunnerModalAgent(agent);
    setRunnerInitialPrompt(initialPrompt || (agent.sampleQuestions?.[0] || ''));
  };

  const closeRunnerModal = () => {
    setRunnerModalAgent(null);
    setRunnerInitialPrompt('');
  };

  // Execution runner with realistic Russian business domain outputs
  const runAgentExecution = async (agentId: string, promptText: string): Promise<ExecutionRunResult> => {
    const agent = agents.find((a) => a.id === agentId);
    if (!agent) throw new Error('Agent not found');

    const startTime = performance.now();
    await new Promise((resolve) => setTimeout(resolve, 1100));
    const duration = Math.round(performance.now() - startTime);

    const promptTokens = Math.max(15, Math.floor(promptText.length / 2.8));
    const completionTokens = Math.floor(Math.random() * 480) + 210;
    const totalTokens = promptTokens + completionTokens;
    const cost = Number(((totalTokens / 1000) * 0.0012).toFixed(5));

    // Tailored answers based on domain and model
    let output = '';
    if (agent.id === 'agent-qwen-coder') {
      output = `[Вывод Alibaba Qwen 2.5 Coder 32B]:
1. Архитектура компонента сформирована с использованием React 19, TypeScript и утилитных классов Tailwind CSS.
2. Реализована строгая валидация входящих пропсов, предотвращение лишних ререндеров через useMemo/useCallback.
3. Код полностью адаптивен под мобильные экраны (breakpoint sm/md/lg) и протестирован на соответствие стандартам доступности (WCAG AA).`;
    } else if (agent.id === 'agent-kimi-contract-deep') {
      output = `[Анализ Moonshot Kimi K1.5 (2M Tokens Ultra-Long Context)]:
1. Проанализирован полный массив документации (договор, спецификации, гарантийные письма и приложения).
2. Выявлено скрытое противоречие: в п. 4.2 срок устранения дефектов установлен в 5 рабочих дней, тогда как в п. 12.1 Регламента задержка свыше 48 часов влечет штраф 50 000 руб.
3. Рекомендация: гармонизировать сроки и устранить двоякое толкование для исключения судебных споров в Арбитражном суде.`;
    } else if (agent.id === 'agent-zai-glm-scout') {
      output = `[Отчет корпоративного скоринга Z.ai GLM-4-Flash]:
1. Структура владения: уставный капитал 10 000 руб, генеральный директор не числится в реестре дисквалифицированных лиц ФНС.
2. Арбитражная нагрузка за последние 12 месяцев: 2 завершенных дела в качестве ответчика по взысканию неустойки на общую сумму 142 000 руб (исполнены добровольно).
3. Индекс финансовой благонадежности: 78/100 (средний риск). Рекомендуется согласовать частичную предоплату не более 30% либо расчет по факту УПД.`;
    } else if (agent.id === 'agent-logoai-branding') {
      output = `[Генератор айдентики LogoAI Visual Studio]:
1. Разработаны 3 векторные концепции логотипа: «Геометрическая стрела скорости», «Монограмма экспресса», «Скандинавский минимализм».
2. Корпоративная палитра бренда:
   - Primary: #0284C7 (Sky Blue — надежность и технологии)
   - Accent: #F59E0B (Amber Gold — скорость и приоритет)
   - Neutral: #0F172A (Deep Slate — премиальный статус)
3. Ассеты адаптированы для размещения на бортах фур, фавиконах сайтов и фирменных бланках УПД.`;
    } else if (agent.id === 'agent-kling-video-studio') {
      output = `[Сценарный план Kling 1.5 & Hailuo Video-01]:
Хронометраж: 30 секунд (Формат 16:9 4K / 60fps)
- Кадр 1 (0-6 сек): Тягач на скоростной трассе на рассвете. Промпт: "Cinematic dynamic shot of modern heavy cargo truck driving on snow-covered highway during golden hour, 8k photorealistic, motion blur, hyper-detailed".
- Кадр 2 (7-15 сек): Крупный план — водитель сканирует QR-код электронного путевого листа в планшете.
- Кадр 3 (16-30 сек): Прибытие на логистический хаб, финальный логотип компании с титрами «Доставка точно в срок по всей России».`;
    } else if (agent.id === 'agent-hunyuan-logistics-ocr') {
      output = `[Распознавание Tencent Hunyuan Vision MOE]:
1. Тип документа: Транспортная накладная (форма по Постановлению Правительства РФ № 2200).
2. Извлеченные поля:
   - Грузоотправитель: ООО «ПромСнаб-М» (ИНН 7701928301)
   - Водитель / ТС: Иванов А.В. / КАМАЗ-54901 (госномер О777АА777)
   - Номер пломбы: PL-994821 (целостность подтверждена)
   - Масса брутто: 18 420 кг (в пределах весогабаритных норм).`;
    } else if (agent.id === 'agent-mimo-pc-iot') {
      output = `[Диагностический отчет Xiaomi Mimo AI]:
1. Анализ журнала событий телематики: задержка пакетов вызвана переключением базовых станций 2G/LTE в роуминге.
2. Проверка офисного ПК: обнаружен конфликт службы SMBv1. Рекомендовано включить параметр "EnableLinkedConnections=1" в ветке реестра HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System.
3. Соединение с сервером Wialon стабилизировано, пакеты телеметрии поступают без потерь.`;
    } else if (agent.id === 'agent-jev-decision-router') {
      output = `[TypeSafe Jev System One Decision Engine // 12ms Parallel Pass // Zero Hallucination]:
{
  "decision_id": "jev_dec_99410",
  "status": "DETERMINISTIC_PASS",
  "confidence_score": 0.9984,
  "inference_latency_ms": 11.8,
  "classified_class": "MEDIUM_RISK_AUDIT_REQUIRED",
  "risk_probabilities": {
    "low_risk": 0.042,
    "medium_risk": 0.894,
    "critical_fraud": 0.064
  },
  "typed_flags": {
    "is_new_counterparty": true,
    "capital_below_benchmark": true,
    "tax_article_54_1_compliant": false,
    "advance_payment_approved": false,
    "automatic_approval": false,
    "manual_cfo_signoff_required": true
  },
  "actionable_decision": "Блокировать 100% аванс. Перевести на факторинг либо постоплату по УПД. Назначить выездной осмотр склада."
}`;
    } else if (agent.id === 'agent-fgis-zerno' || agent.category === 'Учет ФГИС Зерно') {
      output = `[Регламентный протокол ФГИС «Зерно» // YandexGPT Pro + Агро-Схемы]:
1. Оформление СДИЗ на перемещение зерна:
   - В соответствии с Постановлением Правительства РФ № 1722, СДИЗ формируется не позднее дня перемещения партии зерна.
   - Обязательные реквизиты: масса нетто, код ТН ВЭД / ОКПД 2 (10.11.11), номер партии зерна в реестре, реквизиты перевозчика (ИНН, госномер ТС).
2. Гашение СДИЗ:
   - Приемщик обязан погасить СДИЗ в течение 1 рабочего дня с момента подписания товарно-транспортной накладной (ТТН/1-Т) или подтверждения фактической приемки на элеваторе.
3. Корректировка остатков:
   - При расхождении массы в пределах естественной убыли формируется акт разногласий (ТОРГ-2) с автоматическим пересчетом баланса партии во ФГИС Зерно.`;
    } else if (agent.id === 'agent-chestny-znak' || agent.category.includes('Честный знак')) {
      output = `[Верификация ЦРПТ «Честный Знак» // TypeSafe Jev & КИЗ ЭДО]:
1. Валидация структуры кода маркировки DataMatrix:
   - Код товара (GTIN): 14 символов (04607000000000) — корректен.
   - Серийный номер (SN): 13 символов — уникален в рамках партии.
   - Криптохвост (Криптоключ 4 симв. + Криптоподпись 44 симв.) — статус: «Валиден. Эмитирован».
2. Ввод в оборот и ЭДО (УПД):
   - Статус в ГИС МТ: подготовлен к вводу в оборот с типом «Производство РФ» / «Импорт».
   - Передача прав через УПД с функцией СЧФДОП по формату 5.03/820@ ФНС.
   - Время фиксации в системе: мгновенно (0.012 сек через API СУЗ ЦРПТ).
3. Рекомендация: Отклоненный УПД в Диадок/СБИС переотправить после проверки статуса родительского SSCC-агрегата.`;
    } else if (agent.id === 'agent-fgis-mercury' || agent.category.includes('Меркурий')) {
      output = `[Ветеринарный протокол ФГИС «Меркурий» // Z.ai GLM-4-Flash & ВетИС]:
1. Гашение входящего электронного ВСД:
   - Срок гашения согласно Приказу Минсельхоза РФ № 862: не позднее 24 часов после окончания доставки и приемки подконтрольной продукции.
   - При частичной приемке: обязательно сформировать Акт несоответствия с указанием фактического веса нетто; на непринятый объем автоматически генерируется возвратный ВСД.
2. Проверка маршрута и времени («нелогичные перемещения»):
   - Алгоритм мониторинговой группы Россельхознадзора фиксирует среднюю скорость перемещения ТС > 90 км/ч или разрыв между выпиской и гашением.
   - В ответе на предостережение приложить путевой лист с отметкой ГЛОНАСС и объяснительную записку водителя.
3. Баланс журнала продукции: инвентаризация проведена без превышения допустимой технологической погрешности (не более 5%).`;
    } else if (agent.id === 'agent-fgis-saturn' || agent.category.includes('Сатурн')) {
      output = `[Агрохимический аудит ФГИС «Сатурн» // Moonshot Kimi K1.5 (2M)]:
1. Оформление Акта применения пестицидов и агрохимикатов:
   - Согласно ст. 15.2 Федерального закона № 109-ФЗ, акт применения оформляется не позднее 3 дней со дня завершения работ по внесению препаратов.
   - Обязательна привязка к кадастровому номеру земельного участка сельхозназначения и культуре севооборота.
2. Регламент оповещения населения и пчеловодов:
   - Информирование через СМИ и администрации сельских поселений не ранее чем за 10 дней и не позднее чем за 3 дня до начала химобработки полей.
   - Класс опасности для пчел (1–3 класс): соблюдение погранично-защитной зоны (от 1 до 5 км).
3. Накладные ПАТ: сверка с реестром разрешенных препаратов Минсельхоза РФ (Государственный каталог пестицидов) завершена успешно.`;
    } else if (agent.id === 'agent-vetis-platform' || agent.category.includes('Ветис')) {
      output = `[Комплексный статус экосистемы ВетИС // DeepSeek-V3 Platform Admin]:
1. Компонент «Цербер»:
   - Хозяйствующий субъект и площадка (производственный цех / распределительный центр) подтверждены со статусом «Подтвержден» в реестре поднадзорных объектов.
2. Компонент «Аргус»:
   - Разрешение Россельхознадзора на межрегиональную транспортировку / импорт действует, квота не исчерпана.
3. Компонент «Веста»:
   - Лабораторные исследования аккредитованной ветлаборатории подвязаны к партии. Микробиологические показатели соответствуют нормам ТР ТС 021/2011 и ТР ТС 034/2013.
4. Администрирование «ВетИС.Паспорт»:
   - Права уполномоченных лиц активны. Для разблокировки профиля при предписании: направить официальное ходатайство через Госуслуги в адрес территориального управления Россельхознадзора с протоколом устранения нарушений.`;
    } else if (agent.category === 'Бухгалтерские услуги в РФ') {
      output = `[Ответ Главбуха РФ]:
1. Согласно ст. 346.21 НК РФ, индивидуальные предприниматели на УСН «Доходы» (6%) вправе уменьшить исчисленную сумму налога на фиксированные страховые взносы на ОПС и ОМС в размере 100% (без наемных работников) или до 50% (при наличии работников).
2. За 2026 год взносы признаются подлежащими уплате независимо от фактического перечисления платежей в течение года.
3. Проводка в 1С: Дт 68.12 (ЕНС Налог при УСН) Кт 51 — при уплате ЕНП, и операция «Зачет аванса по ЕНС» в конце налогового периода.`;
    } else if (agent.category === 'Юридические услуги в РФ') {
      output = `[Юридическое заключение по ГК РФ]:
1. Пункт о задержке оплаты до получения средств от третьего лица противоречит ст. 314 и ст. 327.1 ГК РФ, если вы не являетесь субподрядчиком с зеркальным договором. Риск: Заказчик может заморозить выплату на неопределенный срок.
2. Рекомендация: Заменить на условие: «Оплата производится не позднее 10 рабочих дней с момента подписания универсального передаточного документа (УПД)».
3. Для обеспечения платежа рекомендуем включить законную неустойку по ст. 395 ГК РФ или договорную пеню 0.1% за каждый день просрочки.`;
    } else if (agent.category === 'Учет и сопровождение перевозчиков в РФ') {
      output = `[Анализ транспортного регламента]:
1. По электронным путевым листам (ГИС ЭПД): отметка медработника заверяется усиленной квалифицированной (УКЭП) или усиленной неквалифицированной подписью (УНЭП) через Госуслуги в соответствии с Приказом Минтранса № 390.
2. Штраф за перегруз на автоматической рамке: при наливных грузах допустимо гидродинамическое смещение центра тяжести по осям. Рекомендуем запросить видеозапись прохождения рамки и подать жалобу в Ространснадзор в течение 10 дней с даты постановления.
3. Расход ГСМ: базовые нормы Минтранса учитывают зимнюю надбавку (+10% до +18% в зависимости от региона РФ).`;
    } else if (agent.category === 'Анализ и проверка контрагентов по бизнесу РФ') {
      output = `[Отчет проверки контрагента]:
- Проверка по ст. 54.1 НК РФ: Новый контрагент со сроком регистрации до 6 месяцев и минимальным уставным капиталом 10 000 руб. относится к группе повышенного налогового внимания.
- Судебные риски (КАД Арбитр): открытых исков не обнаружено, заявлений о банкротстве в ЕФРСБ нет.
- База ФССП: исполнительных производств на сумму свыше 50 000 руб. не зафиксировано.
- Рекомендация службы безопасности: отказаться от 100% предоплаты, согласовать постоплату по факту поставки или аккредитив.`;
    } else if (agent.category === 'Настройка ПК и работа с файлами') {
      output = `[Готовое решение ИТ-помощника]:
Вот готовый безопасный скрипт для пакетного переименования файлов по дате в PowerShell:

Get-ChildItem -Path "C:\\ВашаПапка" -Filter *.pdf | ForEach-Object {
    $datePrefix = $_.CreationTime.ToString("yyyy-MM-dd_")
    $newName = $datePrefix + $_.Name
    Rename-Item -Path $_.FullName -NewName $newName
}

Инструкция: Нажмите Win+R, введите powershell, вставьте данный код (заменив путь к вашей папке) и нажмите Enter. Скрипт мгновенно обработает все файлы.`;
    } else {
      output = `[Успешный результат выполнения]:
Запрос принят и обработан специализированной моделью ${agent.model}.
Все параметры соответствуют регламентам и нормам законодательства РФ.
Затрачено токенов: ${totalTokens} (Входных: ${promptTokens}, Выходных: ${completionTokens}). Время ответа: ${duration} мс.`;
    }

    const result: ExecutionRunResult = {
      runId: `run-${Date.now()}`,
      agentId: agent.id,
      inputPrompt: promptText,
      outputResponse: output,
      tokensPrompt: promptTokens,
      tokensCompletion: completionTokens,
      totalTokens,
      latencyMs: duration,
      status: 'success',
      timestamp: new Date().toLocaleTimeString()
    };

    setRecentRuns((prev) => [result, ...prev.slice(0, 19)]);
    setTodayTokensBurned((prev) => prev + totalTokens);
    setTodayCostUsd((prev) => Number((prev + cost).toFixed(4)));

    setAgents((prev) =>
      prev.map((a) =>
        a.id === agent.id
          ? {
              ...a,
              totalExecutions: a.totalExecutions + 1,
              totalTokensBurned: a.totalTokensBurned + totalTokens,
              costEstimateUsd: Number((a.costEstimateUsd + cost).toFixed(2)),
              lastExecutedAt: 'Только что'
            }
          : a
      )
    );

    const linkedKey = apiKeys.find((k) => k.id === agent.primaryKeyId);
    const event: LiveTokenEvent = {
      id: `evt-run-${Date.now()}`,
      timestamp: new Date().toTimeString().split(' ')[0],
      agentId: agent.id,
      agentName: agent.name,
      provider: linkedKey?.provider || 'google',
      model: agent.model,
      accountOwner: `${agent.accountOwner} (${agent.accountEmail})`,
      promptTokens,
      completionTokens,
      totalTokens,
      costUsd: cost,
      durationMs: duration,
      status: 'success'
    };
    setLiveEvents((prev) => [event, ...prev.slice(0, 49)]);

    return result;
  };

  const addTeamMember = (memberData: Omit<TeamMember, 'id' | 'lastActive'>) => {
    const newMember: TeamMember = {
      ...memberData,
      id: `usr-${Date.now().toString(36)}`,
      lastActive: 'Приглашен'
    };
    setTeamMembers((prev) => [...prev, newMember]);
    showToast(`Пользователь ${newMember.name} добавлен в команду`, 'success');
  };

  const resetTokenMetrics = () => {
    setTodayTokensBurned(0);
    setTodayCostUsd(0);
    showToast('Счетчик дневного потребления сброшен', 'info');
  };

  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme,
    userMode,
    setUserMode,
    toggleUserMode,
    showHelpTooltips,
    setShowHelpTooltips,
    toggleHelpTooltips,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedProviderFilter,
    setSelectedProviderFilter,
    selectedEnvFilter,
    setSelectedEnvFilter,
    freeModels: FREE_AI_MODELS,
    apiKeys,
    addApiKey,
    updateApiKey,
    deleteApiKey,
    toggleKeyActive,
    testKeyLatency,
    revealedKeyIds,
    toggleRevealKey,
    agents,
    addAgent,
    updateAgent,
    deleteAgent,
    toggleAgentStatus,
    regenerateAgentToken,
    liveEvents,
    isLiveSimulationActive,
    setIsLiveSimulationActive,
    totalPoolTokens,
    consumedPoolTokens,
    todayTokensBurned,
    todayCostUsd,
    lowBalanceThresholdPercent,
    setLowBalanceThresholdPercent,
    resetTokenMetrics,
    runnerModalAgent,
    openRunnerModal,
    closeRunnerModal,
    runAgentExecution,
    recentRuns,
    runnerInitialPrompt,
    teamMembers,
    addTeamMember,
    toasts,
    showToast,
    removeToast
  }), [
    theme,
    userMode,
    showHelpTooltips,
    activeTab,
    searchQuery,
    selectedCategoryFilter,
    selectedProviderFilter,
    selectedEnvFilter,
    apiKeys,
    revealedKeyIds,
    agents,
    liveEvents,
    isLiveSimulationActive,
    totalPoolTokens,
    consumedPoolTokens,
    todayTokensBurned,
    todayCostUsd,
    lowBalanceThresholdPercent,
    runnerModalAgent,
    recentRuns,
    runnerInitialPrompt,
    teamMembers,
    toasts
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
