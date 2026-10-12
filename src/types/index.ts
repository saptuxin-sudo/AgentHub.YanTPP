export type ProviderType = 
  | 'google' 
  | 'gigachat'
  | 'yandex'
  | 'openai' 
  | 'anthropic' 
  | 'deepseek' 
  | 'groq' 
  | 'mistral' 
  | 'openrouter' 
  | 'huggingface'
  | 'perplexity'
  | 'qwen'
  | 'glm'
  | 'kimi'
  | 'mimo'
  | 'logoai'
  | 'hailuo'
  | 'hunyuan'
  | 'kling'
  | 'jev';

export type EnvironmentType = 'production' | 'staging' | 'development';

export type AgentStatus = 'online' | 'idle' | 'running' | 'warning' | 'offline';

export type AgentCategory =
  | 'Создание приложений и сайтов'
  | 'Настройка ПК и работа с файлами'
  | 'Бухгалтерские услуги в РФ'
  | 'Юридические услуги в РФ'
  | 'Учет и сопровождение перевозчиков в РФ'
  | 'Анализ и проверка контрагентов по бизнесу РФ'
  | 'Учет ФГИС Зерно'
  | 'Учет «Честный знак»'
  | 'Учет Честный знак'
  | 'Учет «Меркурий»'
  | 'Учет Меркурий'
  | 'Учет «Сатурн»'
  | 'Учет Сатурн'
  | 'Учет «Ветис»'
  | 'Учет Ветис'
  | 'Анализ доступных нейросетей и их использование в РФ'
  | 'Общие бизнес-задачи';

export interface ApiKeyItem {
  id: string;
  name: string;
  provider: ProviderType;
  keyMasked: string;
  keyValue: string;
  accountEmail: string;
  accountOwner: string;
  createdAt: string;
  lastUsedAt: string;
  expiresAt?: string;
  environment: EnvironmentType;
  monthlyLimitTokens: number;
  consumedTokensMonth: number;
  isActive: boolean;
  pingLatencyMs?: number;
  linkedAgentCount: number;
  easyExplanation?: string;
}

export interface AgentApplication {
  id: string;
  name: string;
  slug: string;
  description: string;
  simpleExplanation: string; // Понятное описание на человеческом языке без сленга
  category: AgentCategory;
  accountOwner: string;
  accountEmail: string;
  team: string;
  primaryKeyId: string;
  fallbackKeyId?: string;
  model: string;
  systemPromptPreview: string;
  status: AgentStatus;
  launchUrl: string;
  sharedToken: string;
  isPublicLaunchAllowed: boolean;
  totalExecutions: number;
  totalTokensBurned: number;
  lastExecutedAt: string;
  averageLatencyMs: number;
  costEstimateUsd: number;
  tags: string[];
  sampleQuestions: string[]; // Готовые примеры вопросов для быстрого старта обычным пользователем
}

export interface FreeAiModel {
  id: string;
  name: string;
  provider: ProviderType;
  company: string;
  officialUrl: string;
  getKeyUrl: string;
  badge: '100% Бесплатно' | 'Бесплатные лимиты' | 'Стартовый баланс' | 'Доступно в РФ';
  freeLimitsDescription: string;
  rfAccessStatus: 'Работает напрямую в РФ' | 'Нужен аккаунт Google/GitHub' | 'Официально в РФ (рубли/Сбер ID)';
  cardRequired: 'Карта НЕ требуется' | 'Только российская карта' | 'Зарубежная карта';
  howToGetSteps: string[];
  bestForThemes: AgentCategory[];
  recommendedModelId: string;
  description: string;
}

export interface LiveTokenEvent {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  provider: ProviderType;
  model: string;
  accountOwner: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUsd: number;
  durationMs: number;
  status: 'success' | 'rate_limited' | 'error';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Agent Operator' | 'Viewer';
  avatarUrl?: string;
  assignedAgents: string[];
  lastActive: string;
}

export interface ExecutionRunResult {
  runId: string;
  agentId: string;
  inputPrompt: string;
  outputResponse: string;
  tokensPrompt: number;
  tokensCompletion: number;
  totalTokens: number;
  latencyMs: number;
  status: 'success' | 'failed';
  timestamp: string;
}
