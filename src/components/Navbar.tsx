import React from 'react';
import { useApp, NavTabType } from '../context/AppContext';
import { 
  Rocket, 
  Cpu, 
  KeyRound, 
  Activity, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  Plus, 
  HelpCircle, 
  Gift, 
  Wrench, 
  BookOpen,
  Sun,
  Moon,
  Globe
} from 'lucide-react';

interface NavbarProps {
  onOpenNewKeyModal: () => void;
  onOpenNewAgentModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNewKeyModal, onOpenNewAgentModal }) => {
  const { 
    theme,
    toggleTheme,
    activeTab, 
    setActiveTab, 
    userMode, 
    toggleUserMode, 
    showHelpTooltips, 
    toggleHelpTooltips, 
    totalPoolTokens, 
    consumedPoolTokens, 
    todayTokensBurned, 
    searchQuery, 
    setSearchQuery 
  } = useApp();

  const remainingTokens = Math.max(0, totalPoolTokens - consumedPoolTokens);
  const remainingPercent = Math.round((remainingTokens / totalPoolTokens) * 100);
  const estimatedQuestionsLeft = Math.round(remainingTokens / 2000);

  // Navigation Items
  const simpleNavItems: { id: NavTabType; label: string; icon: any; hint: string }[] = [
    { id: 'launchpad', label: '🚀 Запуск помощников', icon: Rocket, hint: 'Быстрый запуск в 1 клик' },
    { id: 'free_ai', label: '🎁 Бесплатные нейросети', icon: Gift, hint: 'Где взять бесплатные ключи' },
    { id: 'agents', label: '📋 Мои помощники', icon: Cpu, hint: 'Список и настройка' },
    { id: 'vault', label: '🔐 Сейф ключей', icon: KeyRound, hint: 'Безопасное хранилище' },
    { id: 'tokens', label: '📊 Баланс и расход', icon: Activity, hint: 'Контроль остатка' },
    { id: 'guide', label: '📖 Инструкция', icon: BookOpen, hint: 'Руководство пользователя' },
  ];

  const proNavItems: { id: NavTabType; label: string; icon: any; hint: string }[] = [
    ...simpleNavItems,
    { id: 'sharing', label: '👥 Командный доступ', icon: Users, hint: 'RBAC и Webhook' },
    { id: 'architecture', label: '💡 Спецификация ТЗ', icon: Sparkles, hint: 'Архитектура и стек' },
  ];

  const navItems = userMode === 'pro' ? proNavItems : simpleNavItems;

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md sticky top-0 z-40 shadow-sm transition-colors duration-200">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-900">
        
        {/* Brand Logo & Mode Badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold shadow-inner">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white font-mono">AgentHub</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-750">
                ⭐ Подписка PRO (saptuxin@gmail.com)
              </span>
              <button
                onClick={toggleUserMode}
                title="Нажмите для переключения между простым и экспертным режимом"
                className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                  userMode === 'simple'
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-250 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60'
                    : 'bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60'
                }`}
              >
                <span>{userMode === 'simple' ? 'Режим: Пользователь' : 'Режим: Разработчик (PRO)'}</span>
              </button>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5 flex-wrap">
              <span>Платформа ИИ-агентов РФ</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-700 dark:text-slate-300 font-mono font-medium flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                agenthub.yantpp.ru
              </span>
            </div>
          </div>
        </div>

        {/* Human Friendly Balance & Mode Controls */}
        <div className="flex items-center gap-2.5 text-xs">
          
          {/* Balance Widget (Easy to understand for non-technical users) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-500 dark:text-slate-400">Баланс:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
              ~{(remainingTokens / 1000000).toFixed(1)}M токенов
            </span>
            <span className="text-slate-500 text-[11px]">
              (хватит на ~{estimatedQuestionsLeft.toLocaleString()} ответов)
            </span>
          </div>

          {/* Theme Switcher Toggle (Light vs Dark) */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Включить светлую тему оформления' : 'Включить темную тему оформления'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-amber-400 dark:hover:border-amber-500 shadow-sm"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden xl:inline">Светлая</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden xl:inline">Темная</span>
              </>
            )}
          </button>

          {/* Tooltips toggle */}
          <button
            onClick={toggleHelpTooltips}
            title={showHelpTooltips ? 'Скрыть подсказки на экране' : 'Показать подсказки на экране'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showHelpTooltips
                ? 'bg-cyan-50 dark:bg-cyan-950/50 border-cyan-300 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300'
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {showHelpTooltips ? '💡 Подсказки: ВКЛ' : '💡 Подсказки: ВЫКЛ'}
            </span>
          </button>

          {/* Mode Switcher Button */}
          <button
            onClick={toggleUserMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors text-xs font-medium"
          >
            <Wrench className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">
              {userMode === 'simple' ? 'Переключить в PRO' : 'Переключить в Простой'}
            </span>
          </button>

          {/* Quick Create Buttons */}
          <button
            onClick={onOpenNewKeyModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>+ Ключ</span>
          </button>

          <button
            onClick={onOpenNewAgentModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-sm shadow-cyan-950 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Создать помощника</span>
          </button>
        </div>
      </div>

      {/* Main Nav Tabs & Global Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-2 py-2">
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5" aria-label="Разделы дашборда">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-900 text-cyan-700 dark:text-cyan-300 border border-slate-300 dark:border-slate-800 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Search Input */}
        <div className="relative w-full md:w-72 pb-1 md:pb-0">
          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск (бухгалтерия, ПК, юрист, Qwen)..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
