import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AgentApplication } from '../../types';
import { 
  Play, 
  Copy, 
  Check, 
  QrCode, 
  Share2, 
  KeyRound, 
  Cpu, 
  HelpCircle,
  Network,
  LayoutGrid,
  GitBranch,
  Sparkles,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export const LaunchpadView: React.FC = () => {
  const { 
    agents, 
    apiKeys, 
    openRunnerModal, 
    searchQuery, 
    showToast,
    userMode,
    showHelpTooltips,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setActiveTab
  } = useApp();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'topology'>('cards');
  const [qrModalAgent, setQrModalAgent] = useState<AgentApplication | null>(null);

  const categories = [
    'all',
    'Создание приложений и сайтов',
    'Настройка ПК и работа с файлами',
    'Бухгалтерские услуги в РФ',
    'Юридические услуги в РФ',
    'Учет и сопровождение перевозчиков в РФ',
    'Анализ и проверка контрагентов по бизнесу РФ',
    'Учет ФГИС Зерно',
    'Учет «Честный знак»',
    'Учет «Меркурий»',
    'Учет «Сатурн»',
    'Учет «Ветис»',
    'Анализ доступных нейросетей и их использование в РФ'
  ];

  // Filter
  const filteredAgents = agents.filter((agent) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      agent.name.toLowerCase().includes(q) ||
      agent.description.toLowerCase().includes(q) ||
      agent.simpleExplanation?.toLowerCase().includes(q) ||
      agent.accountOwner.toLowerCase().includes(q) ||
      agent.accountEmail.toLowerCase().includes(q) ||
      agent.tags.some((t) => t.toLowerCase().includes(q));

    const matchesCategory = 
      selectedCategoryFilter === 'all' || 
      agent.category === selectedCategoryFilter ||
      agent.category.replace(/[«»"]/g, '') === selectedCategoryFilter.replace(/[«»"]/g, '');

    return matchesSearch && matchesCategory;
  });

  const handleCopyLink = (agent: AgentApplication, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(agent.launchUrl);
    setCopiedId(agent.id);
    showToast(`Ссылка для запуска скопирована: ${agent.name}`, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getProviderInfo = (keyId?: string) => {
    if (!keyId) return { name: 'Не назначен', provider: 'google', masked: '---' };
    const key = apiKeys.find((k) => k.id === keyId);
    return key ? { name: key.name, provider: key.provider, masked: key.keyMasked } : { name: 'Ключ удален', provider: 'google', masked: 'n/a' };
  };

  return (
    <div className="space-y-6">
      {/* Human-friendly Intro Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-cyan-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/40 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span>Витрина готовых ИИ-помощников для работы и бизнеса в РФ</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Выберите нужного помощника под вашу задачу, нажмите <strong>«Запустить»</strong> или кликните по любому из готовых примеров вопросов. 
              Агент мгновенно сформирует ответ с учетом законодательства РФ и специфики вашей работы.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('free_ai')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600/10 hover:bg-cyan-600/20 dark:bg-cyan-600/20 dark:hover:bg-cyan-600/30 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 text-xs font-semibold whitespace-nowrap transition-colors self-start md:self-auto"
          >
            <span>🎁 Нужен бесплатный API ключ?</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Explanatory Guide Box for Normal Users */}
      {showHelpTooltips && (
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3 transition-colors">
          <HelpCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">
              💡 Инструкция для пользователя: как это работает?
            </strong>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              1. <strong>Кнопка «Запустить помощника»</strong> — открывает диалоговое окно для отправки вашего запроса.<br/>
              2. <strong>Готовые кнопки-примеры</strong> — позволяют проверить помощника без набора длинного текста.<br/>
              3. <strong>Иконка ссылки</strong> — скопирует защищенную ссылку, которую можно отправить коллегам (бухгалтеру, юристу, водителю), чтобы они пользовались помощником без входа в админку.
            </p>
          </div>
        </div>
      )}

      {/* Category Filter Controls */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Специализации помощников по направлениям в РФ:
          </label>

          {/* Switcher to Topology in Pro mode */}
          {userMode === 'pro' && (
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  viewMode === 'cards' ? 'bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 shadow-sm font-semibold' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Карточки
              </button>
              <button
                onClick={() => setViewMode('topology')}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  viewMode === 'topology' ? 'bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 shadow-sm font-semibold' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Схема потока
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors border ${
                selectedCategoryFilter === cat
                  ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800 shadow-sm font-semibold'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? '✨ Все темы' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW MODE 1: USER FRIENDLY CARDS */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAgents.map((agent) => {
            const primaryKeyInfo = getProviderInfo(agent.primaryKeyId);
            const isCopied = copiedId === agent.id;

            return (
              <div
                key={agent.id}
                className="group relative bg-white dark:bg-slate-900/90 hover:bg-slate-50/60 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[11px] font-medium text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-900/60 px-2 py-0.5 rounded">
                      {agent.category}
                    </span>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                      <span>Готов к работе</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mt-1">
                    {agent.name}
                  </h3>

                  {/* Simple Explanation (PLAIN RUSSIAN FOR USERS) */}
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 my-3">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-1 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" /> Чем помогает:
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                      {agent.simpleExplanation || agent.description}
                    </p>
                  </div>

                  {/* Sample Questions (READY FOR 1-CLICK TEST) */}
                  {agent.sampleQuestions && agent.sampleQuestions.length > 0 && (
                    <div className="space-y-1.5 mb-4">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                        Попробуйте готовый вопрос в 1 клик:
                      </span>
                      {agent.sampleQuestions.slice(0, 2).map((q, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => openRunnerModal(agent, q)}
                          className="w-full text-left text-[11px] text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800/80 p-2 rounded-lg border border-slate-200 dark:border-slate-800/80 transition-colors flex items-center justify-between gap-2 group/q"
                        >
                          <span className="line-clamp-1">{q}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover/q:text-cyan-600 dark:group-hover/q:text-cyan-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Connected Account & Model Details */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-[11px]">Модель ИИ:</span>
                      <span className="font-mono text-cyan-700 dark:text-cyan-300 text-[11px] font-medium">{agent.model}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-[11px]">Ключ API:</span>
                      <span className="text-slate-700 dark:text-slate-300 text-[11px] truncate max-w-[170px]">
                        {primaryKeyInfo.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => handleCopyLink(agent, e)}
                    title="Скопировать ссылку для совместного использования"
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs border transition-colors ${
                      isCopied
                        ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{isCopied ? 'Скопировано' : 'Ссылка'}</span>
                  </button>

                  <button
                    onClick={() => openRunnerModal(agent)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-900/20 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Запустить помощника</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 2: TOPOLOGY IN PRO MODE */}
      {viewMode === 'topology' && (
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2 font-mono">
              <GitBranch className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Топология связей: Аккаунты ➔ API Vault ➔ Помощники ➔ Эндпоинты
            </h3>
            <span className="text-xs text-slate-500 font-mono">Режим разработчика</span>
          </div>

          <div className="space-y-3">
            {filteredAgents.map((agent) => {
              const key = apiKeys.find((k) => k.id === agent.primaryKeyId);
              return (
                <div
                  key={agent.id}
                  className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs"
                >
                  <div className="font-semibold text-slate-900 dark:text-slate-200 min-w-[200px]">
                    {agent.name}
                  </div>
                  <div className="text-cyan-700 dark:text-cyan-400 font-mono">{agent.category}</div>
                  <div className="text-amber-700 dark:text-amber-300 font-mono">{key?.name || 'Ключ'}</div>
                  <div className="text-slate-600 dark:text-slate-400 font-mono text-[11px] truncate max-w-[200px]">
                    {agent.launchUrl}
                  </div>
                  <button
                    onClick={() => openRunnerModal(agent)}
                    className="px-3 py-1.5 rounded bg-cyan-600 text-white font-medium hover:bg-cyan-500 transition-colors"
                  >
                    Тест
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
