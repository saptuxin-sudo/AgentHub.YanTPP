import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Play, 
  Check, 
  Copy, 
  Terminal, 
  Sparkles, 
  Sliders, 
  CreditCard,
  KeyRound,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const AgentRunnerModal: React.FC = () => {
  const { 
    runnerModalAgent, 
    closeRunnerModal, 
    runAgentExecution, 
    runnerInitialPrompt,
    apiKeys,
    userMode,
    showHelpTooltips,
    showToast 
  } = useApp();

  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.4);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [executionMeta, setExecutionMeta] = useState<{
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    durationMs: number;
    costUsd: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (runnerModalAgent) {
      setPrompt(runnerInitialPrompt || runnerModalAgent.sampleQuestions?.[0] || 'Здравствуйте! Помогите мне решить задачу...');
      setExecutionOutput(null);
      setExecutionMeta(null);
    }
  }, [runnerModalAgent, runnerInitialPrompt]);

  if (!runnerModalAgent) return null;

  const linkedKey = apiKeys.find((k) => k.id === runnerModalAgent.primaryKeyId);

  const handleExecute = async () => {
    if (!prompt.trim() || isRunning) return;
    setIsRunning(true);
    setExecutionOutput(null);
    setExecutionMeta(null);

    try {
      const result = await runAgentExecution(runnerModalAgent.id, prompt);
      setExecutionOutput(result.outputResponse);
      setExecutionMeta({
        promptTokens: result.tokensPrompt,
        completionTokens: result.tokensCompletion,
        totalTokens: result.totalTokens,
        durationMs: result.latencyMs,
        costUsd: Number(((result.totalTokens / 1000) * 0.0015).toFixed(5))
      });
      showToast(`Ответ успешно получен за ${result.latencyMs} мс!`, 'success');
    } catch {
      showToast('Ошибка при обращении к ИИ-модели', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const copyResult = () => {
    if (!executionOutput) return;
    navigator.clipboard.writeText(executionOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Ответ скопирован в буфер обмена', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col my-8 transition-colors">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                  {runnerModalAgent.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60">
                  {runnerModalAgent.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {runnerModalAgent.simpleExplanation || runnerModalAgent.description}
              </p>
            </div>
          </div>

          <button
            onClick={closeRunnerModal}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Quick Prompts */}
          {runnerModalAgent.sampleQuestions && runnerModalAgent.sampleQuestions.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                💡 Выберите готовый пример вопроса или введите свой:
              </label>
              <div className="flex flex-wrap gap-2">
                {runnerModalAgent.sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(q)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-800 transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Prompt Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Ваш запрос / текст документа:
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                ~{Math.round(prompt.length / 2.8)} токенов
              </span>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="Введите задачу, пункт договора, вопрос по налогам или коду..."
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 font-sans focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 resize-none leading-relaxed"
            />
          </div>

          {/* Toggle for Advanced Settings (Hidden in Simple Mode by default!) */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className="text-xs text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showAdvancedSettings ? 'Скрыть технические настройки' : '⚙️ Настройки модели (температура и лимиты)'}</span>
              {showAdvancedSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdvancedSettings && (
              <div className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Креативность (температура):</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">{temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-cyan-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500">0.0 — точные факты (бухгалтерия/закон), 0.7 — идеи</span>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Лимит длины ответа:</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">{maxTokens} токенов</span>
                  </div>
                  <input
                    type="range"
                    min="256"
                    max="4096"
                    step="256"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full accent-cyan-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500">Ограничивает максимальный размер ответа</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Модель: <strong className="text-slate-800 dark:text-slate-200">{runnerModalAgent.model}</strong></span>
            </div>

            <button
              onClick={handleExecute}
              disabled={isRunning || !prompt.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold text-xs shadow-lg shadow-cyan-900/20 transition-colors"
            >
              {isRunning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Помощник думает...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Получить ответ</span>
                </>
              )}
            </button>
          </div>

          {/* Response Output Container */}
          {executionOutput && (
            <div className="mt-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-sm">
              <div className="p-3 bg-white dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  <span>Готовый ответ помощника:</span>
                </div>

                <button
                  onClick={copyResult}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Скопировано!' : 'Скопировать ответ'}</span>
                </button>
              </div>

              {/* Execution stats */}
              {executionMeta && userMode === 'pro' && (
                <div className="px-4 py-2 bg-slate-100 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-900 font-mono text-[11px] text-slate-600 dark:text-slate-400 flex flex-wrap gap-4">
                  <span>Токенов: <strong className="text-cyan-600 dark:text-cyan-400">{executionMeta.totalTokens}</strong></span>
                  <span>Время: <strong className="text-emerald-600 dark:text-emerald-400">{executionMeta.durationMs} мс</strong></span>
                  <span>Ориентировочная стоимость: <strong>${executionMeta.costUsd}</strong></span>
                </div>
              )}

              {/* Text content */}
              <div className="p-5 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-cyan-500/30 font-sans">
                {executionOutput}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Секретный токен: <code className="font-mono text-slate-600 dark:text-slate-500">{runnerModalAgent.sharedToken.slice(0, 12)}...</code></span>
          <button
            onClick={closeRunnerModal}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            Закрыть окно
          </button>
        </div>

      </div>
    </div>
  );
};
