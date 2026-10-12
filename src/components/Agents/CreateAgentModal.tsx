import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AgentApplication, AgentCategory } from '../../types';
import { X, Cpu, KeyRound, Mail, Sparkles, HelpCircle } from 'lucide-react';

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingAgent?: AgentApplication | null;
}

export const CreateAgentModal: React.FC<CreateAgentModalProps> = ({
  isOpen,
  onClose,
  editingAgent
}) => {
  const { apiKeys, addAgent, updateAgent, showToast, showHelpTooltips } = useApp();

  const [name, setName] = useState(editingAgent?.name || '');
  const [slug, setSlug] = useState(editingAgent?.slug || '');
  const [description, setDescription] = useState(editingAgent?.description || '');
  const [simpleExplanation, setSimpleExplanation] = useState(editingAgent?.simpleExplanation || '');
  const [category, setCategory] = useState<AgentCategory>(
    editingAgent?.category || 'Бухгалтерские услуги в РФ'
  );
  const [accountOwner, setAccountOwner] = useState(editingAgent?.accountOwner || 'Александр Саптухин');
  const [accountEmail, setAccountEmail] = useState(editingAgent?.accountEmail || 'saptuxin@gmail.com');
  const [team, setTeam] = useState(editingAgent?.team || 'Корпоративный отдел РФ');
  const [primaryKeyId, setPrimaryKeyId] = useState(editingAgent?.primaryKeyId || (apiKeys[0]?.id || ''));
  const [fallbackKeyId, setFallbackKeyId] = useState(editingAgent?.fallbackKeyId || '');
  const [model, setModel] = useState(editingAgent?.model || 'GigaChat-Pro (Сбербанк РФ)');
  const [systemPromptPreview, setSystemPromptPreview] = useState(
    editingAgent?.systemPromptPreview || 'Ты профессиональный консультант...'
  );
  const [sampleQuestionsInput, setSampleQuestionsInput] = useState(
    editingAgent?.sampleQuestions?.join('\n') || 'Сформулируй краткую инструкцию по налогам\nКак проверить договор поставки?'
  );

  if (!isOpen) return null;

  const categoryOptions: AgentCategory[] = [
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
    'Анализ доступных нейросетей и их использование в РФ',
    'Общие бизнес-задачи'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Укажите название помощника', 'error');
      return;
    }

    const cleanedSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9а-яё]+/g, '-');
    const sampleQuestions = sampleQuestionsInput.split('\n').map((s) => s.trim()).filter(Boolean);
    const sharedToken = editingAgent?.sharedToken || `ag_live_${Math.random().toString(36).substring(2, 10)}`;
    const launchUrl = `https://ais-dev-dywr3zwcynwyidall2dt7a-378893315295.us-east1.run.app/launch/${cleanedSlug}?token=${sharedToken}`;

    if (editingAgent) {
      updateAgent(editingAgent.id, {
        name,
        slug: cleanedSlug,
        description,
        simpleExplanation: simpleExplanation || description,
        category,
        accountOwner,
        accountEmail,
        team,
        primaryKeyId,
        fallbackKeyId: fallbackKeyId || undefined,
        model,
        systemPromptPreview,
        sampleQuestions
      });
    } else {
      addAgent({
        name,
        slug: cleanedSlug,
        description,
        simpleExplanation: simpleExplanation || description,
        category,
        accountOwner,
        accountEmail,
        team,
        primaryKeyId,
        fallbackKeyId: fallbackKeyId || undefined,
        model,
        systemPromptPreview,
        status: 'online',
        launchUrl,
        sharedToken,
        isPublicLaunchAllowed: true,
        averageLatencyMs: 450,
        tags: [category.split(' ')[0]],
        sampleQuestions
      });
    }

    onClose();
  };

  const modelOptions = [
    'TypeSafe Jev Core (System-1 Decision Engine)',
    'Qwen 2.5 Coder 32B (Alibaba)',
    'Z.ai GLM-4-Flash (Free Unlimited)',
    'Moonshot Kimi K1.5 (2M Tokens)',
    'Xiaomi Mimo System & Edge AI',
    'LogoAI Visual Vector Studio',
    'Hailuo MiniMax Video-01',
    'Tencent Hunyuan Vision MOE',
    'Kling 1.5 Video Studio (Kuaishou)',
    'GigaChat-Pro (Сбербанк РФ)',
    'YandexGPT Pro (Yandex Cloud РФ)',
    'Gemini 2.5 Flash (Google AI Studio Бесплатно)',
    'Gemini 2.5 Pro (Thinking 32k)',
    'DeepSeek-V3 Reasoning & Coding',
    'Llama 3.3 70B на Groq LPU (0.2s)',
    'Codestral Latest (Mistral AI)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 transition-colors">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                {editingAgent ? 'Редактирование помощника' : 'Создать нового ИИ-помощника'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Настройка специализации под российские бизнес-задачи
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          {showHelpTooltips && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
              <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                Укажите, в какой области должен помогать агент (например, «Бухгалтерские услуги в РФ» или «Настройка ПК»), 
                и привяжите к нему бесплатный ключ из вашего сейфа.
              </div>
            </div>
          )}

          {/* Row 1: Name and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Название помощника *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например: Помощник по договорам поставки"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Специализация (Тема) *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AgentCategory)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-600"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Plain explanation for users */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Чем помогает простыми словами (описание для сотрудников):
            </label>
            <textarea
              rows={2}
              value={simpleExplanation}
              onChange={(e) => setSimpleExplanation(e.target.value)}
              placeholder="Кратко и понятно объясните коллегам, какие вопросы можно задавать этому помощнику..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-600 resize-none"
            />
          </div>

          {/* Sample Questions (1 question per line) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Готовые примеры вопросов (по 1 строке на вопрос):
            </label>
            <textarea
              rows={3}
              value={sampleQuestionsInput}
              onChange={(e) => setSampleQuestionsInput(e.target.value)}
              placeholder="Пример 1&#10;Пример 2&#10;Пример 3"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-200 font-mono text-[11px] focus:outline-none focus:border-cyan-600 resize-none"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Эти вопросы появятся кнопками прямо на карточке помощника для быстрого теста в 1 клик.
            </p>
          </div>

          {/* Account owner & Email */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
              <Mail className="w-3.5 h-3.5" />
              <span>Ответственный сотрудник и аккаунт биллинга</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Рабочий Email:</label>
                <input
                  type="email"
                  required
                  value={accountEmail}
                  onChange={(e) => setAccountEmail(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">ФИО / Роль:</label>
                <input
                  type="text"
                  value={accountOwner}
                  onChange={(e) => setAccountOwner(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200"
                />
              </div>
            </div>
          </div>

          {/* API Keys Binding */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-300">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Привязка API ключа из сейфа</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Основной ключ из вашего сейфа:</label>
                <select
                  required
                  value={primaryKeyId}
                  onChange={(e) => setPrimaryKeyId(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none"
                >
                  {apiKeys.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.name} ({k.keyMasked})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Используемая модель ИИ:</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-cyan-700 dark:text-cyan-300 font-mono focus:outline-none"
                >
                  {modelOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit buttons */}
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
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-900/20 transition-colors"
            >
              {editingAgent ? 'Сохранить изменения' : 'Создать помощника'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
