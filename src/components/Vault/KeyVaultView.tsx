import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApiKeyItem, ProviderType } from '../../types';
import { 
  KeyRound, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Lock, 
  Unlock, 
  Gift,
  HelpCircle,
  ArrowRight,
  Zap,
  Globe2
} from 'lucide-react';
import { AddKeyModal } from './AddKeyModal';

export const KeyVaultView: React.FC = () => {
  const { 
    apiKeys, 
    revealedKeyIds, 
    toggleRevealKey, 
    testKeyLatency, 
    deleteApiKey, 
    toggleKeyActive, 
    searchQuery,
    showHelpTooltips,
    setActiveTab,
    showToast 
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [testingKeyId, setTestingKeyId] = useState<string | null>(null);

  const filteredKeys = apiKeys.filter((key) => {
    const q = searchQuery.toLowerCase();
    return (
      key.name.toLowerCase().includes(q) ||
      key.accountOwner.toLowerCase().includes(q) ||
      key.accountEmail.toLowerCase().includes(q) ||
      key.provider.toLowerCase().includes(q)
    );
  });

  const handleCopyKey = (key: ApiKeyItem) => {
    navigator.clipboard.writeText(key.keyValue);
    setCopiedKeyId(key.id);
    showToast(`Ключ "${key.name}" скопирован в буфер`, 'success');
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handlePingTest = async (key: ApiKeyItem) => {
    setTestingKeyId(key.id);
    try {
      await testKeyLatency(key.id);
    } finally {
      setTestingKeyId(null);
    }
  };

  const getProviderBadge = (provider: ProviderType) => {
    switch (provider) {
      case 'gigachat':
        return { label: 'Сбер GigaChat (РФ)', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60' };
      case 'yandex':
        return { label: 'YandexGPT (РФ)', color: 'text-red-400 bg-red-950/60 border-red-800/60' };
      case 'google':
        return { label: 'Google Gemini', color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60' };
      case 'groq':
        return { label: 'Groq LPU', color: 'text-orange-400 bg-orange-950/60 border-orange-800/60' };
      case 'deepseek':
        return { label: 'DeepSeek', color: 'text-blue-400 bg-blue-950/60 border-blue-800/60' };
      case 'qwen':
        return { label: 'Alibaba Qwen', color: 'text-purple-400 bg-purple-950/60 border-purple-800/60' };
      case 'glm':
        return { label: 'Z.ai GLM-4', color: 'text-teal-400 bg-teal-950/60 border-teal-800/60' };
      case 'kimi':
        return { label: 'Moonshot Kimi', color: 'text-sky-400 bg-sky-950/60 border-sky-800/60' };
      case 'mimo':
        return { label: 'Xiaomi Mimo', color: 'text-amber-400 bg-amber-950/60 border-amber-800/60' };
      case 'logoai':
        return { label: 'LogoAI Design', color: 'text-pink-400 bg-pink-950/60 border-pink-800/60' };
      case 'hailuo':
        return { label: 'Hailuo MiniMax', color: 'text-rose-400 bg-rose-950/60 border-rose-800/60' };
      case 'hunyuan':
        return { label: 'Tencent Hunyuan', color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60' };
      case 'kling':
        return { label: 'Kling AI Video', color: 'text-violet-400 bg-violet-950/60 border-violet-800/60' };
      case 'jev':
        return { label: 'TypeSafe Jev (System-1)', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60' };
      default:
        return { label: provider.toUpperCase(), color: 'text-slate-300 bg-slate-800 border-slate-700' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            Сейф ваших API ключей (Защищенное хранилище)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Здесь надежно хранятся секретные пароли подключения к ИИ-моделям с автоматическим маскированием.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('free_ai')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-cyan-700 dark:text-cyan-300 text-xs font-medium border border-slate-300 dark:border-slate-700 transition-colors shadow-sm"
          >
            <Gift className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Каталог бесплатных ключей</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-900/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить ключ в сейф</span>
          </button>
        </div>
      </div>

      {/* Explanatory Help Box for Regular Users */}
      {showHelpTooltips && (
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3 transition-colors">
          <HelpCircle className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">
              💡 Подсказка: как работает этот сейф?
            </strong>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Ключи никогда не передаются посторонним и сохраняются в защищенном хранилище вашего браузера. 
              Символы ключа скрыты точками. Иконка глаза <Eye className="inline w-3 h-3 mx-0.5 text-slate-400" /> позволяет посмотреть ключ, 
              а кнопка с круговой стрелкой — моментально проверить, работает ли соединение с серверами нейросети прямо сейчас.
            </p>
          </div>
        </div>
      )}

      {/* Keys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredKeys.map((key) => {
          const isRevealed = revealedKeyIds.has(key.id);
          const isCopied = copiedKeyId === key.id;
          const isTesting = testingKeyId === key.id;
          const badge = getProviderBadge(key.provider);

          return (
            <div
              key={key.id}
              className={`p-5 rounded-2xl bg-white dark:bg-slate-900/90 border transition-all shadow-sm ${
                key.isActive ? 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700' : 'border-rose-300 dark:border-rose-900/40 opacity-75'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {key.accountOwner}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1.5">
                    {key.name}
                  </h3>
                </div>

                <button
                  onClick={() => toggleKeyActive(key.id)}
                  title={key.isActive ? 'Ключ активен' : 'Ключ приостановлен'}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    key.isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/60 text-rose-700 dark:text-rose-400'
                  }`}
                >
                  {key.isActive ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Masked Key Display Box */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 mb-3 flex items-center justify-between gap-2">
                <div className="font-mono text-xs text-slate-700 dark:text-slate-300 truncate">
                  {isRevealed ? key.keyValue : key.keyMasked}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleRevealKey(key.id)}
                    title={isRevealed ? 'Скрыть символы' : 'Показать символы ключа'}
                    className="p-1 rounded text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleCopyKey(key)}
                    title="Скопировать ключ"
                    className={`p-1 rounded transition-colors ${
                      isCopied ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Easy Explanation if available */}
              {key.easyExplanation && (
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  💡 {key.easyExplanation}
                </p>
              )}

              {/* Connection Status & Ping Test Row */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">Отклик:</span>
                  <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {key.pingLatencyMs || 50} мс
                  </span>
                  <button
                    onClick={() => handlePingTest(key)}
                    disabled={isTesting}
                    title="Проверить связь с сервером прямо сейчас"
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] transition-colors"
                  >
                    <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin text-cyan-600 dark:text-cyan-400' : ''}`} />
                    <span>{isTesting ? 'Проверка...' : 'Проверить связь'}</span>
                  </button>
                </div>

                <button
                  onClick={() => deleteApiKey(key.id)}
                  title="Удалить ключ"
                  className="p-1 text-slate-400 hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      <AddKeyModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
