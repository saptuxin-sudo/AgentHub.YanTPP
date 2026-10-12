import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  User, 
  Code2, 
  ShieldCheck, 
  KeyRound, 
  Cpu, 
  Activity, 
  HelpCircle, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Lock, 
  Terminal, 
  Share2, 
  Database, 
  ExternalLink,
  ChevronRight,
  Info,
  Zap,
  Globe2,
  FileText
} from 'lucide-react';

export const GuideView: React.FC = () => {
  const { userMode, showToast, setActiveTab } = useApp();
  const [activeManualTab, setActiveManualTab] = useState<'user' | 'admin'>(
    userMode === 'pro' ? 'admin' : 'user'
  );
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    showToast('Текст скопирован в буфер обмена', 'success');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownloadMarkdown = () => {
    const content = `# ПОЛНОЕ РУКОВОДСТВО И ДОКУМЕНТАЦИЯ AGENTHUB

## ЧАСТЬ 1: ИНСТРУКЦИЯ ДЛЯ ОБЫЧНОГО ПОЛЬЗОВАТЕЛЯ
1. Назначение платформы: запуск специализированных ИИ-помощников для работы в РФ.
2. Бесплатные ключи: Google AI Studio, Сбер GigaChat, Groq LPU, DeepSeek.
3. Безопасность: ключи маскируются и сохраняются локально в защищенном хранилище.

## ЧАСТЬ 2: РУКОВОДСТВО ДЛЯ АДМИНИСТРАТОРА И РАЗРАБОТЧИКА
1. Архитектура: Client-Authoritative State, Failover Routing, Zero-Knowledge Key Storage.
2. Скрытые функции: прямые URL-токены, embedded-режим для iframe, динамический расчет Runway.
3. Интеграция: cURL, Webhooks, Python SDK, совместимость с 152-ФЗ.
`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AgentHub_Manual_Full.md';
    link.click();
    showToast('Документация скачана в формате Markdown', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-cyan-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/50 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/60 text-cyan-800 dark:text-cyan-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Официальное руководство и документация AgentHub</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Инструкции и справка по работе с платформой
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Подробное руководство простыми словами для сотрудников и углубленный технический мануал для администраторов.
          </p>
        </div>

        <button
          onClick={handleDownloadMarkdown}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-300 dark:border-slate-700 transition-colors self-start sm:self-auto shrink-0 shadow-sm"
        >
          <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Скачать мануал (.md)</span>
        </button>
      </div>

      {/* Manual Switcher Tabs */}
      <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors">
        <button
          onClick={() => setActiveManualTab('user')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all ${
            activeManualTab === 'user'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Инструкция для обычного пользователя (Простым языком)</span>
        </button>
        <button
          onClick={() => setActiveManualTab('admin')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all ${
            activeManualTab === 'admin'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-950/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Инструкция для администратора и разработчика (PRO Manual)</span>
        </button>
      </div>

      {/* SECTION 1: USER GUIDE (ПРОСТЫМ ЯЗЫКОМ) */}
      {activeManualTab === 'user' && (
        <div className="space-y-6">
          {/* Quick Start Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              Быстрый старт: как начать пользоваться за 3 шага?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1">
                <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 text-xs font-bold flex items-center justify-center border border-cyan-300 dark:border-cyan-800 mb-2">1</div>
                <strong className="text-xs text-slate-900 dark:text-slate-200 block font-semibold">Выберите помощника</strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  На главном экране найдите нужную тему: Бухгалтерия, Юрист, Перевозки, Настройка ПК, Экспресс-анализ Jev или Сайты.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1">
                <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 text-xs font-bold flex items-center justify-center border border-cyan-300 dark:border-cyan-800 mb-2">2</div>
                <strong className="text-xs text-slate-900 dark:text-slate-200 block font-semibold">Нажмите на готовый вопрос</strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Кликните по любой серой кнопке с примером вопроса или нажмите синюю кнопку <strong>«Запустить помощника»</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1">
                <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 text-xs font-bold flex items-center justify-center border border-cyan-300 dark:border-cyan-800 mb-2">3</div>
                <strong className="text-xs text-slate-900 dark:text-slate-200 block font-semibold">Получите готовый ответ</strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  ИИ сформирует развернутый профессиональный ответ с учетом законодательства РФ. Вы сможете скопировать его в 1 клик.
                </p>
              </div>
            </div>
          </div>

          {/* Interface Breakdown (Разбор элементов экрана) */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Info className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              Подробный разбор каждого элемента интерфейса
            </h3>

            <div className="space-y-4 text-xs">
              {/* Element 1 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-700 dark:text-cyan-400 font-semibold">1. Верхняя панель (Шапка)</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 dark:text-slate-400">Навигация, переключатель темы и индикаторы</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pl-1 leading-relaxed text-[11px]">
                  <li><strong>Остаток баланса токенов:</strong> Показывает, сколько вопросов вы можете задать нейросетям до пополнения (например, «~12 500 вопросов»).</li>
                  <li><strong>Кнопка ☀️ / 🌙 (Светлая / Темная тема):</strong> Мгновенно переключает оформление приложения для комфортной работы днем или ночью.</li>
                  <li><strong>Кнопка «💡 Подсказки: ВКЛ/ВЫКЛ»:</strong> Включает или убирает подсказки с пояснениями на экранах.</li>
                  <li><strong>Кнопка «Режим обычный / PRO»:</strong> Позволяет скрыть лишние технические кнопки для новичков или открыть их для сисадминов.</li>
                  <li><strong>Поисковая строка:</strong> Позволяет мгновенно найти нужного помощника по слову (например «налог», «груз», «Jev», «скрипт»).</li>
                </ul>
              </div>

              {/* Element 2 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-700 dark:text-cyan-400 font-semibold">2. Карточка помощника на главном экране</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 dark:text-slate-400">Запуск и совместный доступ</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pl-1 leading-relaxed text-[11px]">
                  <li><strong>Зеленая точка «Готов к работе»:</strong> Означает, что помощник подключен к модели и готов отвечать прямо сейчас.</li>
                  <li><strong>Блок «Чем помогает»:</strong> Понятное описание задач, которые решает данный бот без заумных терминов.</li>
                  <li><strong>Кнопки с примерами вопросов:</strong> Готовые типовые запросы. Нажатие на них сразу открывает диалог с этим текстом.</li>
                  <li><strong>Кнопка «Ссылка»:</strong> Копирует защищенную ссылку. Эту ссылку можно отправить коллеге по работе (бухгалтеру, юристу, водителю), и он сможет пользоваться помощником прямо из браузера или смартфона без пароля.</li>
                </ul>
              </div>

              {/* Element 3 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-700 dark:text-cyan-400 font-semibold">3. Раздел «🎁 Бесплатные нейросети»</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 dark:text-slate-400">Где брать ключи без оплаты</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pl-1 leading-relaxed text-[11px]">
                  <li>В этом каталоге собраны официальные нейросети: TypeSafe Jev (12ms System-1), Alibaba Qwen 2.5 Coder, Zhipu Z.ai GLM-4-Flash, Moonshot Kimi K1.5, Xiaomi Mimo, LogoAI, Hailuo Video, Tencent Hunyuan, Kling 1.5, Сбер GigaChat, Google Gemini 2.5, Groq и DeepSeek.</li>
                  <li>В карточке каждой нейросети указано, нужны ли иностранные карты (для большинства они <strong>НЕ нужны</strong>).</li>
                  <li>Кнопка <strong>«Получить ключ»</strong> открывает официальный сайт провайдера.</li>
                  <li>Кнопка <strong>«Инструкция по шагам»</strong> подробно описывает на русском языке, куда нажать на сайте провайдера, чтобы скопировать ключ.</li>
                </ul>
              </div>

              {/* Element 4 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-700 dark:text-cyan-400 font-semibold">4. Раздел «🔐 Сейф ключей»</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 dark:text-slate-400">Безопасность ваших данных</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pl-1 leading-relaxed text-[11px]">
                  <li>Здесь хранятся ваши личные ключи. Они скрыты за звездочками, чтобы никто не мог подсмотреть их с экрана.</li>
                  <li>Кнопка <strong>«Проверить связь»</strong> делает тестовый запрос и показывает отклик в миллисекундах (зеленый цвет — все отлично).</li>
                </ul>
              </div>

              {/* Element 5: State Compliance Blocks */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/5 via-sky-500/5 to-purple-500/5 dark:from-emerald-950/20 dark:via-sky-950/20 dark:to-purple-950/20 border border-emerald-300 dark:border-emerald-800/80 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">5. Государственные системы учета и комплаенса РФ</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 dark:text-slate-400">Отдельные блоки учета и специализированные ИИ-агенты</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-semibold mb-1">
                      🌾 «Учет ФГИС Зерно»
                    </strong>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Формирование и своевременное гашение СДИЗ, списание партий зерна при перевозке, учет элеваторов и протоколы госмониторинга качества зерна нового урожая.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-semibold mb-1">
                      🏷️ Учет «Честный знак»
                    </strong>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Работа с маркировкой ЦРПТ: эмиссия кодов DataMatrix/КИЗ, агрегация в короба и паллеты (SSCC), ввод в оборот, проверка кодов в электронных УПД и вывод из оборота при рознице.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-semibold mb-1">
                      🥩 Учет «Меркурий»
                    </strong>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Ветеринарный документооборот (ВетИС): гашение входящих эВСД за 24 часа, составление актов несоответствия при недостаче, инвентаризация журнала продукции и защита от блокировок.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-semibold mb-1">
                      🧪 Учет «Сатурн»
                    </strong>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Учет пестицидов и агрохимикатов: регистрация накладных ПАТ, акты применения с обязательной привязкой к кадастровым участкам полей и регламент оповещения пчеловодов.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 md:col-span-2">
                    <strong className="text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-semibold mb-1">
                      🛡️ Учет «Ветис» (Единая экосистема Россельхознадзора)
                    </strong>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Администрирование компонентов «Цербер» (реестр площадок и надзорных объектов), «Аргус» (разрешения на вывоз/ввоз), «Веста» (протоколы лабораторных анализов) и управление ролями в «ВетИС.Паспорт».
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User FAQ */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Частые вопросы обычных пользователей (FAQ)
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
                <strong className="text-slate-900 dark:text-slate-200 block mb-1">С меня спишут деньги за использование?</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                  Нет. Все представленные в стартовой конфигурации модели (TypeSafe Jev, Google Gemini 2.5 Flash, Сбер GigaChat с приветственным грантом, Qwen, GLM-4-Flash, Groq LPU) работают на бесплатных лимитах и не требуют ввода банковских карт.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
                <strong className="text-slate-900 dark:text-slate-200 block mb-1">Видят ли посторонние мои вопросы и документы?</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                  Нет. Ваши API ключи сохраняются исключительно в памяти вашего браузера. Запросы передаются напрямую в нейросеть по защищенному протоколу HTTPS.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
                <strong className="text-slate-900 dark:text-slate-200 block mb-1">Что делать, если закончился баланс токенов?</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                  Откройте раздел «Бесплатные нейросети», получите бесплатный ключ у другого провайдера (например, у Z.ai GLM-4-Flash, TypeSafe Jev, Сбера или Groq) и привяжите его в сейфе.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ADMIN & DEVELOPER MANUAL (ДЛЯ АДМИНА И РАЗРАБОТЧИКА) */}
      {activeManualTab === 'admin' && (
        <div className="space-y-6">
          {/* Architecture Overview */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Принцип работы и архитектура приложения AgentHub
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              AgentHub спроектирован как высокопроизводительный <strong>Client-Authoritative Control Plane</strong> для управления парком автономных агентов и шлюзом к LLM-провайдерам.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-purple-700 dark:text-purple-300 block font-mono text-[11px] uppercase">
                  1. Изоляция и персистентность данных
                </strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Все сущности (агенты, ключи, логи, телеметрия) сохраняются в изолированном префиксе <code className="text-cyan-700 dark:text-cyan-300 font-mono">agenthub_v2_*</code> в <code className="text-cyan-700 dark:text-cyan-300 font-mono">localStorage</code> браузера с версионированием схемы данных. Приложение не требует обязательной внешней СУБД для работы в режиме автономного пульта управления.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-cyan-700 dark:text-cyan-300 block font-mono text-[11px] uppercase">
                  2. Failover Routing Engine (Отказоустойчивость)
                </strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Каждый агент имеет привязку <code className="text-cyan-700 dark:text-cyan-300 font-mono">primaryKeyId</code> и опциональный <code className="text-cyan-700 dark:text-cyan-300 font-mono">fallbackKeyId</code>. При получении HTTP 429 (Rate Limit) или превышении задержки раннер бесшовно перенаправляет запрос на резервный провайдер.
                </p>
              </div>
            </div>
          </div>

          {/* Hidden and Advanced Features (Скрытые и неявные функции) */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 font-mono">
                <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                Скрытые, неявные и расширенные функции системы
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/60 text-purple-700 dark:text-purple-300">
                ADVANCED CONFIG
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Feature 1 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-cyan-700 dark:text-cyan-300 font-semibold text-xs">
                    1. Параметры URL запуска: режим встраивания &mode=embedded
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Iframe Embedding</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Любой сгенерированный URL запуска вида <code className="text-cyan-700 dark:text-cyan-400 bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded font-mono">/launch/[slug]?token=[token]&mode=embedded</code> может быть бесшовно встроен в Confluence, корпоративный портал Битрикс24 или Notion через тег <code className="text-slate-500 font-mono">&lt;iframe&gt;</code> без отображения шапки и управляющих кнопок дашборда.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-amber-700 dark:text-amber-300 font-semibold text-xs">
                    2. Мгновенная инвалидация токенов доступа (Token Revocation)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Zero-Trust</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  В таблице агентов кнопка круговой стрелки рядом с токеном запуска вызывает метод <code className="text-amber-600 dark:text-amber-400 font-mono">regenerateAgentToken(agentId)</code>. Это мгновенно делает старую ссылку недействительной, если сотрудник уволился или ссылка утекла в публичный чат, при этом сам исходный API ключ провайдера в Vault перевыпускать не требуется.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-emerald-700 dark:text-emerald-300 font-semibold text-xs">
                    3. Тарификация и эмуляция живого SSE потока (Burn Rate)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Telemetry Engine</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Телеметрия в реальном времени эмулирует Server-Sent Events с динамическим расчетом стоимости вызова по прайс-листам каждого провайдера: TypeSafe Jev (12ms zero-cost prediction), Google Gemini — $0.0008/1k, GigaChat — $0.001/1k, Groq — $0.0005/1k, Anthropic — $0.003/1k. Кнопка «LIVE ТЕЛЕМЕТРИЯ» позволяет приостановить фоновый поток для снижения нагрузки на CPU.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-purple-700 dark:text-purple-300 font-semibold text-xs">
                    4. Сегментация затрат по центрам затрат (Cost Center Tagging)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">FinOps</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Поля <code className="text-purple-700 dark:text-purple-300 font-mono">accountEmail</code> и <code className="text-purple-700 dark:text-purple-300 font-mono">team</code> позволяют разделять расходы между бухгалтерией, юридическим отделом и ИТ-службой, формируя аналитику для компенсации расходов подразделениями компании.
                </p>
              </div>
            </div>
          </div>

          {/* Webhook & API Execution Specs */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 font-mono">
              <Share2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              Интеграция с внешними системами (API, Webhook, Python, Bash)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Вы можете вызывать агентов напрямую из cron-задач серверов, Telegram-ботов или систем документооборота:
            </p>

            <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
              <div className="p-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-300">Пример cURL запроса к агенту</span>
                <button
                  onClick={() => handleCopy(`curl -X POST "https://ais-dev-.../launch/buhgalter-rf?token=ag_live_buh77" \\
  -H "Content-Type: application/json" \\
  -H "X-Agent-Auth: Bearer ag_live_buh774401bb2" \\
  -d '{"prompt": "Рассчитай налог УСН за 1 квартал", "temperature": 0.2}'`, 'curl_snippet')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-[11px]"
                >
                  {copiedSection === 'curl_snippet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'curl_snippet' ? 'Скопировано' : 'Копировать'}</span>
                </button>
              </div>
              <pre className="p-4 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{`curl -X POST "https://ais-dev-.../launch/buhgalter-rf?token=ag_live_buh77" \\
  -H "Content-Type: application/json" \\
  -H "X-Agent-Auth: Bearer ag_live_buh774401bb2" \\
  -d '{
    "prompt": "Рассчитай налог УСН за 1 квартал 2026 года для ИП без работников",
    "temperature": 0.2,
    "max_tokens": 1500
  }'`}
              </pre>
            </div>
          </div>

          {/* Beget Deployment & Dist Download Guide */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 dark:from-slate-900/90 dark:via-indigo-950/20 dark:to-slate-900/90 border border-blue-200 dark:border-blue-900/50 shadow-sm space-y-4 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Деплой на домен agenthub.yantpp.ru и хостинг Beget.com
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 font-semibold border border-cyan-300 dark:border-cyan-700">
                    agenthub.yantpp.ru
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Пошаговая инструкция развертывания готовой сборки на вашем домене в Beget. Светлая тема установлена по умолчанию.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/dist-beget.zip"
                  download="dist-beget.zip"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  Скачать дистрибутив (.ZIP для Beget)
                </a>
                <a
                  href="/full-project.zip"
                  download="full-project.zip"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
                >
                  <FileText className="w-4 h-4" />
                  Исходный код (.ZIP)
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 space-y-2">
                <div className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center text-[11px] font-mono font-bold">1</span>
                  Развертывание на виртуальном хостинге Beget (agenthub.yantpp.ru)
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  <li><strong>Создание сайта:</strong> В панели <strong>cp.beget.com</strong> откройте раздел <strong>«Сайты»</strong> &rarr; создайте сайт с именем <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">agenthub.yantpp.ru</code>.</li>
                  <li><strong>Привязка домена:</strong> В разделе <strong>«Домены и поддомены»</strong> добавьте поддомен <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">agenthub</code> к вашему основному домену <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">yantpp.ru</code> и прикрепите его к созданному сайту.</li>
                  <li><strong>Загрузка файлов:</strong> Нажмите <strong>«Скачать дистрибутив (.ZIP для Beget)»</strong> выше (файл <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">dist-beget.zip</code>).</li>
                  <li><strong>Распаковка:</strong> В «Файловом менеджере» Beget откройте папку <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">/agenthub.yantpp.ru/public_html/</code>, загрузите архив и нажмите <strong>«Распаковать архив»</strong>. В архив уже включен правильный файл <code className="font-mono">.htaccess</code>.</li>
                  <li><strong>Бесплатный SSL:</strong> В разделе «Домены и поддомены» нажмите значок шестеренки рядом с agenthub.yantpp.ru и включите бесплатный <strong>Let's Encrypt SSL</strong>.</li>
                </ol>
              </div>

              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 space-y-2">
                <div className="font-semibold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[11px] font-mono font-bold">2</span>
                  Настройка DNS (если DNS делегирован стороннему сервису)
                </div>
                <div className="space-y-1.5 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  <p>Если DNS домена yantpp.ru обслуживается не на NS-серверах Beget, добавьте в DNS-панели регистратора запись:</p>
                  <pre className="p-2.5 rounded-lg bg-slate-950 text-cyan-300 font-mono text-[10px] overflow-x-auto leading-relaxed">
{`Тип: A-запись
Имя хоста / Поддомен: agenthub
Значение (IP): IP-адрес вашего аккаунта Beget
(указан в панели управления cp.beget.com справа в блоке «Сервер»)`}
                  </pre>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    После обновления DNS (от 5 до 30 минут) сайт будет моментально открываться по защищенному адресу <code className="font-mono text-cyan-600 dark:text-cyan-400">https://agenthub.yantpp.ru</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance & 152-FZ Recommendations */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Безопасность и соответствие закону 152-ФЗ (О персональных данных)
            </h3>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                1. <strong>Обработка персональных данных граждан РФ:</strong> Для задач с персональными данными (ФИО сотрудников, паспортные данные водителей в путевых листах, зарплатные ведомости) в качестве Primary Key рекомендуется использовать <strong>Сбер GigaChat</strong> или <strong>YandexGPT</strong>, размещенные в дата-центрах на территории РФ.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                2. <strong>Маскирование данных перед отправкой:</strong> Перед отправкой текста в международные модели (DeepSeek, Gemini) используйте внутренние регулярные выражения для обезличивания номеров телефонов, серий паспортов и номеров договоров.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
