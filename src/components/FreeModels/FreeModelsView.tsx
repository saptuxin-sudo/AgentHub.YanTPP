import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FreeAiModel } from '../../types';
import { 
  Gift, 
  ExternalLink, 
  CheckCircle2, 
  KeyRound, 
  ShieldCheck, 
  CreditCard, 
  Globe2, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Info,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

interface FreeModelsViewProps {
  onOpenAddKeyWithProvider: (provider: FreeAiModel['provider'], name: string) => void;
}

export const FreeModelsView: React.FC<FreeModelsViewProps> = ({ onOpenAddKeyWithProvider }) => {
  const { freeModels, showHelpTooltips, searchQuery, showToast } = useApp();
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);

  const themeFilters = [
    'all',
    'Создание приложений и сайтов',
    'Настройка ПК и работа с файлами',
    'Бухгалтерские услуги в РФ',
    'Юридические услуги в РФ',
    'Учет и сопровождение перевозчиков в РФ',
    'Анализ и проверка контрагентов по бизнесу РФ',
    'Работа с системами мониторинга РФ',
    'Анализ доступных нейросетей и их использование в РФ'
  ];

  const filteredModels = freeModels.filter((model) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      model.name.toLowerCase().includes(q) ||
      model.company.toLowerCase().includes(q) ||
      model.description.toLowerCase().includes(q) ||
      model.freeLimitsDescription.toLowerCase().includes(q);

    const matchesTheme = 
      selectedThemeFilter === 'all' || 
      model.bestForThemes.includes(selectedThemeFilter as any);

    return matchesSearch && matchesTheme;
  });

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const handleCopyLink = (model: FreeAiModel) => {
    navigator.clipboard.writeText(model.getKeyUrl);
    setCopiedUrlId(model.id);
    showToast(`Ссылка на получение ключа ${model.name} скопирована`, 'success');
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-cyan-50/70 dark:from-cyan-950/60 dark:via-slate-900 dark:to-slate-900 border border-slate-200 dark:border-cyan-800/40 shadow-sm relative overflow-hidden transition-colors">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-semibold mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Каталог бесплатных нейросетей и официальных API ключей</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Где брать бесплатные ключи нейросетей для работы в России?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Вам не обязательно платить сотни долларов или искать зарубежные банковские карты. 
            Ниже собраны официальные платформы с щедрыми бесплатными тарифами, российские нейросети Сбера и Яндекса, 
            а также пошаговые инструкции по получению ключей за 2 минуты.
          </p>
        </div>
      </div>

      {/* Explanatory Help Box for Regular Users */}
      {showHelpTooltips && (
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-cyan-900/40 shadow-sm flex items-start gap-3 transition-colors">
          <HelpCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">
              💡 Памятка простыми словами: что такое API ключ и зачем он вам?
            </strong>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>API ключ</strong> — это ваш персональный секретный пароль (строка символов), 
              по которому дашборд отправляет вопросы нужной нейросети и получает ответы. 
              Многие провайдеры (Google, Сбер, Groq, DeepSeek) дают такие ключи <strong>совершенно бесплатно</strong> с ежедневными лимитами. 
              Получив ключ по ссылкам ниже, нажмите «Сохранить в мой сейф», и ваши помощники сразу начнут работать.
            </p>
          </div>
        </div>
      )}

      {/* Category Filter Pills */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Выберите тему вашей задачи для подбора лучшей бесплатной нейросети:
        </label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar text-xs">
          {themeFilters.map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedThemeFilter(theme)}
              className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors border ${
                selectedThemeFilter === theme
                  ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700 shadow-sm font-semibold'
                  : 'bg-white dark:bg-slate-900/70 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {theme === 'all' ? '✨ Все нейросети' : theme}
            </button>
          ))}
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredModels.map((model) => {
          const isExpanded = expandedCardId === model.id;
          const isCopied = copiedUrlId === model.id;

          return (
            <div
              key={model.id}
              className="p-5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 font-semibold">
                        {model.badge}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {model.company}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                      {model.name}
                    </h3>
                  </div>

                  <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 bg-slate-100 dark:bg-slate-950 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                    {model.cardRequired}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {model.description}
                </p>

                {/* Free limits box */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 mb-3 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Бесплатные условия использования:</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-medium">{model.freeLimitsDescription}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-slate-200 dark:border-slate-900 text-[11px]">
                    <Globe2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span className="text-slate-500 dark:text-slate-400">Статус в РФ:</span>
                    <span className="text-cyan-700 dark:text-cyan-300 font-medium">{model.rfAccessStatus}</span>
                  </div>
                </div>

                {/* Best for themes badges */}
                <div className="mb-3">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1 font-medium">Рекомендуется для тем:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {model.bestForThemes.map((theme, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step-by-step instructions accordion */}
                {isExpanded && (
                  <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-cyan-200 dark:border-cyan-900/40 text-xs space-y-2 mb-3">
                    <div className="font-semibold text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Пошаговая инструкция получения ключа (на русском):
                    </div>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed pl-1">
                      {model.howToGetSteps.map((step, idx) => (
                        <li key={idx} className="pl-1">
                          <span className="text-slate-700 dark:text-slate-300">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => toggleExpand(model.id)}
                  className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                >
                  <span>{isExpanded ? 'Скрыть инструкцию' : 'Инструкция по шагам'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink(model)}
                    title="Скопировать прямую ссылку на получение ключа"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <a
                    href={model.getKeyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-cyan-700 dark:text-cyan-300 text-xs font-medium border border-slate-300 dark:border-slate-700 transition-colors"
                  >
                    <span>Получить ключ</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => onOpenAddKeyWithProvider(model.provider, model.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-900/20 transition-colors"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Сохранить в сейф</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
