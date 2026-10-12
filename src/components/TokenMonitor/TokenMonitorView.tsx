import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  Flame, 
  Clock, 
  AlertTriangle, 
  Pause, 
  Play, 
  RotateCcw, 
  Zap,
  HelpCircle,
  BarChart2,
  DollarSign,
  ShieldCheck
} from 'lucide-react';

export const TokenMonitorView: React.FC = () => {
  const { 
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
    showHelpTooltips,
    userMode,
    apiKeys 
  } = useApp();

  const remainingTokens = Math.max(0, totalPoolTokens - consumedPoolTokens);
  const remainingPercent = Math.round((remainingTokens / totalPoolTokens) * 100);
  const isLowBalance = remainingPercent <= lowBalanceThresholdPercent;
  const estimatedQuestionsLeft = Math.round(remainingTokens / 2000);

  const providerStats = apiKeys.reduce((acc, key) => {
    const prov = key.provider;
    if (!acc[prov]) {
      acc[prov] = { tokens: 0, count: 0 };
    }
    acc[prov].tokens += key.consumedTokensMonth;
    acc[prov].count += 1;
    return acc;
  }, {} as Record<string, { tokens: number; count: number }>);

  const totalConsumedAllProviders = Object.values(providerStats).reduce((sum, item) => sum + item.tokens, 0) || 1;
  const burnRatePerMinute = Math.round(todayTokensBurned / 480);
  const projectedDaysRunway = burnRatePerMinute > 0 
    ? Math.max(1, Math.round(remainingTokens / (burnRatePerMinute * 60 * 24)))
    : 99;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Мониторинг баланса токенов и расходов в реальном времени
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Контроль остатка бесплатных и оплаченных токенов, скорость расхода и предупреждения.
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiveSimulationActive(!isLiveSimulationActive)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors border ${
              isLiveSimulationActive
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLiveSimulationActive ? 'bg-emerald-500 dark:bg-emerald-400 animate-ping' : 'bg-slate-400 dark:bg-slate-500'}`} />
            <span>{isLiveSimulationActive ? 'ЖИВОЙ ПОТОК: ВКЛ' : 'ПОТОК: ПАУЗА'}</span>
            {isLiveSimulationActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={resetTokenMetrics}
            title="Сбросить счетчик за сегодня"
            className="p-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Explanatory Help Box for Regular Users */}
      {showHelpTooltips && (
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3 transition-colors">
          <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">
              💡 Что такое «токены» простыми словами?
            </strong>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Токен</strong> — это единица измерения объема текста (примерно 3–4 буквы русского языка или 1 короткое слово). 
              В среднем 1 подробный вопрос и ответ занимают около 1 500 – 2 000 токенов. 
              Вашего текущего баланса <strong>{(remainingTokens / 1000000).toFixed(1)} млн токенов</strong> хватит примерно на <strong>{estimatedQuestionsLeft.toLocaleString()} подробных консультаций</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Low Balance Warning Banner */}
      {isLowBalance && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 flex items-start gap-3 text-amber-800 dark:text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <strong className="font-semibold block text-sm">Внимание: Остаток токенов ниже установленного порога!</strong>
            Осталось {remainingPercent}% от общего пула ({((remainingTokens) / 1000000).toFixed(1)}M токенов).
            Рекомендуется подключить бесплатные ключи из вкладки «Бесплатные нейросети».
          </div>
        </div>
      )}

      {/* Key Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Remaining Tokens Pool */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Остаток токенов</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{remainingPercent}%</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
            {(remainingTokens / 1000000).toFixed(1)} млн
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
            <div
              className={`h-full ${remainingPercent < 25 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${remainingPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Хватит еще на <strong className="text-slate-800 dark:text-slate-200 font-medium">~{estimatedQuestionsLeft.toLocaleString()}</strong> ответов
          </div>
        </div>

        {/* Metric 2: Today's Token Burn */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Расход за сегодня</span>
            <Flame className="w-4 h-4 text-orange-500 dark:text-orange-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-700 dark:text-cyan-300">
            {(todayTokensBurned / 1000000).toFixed(2)} млн
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Около {burnRatePerMinute.toLocaleString()} токенов в минуту
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">
            Вызовов за сегодня: ~{liveEvents.length}
          </div>
        </div>

        {/* Metric 3: Today Cost in USD / RUB */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Эквивалент затрат</span>
            <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-300">
            ${todayCostUsd.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            (≈ {Math.round(todayCostUsd * 96)} руб по курсу)
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">
            Большинство моделей работают бесплатно
          </div>
        </div>

        {/* Metric 4: Estimated Runway */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Хватит без дозакупки</span>
            <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-purple-700 dark:text-purple-300">
            ~{projectedDaysRunway} дней
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            При вашей текущей активности
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">
            Порог алерта: {lowBalanceThresholdPercent}% пула
          </div>
        </div>
      </div>

      {/* Live Stream Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              История обращений к нейросетям в реальном времени
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400">
              LIVE ТЕЛЕМЕТРИЯ
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                <th className="py-2.5 px-3">Время</th>
                <th className="py-2.5 px-3">Помощник</th>
                <th className="py-2.5 px-3">Модель</th>
                <th className="py-2.5 px-3">Токены</th>
                <th className="py-2.5 px-3">Стоимость</th>
                <th className="py-2.5 px-3 text-right">Скорость отклика</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {liveEvents.slice(0, 15).map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-slate-500">{evt.timestamp}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">{evt.agentName}</td>
                  <td className="py-2.5 px-3 text-cyan-700 dark:text-cyan-400">{evt.model}</td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-semibold">{evt.totalTokens} токенов</td>
                  <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">${evt.costUsd.toFixed(5)}</td>
                  <td className="py-2.5 px-3 text-right text-slate-500 dark:text-slate-400">{evt.durationMs} мс</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
