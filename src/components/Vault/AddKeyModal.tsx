import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProviderType, EnvironmentType } from '../../types';
import { X, KeyRound, Shield, HelpCircle, ExternalLink } from 'lucide-react';

interface AddKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProvider?: ProviderType;
  initialName?: string;
}

export const AddKeyModal: React.FC<AddKeyModalProps> = ({ 
  isOpen, 
  onClose,
  initialProvider = 'google',
  initialName = ''
}) => {
  const { addApiKey, showToast, showHelpTooltips } = useApp();

  const [name, setName] = useState(initialName || '');
  const [provider, setProvider] = useState<ProviderType>(initialProvider);
  const [keyValue, setKeyValue] = useState('');
  const [accountEmail, setAccountEmail] = useState('saptuxin@gmail.com');
  const [accountOwner, setAccountOwner] = useState('Александр Саптухин');
  const [environment, setEnvironment] = useState<EnvironmentType>('production');
  const [monthlyLimitTokens, setMonthlyLimitTokens] = useState<number>(25000000);

  useEffect(() => {
    if (initialProvider) setProvider(initialProvider);
    if (initialName) setName(initialName);
  }, [initialProvider, initialName, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !keyValue.trim()) {
      showToast('Заполните название и вставьте значение ключа', 'error');
      return;
    }

    addApiKey({
      name,
      provider,
      keyValue,
      keyMasked: '',
      accountEmail,
      accountOwner,
      environment,
      monthlyLimitTokens,
      isActive: true,
      pingLatencyMs: Math.floor(Math.random() * 60) + 30
    });

    onClose();
  };

  const providers: { id: ProviderType; name: string; placeholder: string; hint: string }[] = [
    { id: 'google', name: 'Google AI Studio (Gemini) — 100% бесплатно', placeholder: 'AIzaSy...', hint: 'Бесплатный ключ на aistudio.google.com' },
    { id: 'gigachat', name: 'GigaChat Сбер (Россия, 152-ФЗ, Сбер ID)', placeholder: 'sber_auth...', hint: 'Бесплатные токены на developers.sber.ru' },
    { id: 'yandex', name: 'YandexGPT (Yandex Cloud Россия)', placeholder: 'AQVN...', hint: 'Ключ сервисного аккаунта в Yandex Cloud' },
    { id: 'qwen', name: 'Alibaba Qwen 2.5 & Coder (DashScope / OpenRouter)', placeholder: 'sk-qw-...', hint: 'Бесплатный ключ на dashscope.aliyun.com' },
    { id: 'glm', name: 'Zhipu Z.ai GLM-4-Flash (Free Unlimited)', placeholder: 'key.secret...', hint: 'Бесплатный ключ на open.bigmodel.cn' },
    { id: 'kimi', name: 'Moonshot Kimi K1.5 (2M Tokens Context)', placeholder: 'sk-ms-...', hint: 'Грант при регистрации на platform.moonshot.cn' },
    { id: 'groq', name: 'Groq Cloud (Суперскорость LPU, бесплатно)', placeholder: 'gsk_...', hint: 'Бесплатно на console.groq.com' },
    { id: 'deepseek', name: 'DeepSeek Platform (V3 & R1)', placeholder: 'sk-ds-...', hint: 'Начальный баланс на platform.deepseek.com' },
    { id: 'mimo', name: 'Xiaomi Mimo AI (Edge & System)', placeholder: 'xm_ai_...', hint: 'Ключ на open.ai.xiaomi.com' },
    { id: 'logoai', name: 'LogoAI & Brandmark Visual Engine', placeholder: 'lg_api_...', hint: 'Ключ на logoai.com/api' },
    { id: 'hailuo', name: 'Hailuo AI & MiniMax Video (abab 6.5s)', placeholder: 'mm_hl_...', hint: 'Ключ на api.minimax.chat' },
    { id: 'hunyuan', name: 'Tencent Hunyuan (OCR & MOE Vision)', placeholder: 'tc_hy_...', hint: 'Ключ в консоли cloud.tencent.com' },
    { id: 'kling', name: 'Kling AI 1.5 Video Studio (Kuaishou)', placeholder: 'kl_api_...', hint: 'Ключ на klingai.com/api' },
    { id: 'jev', name: 'TypeSafe AI Jev (System-1 Decision Engine, Zero-Hallucination)', placeholder: 'jev_sk_...', hint: 'Бесплатный ключ на typesafe.ai' },
    { id: 'openrouter', name: 'OpenRouter (Бесплатные модели :free)', placeholder: 'sk-or-v1-...', hint: 'Ключ на openrouter.ai' },
    { id: 'mistral', name: 'Mistral AI (Codestral & Small)', placeholder: 'mis_...', hint: 'Ключ на console.mistral.ai' },
    { id: 'openai', name: 'OpenAI (GPT-4o)', placeholder: 'sk-proj-...', hint: 'Ключ на platform.openai.com' },
    { id: 'anthropic', name: 'Anthropic (Claude 3.7)', placeholder: 'sk-ant-...', hint: 'Ключ на console.anthropic.com' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden my-8 transition-colors">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                Сохранить API ключ в личный сейф
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Защищенное хранение с автоматическим маскированием
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          
          {showHelpTooltips && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
              <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                Вставьте сюда полученный секретный ключ. Он будет сохранен локально в вашем браузере в зашифрованном виде. 
                Никакие сторонние сервисы не получат к нему доступ.
              </div>
            </div>
          )}

          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              1. Выберите сервис / нейросеть:
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as ProviderType)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-600"
            >
              {providers.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Key Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              2. Понятное название для вас:
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Мой бесплатный ключ Google Gemini"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-600"
            />
          </div>

          {/* Key Secret */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              3. Вставьте значение ключа (Secret Key):
            </label>
            <input
              type="password"
              required
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
              placeholder={providers.find((p) => p.id === provider)?.placeholder || 'sk-...'}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-200 font-mono focus:outline-none focus:border-cyan-600"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {providers.find((p) => p.id === provider)?.hint}
            </p>
          </div>

          {/* Account email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Email аккаунта (для пометок):</label>
              <input
                type="email"
                required
                value={accountEmail}
                onChange={(e) => setAccountEmail(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Владелец / Организация:</label>
              <input
                type="text"
                required
                value={accountOwner}
                onChange={(e) => setAccountOwner(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors shadow-md shadow-amber-900/20"
            >
              Сохранить ключ в сейф
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
