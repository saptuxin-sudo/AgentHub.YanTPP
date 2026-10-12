import { FreeAiModel } from '../types';

export const FREE_AI_MODELS: FreeAiModel[] = [
  {
    id: 'free-google-gemini',
    name: 'Google AI Studio (Gemini 2.5 Flash & Pro)',
    provider: 'google',
    company: 'Google DeepMind',
    officialUrl: 'https://aistudio.google.com',
    getKeyUrl: 'https://aistudio.google.com/app/apikey',
    badge: 'Бесплатные лимиты',
    freeLimitsDescription: '15 запросов в минуту (RPM) и до 1500 запросов в сутки абсолютно бесплатно. Окно контекста до 1 000 000 токенов.',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'gemini-2.5-flash / gemini-2.5-pro',
    description: 'Один из самых мощных бесплатных API в мире. Отлично справляется с написанием сайтов, анализом огромных PDF-документов, договоров и юридических текстов.',
    howToGetSteps: [
      'Перейдите на aistudio.google.com и войдите под стандартным Google аккаунтом.',
      'Нажмите синюю кнопку «Get API key» в левом верхнем углу.',
      'Выберите «Create API key in new project».',
      'Скопируйте ключ вида AIzaSy... и вставьте в наш сейф ключей на дашборде.'
    ],
    bestForThemes: [
      'Создание приложений и сайтов',
      'Юридические услуги в РФ',
      'Анализ и проверка контрагентов по бизнесу РФ',
      'Анализ доступных нейросетей и их использование в РФ'
    ]
  },
  {
    id: 'free-sber-gigachat',
    name: 'GigaChat API (Сбер)',
    provider: 'gigachat',
    company: 'ПАО Сбербанк (Россия)',
    officialUrl: 'https://developers.sber.ru/portal/products/gigachat-api',
    getKeyUrl: 'https://developers.sber.ru/studio/workspaces',
    badge: 'Доступно в РФ',
    freeLimitsDescription: '1 000 000 бесплатных токенов при регистрации физлицам по Сбер ID. Полное соответствие законодательству РФ (152-ФЗ).',
    rfAccessStatus: 'Официально в РФ (рубли/Сбер ID)',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'GigaChat-Pro / GigaChat',
    description: 'Официальная российская языковая модель. Лучше всех понимает реалии законодательства РФ, бухгалтерский учет, терминологию путевых листов и накладных.',
    howToGetSteps: [
      'Зайдите на developers.sber.ru и авторизуйтесь через Сбер ID (для физлиц или юрлиц).',
      'В личном кабинете перейдите в раздел «GigaChat API» и создайте проект.',
      'Сгенерируйте Client ID и Client Secret (или Authorization Key).',
      'Получите 1 млн приветственных токенов для бесплатных тестов.'
    ],
    bestForThemes: [
      'Бухгалтерские услуги в РФ',
      'Юридические услуги в РФ',
      'Учет и сопровождение перевозчиков в РФ',
      'Анализ и проверка контрагентов по бизнесу РФ'
    ]
  },
  {
    id: 'free-yandex-gpt',
    name: 'YandexGPT API (Yandex Cloud Foundation Models)',
    provider: 'yandex',
    company: 'Яндекс (Россия)',
    officialUrl: 'https://cloud.yandex.ru/services/yandexgpt',
    getKeyUrl: 'https://console.yandex.cloud/',
    badge: 'Доступно в РФ',
    freeLimitsDescription: 'Стартовый грант 4 000 руб на тестирование сервисов Yandex Cloud при первой регистрации. Оплата в рублях без зарубежных карт.',
    rfAccessStatus: 'Официально в РФ (рубли/Сбер ID)',
    cardRequired: 'Только российская карта',
    recommendedModelId: 'yandexgpt-lite / yandexgpt-pro',
    description: 'Отечественная модель Яндекса, интегрированная с российскими облачными хранилищами. Идеальна для корпоративных баз знаний и работы с документами по законам РФ.',
    howToGetSteps: [
      'Авторизуйтесь в console.yandex.cloud с обычным Яндекс ID.',
      'Создайте платежный аккаунт и активируйте приветственный грант.',
      'В каталоге выберите «Foundation Models» и создайте API-ключ сервисного аккаунта.',
      'Используйте ключ в связке с идентификатором каталога (folder-id).'
    ],
    bestForThemes: [
      'Бухгалтерские услуги в РФ',
      'Учет ФГИС Зерно',
      'Анализ и проверка контрагентов по бизнесу РФ'
    ]
  },
  {
    id: 'free-groq-lpu',
    name: 'Groq Cloud (LPU Ultra-Fast Inference)',
    provider: 'groq',
    company: 'Groq Inc.',
    officialUrl: 'https://groq.com',
    getKeyUrl: 'https://console.groq.com/keys',
    badge: '100% Бесплатно',
    freeLimitsDescription: 'Полностью бесплатный доступ (до 30 запросов в минуту и до 14 400 запросов в день) на суперчипах LPU. Скорость до 500 токенов/сек!',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'llama-3.3-70b-versatile / mixtral-8x7b',
    description: 'Самый быстрый бесплатный провайдер в мире. Генерация кода и текстов происходит мгновенно (менее секунды). Идеально для скриптов ПК и генерации кода сайтов.',
    howToGetSteps: [
      'Перейдите на console.groq.com.',
      'Войдите через аккаунт GitHub или Google в один клик.',
      'Откройте вкладку «API Keys» в левом меню.',
      'Нажмите «Create API Key», скопируйте ключ (начинается с gsk_...) и сохраните его.'
    ],
    bestForThemes: [
      'Создание приложений и сайтов',
      'Настройка ПК и работа с файлами',
      'Анализ доступных нейросетей и их использование в РФ'
    ]
  },
  {
    id: 'free-deepseek-platform',
    name: 'DeepSeek Platform (V3 & R1 Reasoning)',
    provider: 'deepseek',
    company: 'DeepSeek AI',
    officialUrl: 'https://deepseek.com',
    getKeyUrl: 'https://platform.deepseek.com/api_keys',
    badge: 'Стартовый баланс',
    freeLimitsDescription: '5 миллионов бесплатных токенов при регистрации нового аккаунта. Самые низкие в индустрии цены на дозакупку ($0.14 за 1M токенов).',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'deepseek-chat / deepseek-reasoner',
    description: 'Лидер мировых рейтингов по логическому мышлению (Reasoning) и написанию сложного программного кода. Превосходит большинство платных аналогов.',
    howToGetSteps: [
      'Зайдите на platform.deepseek.com.',
      'Зарегистрируйтесь по Email или Google аккаунту.',
      'Перейдите в раздел «API Keys» и нажмите «Create API Key».',
      'Скопируйте ключ sk-ds-... для использования.'
    ],
    bestForThemes: [
      'Создание приложений и сайтов',
      'Настройка ПК и работа с файлами',
      'Анализ и проверка контрагентов по бизнесу РФ',
      'Анализ доступных нейросетей и их использование в РФ'
    ]
  },
  {
    id: 'free-openrouter',
    name: 'OpenRouter (Бесплатные модели :free)',
    provider: 'openrouter',
    company: 'OpenRouter Aggregator',
    officialUrl: 'https://openrouter.ai',
    getKeyUrl: 'https://openrouter.ai/keys',
    badge: '100% Бесплатно',
    freeLimitsDescription: 'Более 15 моделей с суффиксом :free абсолютно бесплатны (Google Gemma 2, Meta Llama 3, Qwen 2.5 72B, DeepSeek). 20 запросов в минуту.',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'meta-llama/llama-3.3-70b-instruct:free',
    description: 'Единый шлюз ко всем мировым нейросетям с общим ключом. Позволяет переключаться между десятками бесплатных открытых моделей без смены кода.',
    howToGetSteps: [
      'Перейдите на openrouter.ai и нажмите «Sign In» (через Google или GitHub).',
      'Откройте раздел «Keys» (openrouter.ai/keys).',
      'Нажмите «Create Key», задайте имя и оставьте лимит пустым.',
      'Скопируйте полученный ключ вида sk-or-v1-...'
    ],
    bestForThemes: [
      'Создание приложений и сайтов',
      'Учет и сопровождение перевозчиков в РФ',
      'Учет «Честный знак»',
      'Анализ доступных нейросетей и их использование в РФ'
    ]
  },
  {
    id: 'free-mistral-ai',
    name: 'Mistral AI (La Plateforme Free Tier)',
    provider: 'mistral',
    company: 'Mistral AI (Франция)',
    officialUrl: 'https://mistral.ai',
    getKeyUrl: 'https://console.mistral.ai/api-keys/',
    badge: 'Бесплатные лимиты',
    freeLimitsDescription: 'Бесплатный эксперимент-тариф (Free Tier) с доступом к Mistral Small, Mistral NeMo и Codestral (1 запрос в секунду).',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'codestral-latest / mistral-small-latest',
    description: 'Европейская модель открытой архитектуры, строго соблюдающая безопасность данных. Codestral — одна из лучших моделей для автодополнения кода.',
    howToGetSteps: [
      'Зайдите на console.mistral.ai и зарегистрируйтесь.',
      'Подтвердите email адрес.',
      'Откройте меню «API Keys» и сгенерируйте персональный ключ.',
      'Ключ готов к использованию на бесплатном тарифе.'
    ],
    bestForThemes: [
      'Создание приложений и сайтов',
      'Настройка ПК и работа с файлами'
    ]
  },
  {
    id: 'free-huggingface',
    name: 'Hugging Face (Serverless Inference API)',
    provider: 'huggingface',
    company: 'Hugging Face',
    officialUrl: 'https://huggingface.co',
    getKeyUrl: 'https://huggingface.co/settings/tokens',
    badge: '100% Бесплатно',
    freeLimitsDescription: 'Бесплатный доступ через Serverless Inference API к сотням тысяч открытых моделей машинного обучения, классификаторов и эмбеддингов.',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'Qwen/Qwen2.5-Coder-32B-Instruct',
    description: 'Главный репозиторий открытых ИИ-моделей в мире. Позволяет бесплатно запускать специализированные модели для классификации текстов и распознавания документов.',
    howToGetSteps: [
      'Зарегистрируйтесь на huggingface.co.',
      'Перейдите в Settings -> Access Tokens.',
      'Нажмите «New token», выберите тип «Read».',
      'Скопируйте ключ hf_... и используйте в своих скриптах.'
    ],
    bestForThemes: [
      'Настройка ПК и работа с файлами',
      'Учет «Ветис»',
      'Анализ доступных нейросетей и их использование в РФ'
    ]
  },
  {
    id: 'free-qwen-alibaba',
    name: 'Qwen 2.5 & Qwen Coder (Alibaba Cloud DashScope)',
    provider: 'qwen',
    company: 'Alibaba Cloud (Tongyi Qianwen)',
    officialUrl: 'https://dashscope.aliyun.com',
    getKeyUrl: 'https://dashscope.console.aliyun.com',
    badge: '100% Бесплатно',
    freeLimitsDescription: 'Бесплатный приветственный пул до 1 000 000 токенов на каждую модель: Qwen 2.5 72B, Qwen 2.5 Coder 32B и Qwen-VL. Бесплатный доступ через OpenRouter :free.',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'qwen-2.5-72b-instruct / qwen-2.5-coder-32b',
    description: 'Мировой флагман открытых нейросетей от Alibaba. Потрясающе пишет код сайтов, парсеры и скрипты автоматизации, свободно владеет русским языком и распознает документы по фото.',
    howToGetSteps: [
      'Перейдите на dashscope.console.aliyun.com или openrouter.ai.',
      'Авторизуйтесь через Google или GitHub аккаунт.',
      'В меню API-Key создайте новый секретный ключ (вида sk-...).',
      'Используйте бесплатные модели Qwen 2.5 без привязки карт.'
    ],
    bestForThemes: [
      'Создание приложений и сайтов',
      'Настройка ПК и работа с файлами',
      'Учет и сопровождение перевозчиков в РФ',
      'Анализ доступных нейросетей и их использование в РФ'
    ]
  },
  {
    id: 'free-zai-glm',
    name: 'Z.ai GLM-4 & GLM-4-Flash (Zhipu BigModel)',
    provider: 'glm',
    company: 'Zhipu AI (Tsinghua University)',
    officialUrl: 'https://open.bigmodel.cn',
    getKeyUrl: 'https://open.bigmodel.cn/usercenter/apikeys',
    badge: '100% Бесплатно',
    freeLimitsDescription: 'Флагманская модель GLM-4-Flash полностью и навсегда бесплатна через API (контекст 128k токенов). Дополнительный грант на GLM-4-Plus при регистрации.',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'glm-4-flash / glm-4-plus',
    description: 'Главная научная модель Китая от Zhipu AI. Высочайшая эрудиция в корпоративном поиске, анализе контрагентов, аудите бизнес-рисков и обработке сложных русскоязычных запросов.',
    howToGetSteps: [
      'Зайдите на open.bigmodel.cn (Zhipu Open Platform).',
      'Зарегистрируйтесь по Email или номеру телефона.',
      'Перейдите в User Center -> API Keys.',
      'Скопируйте ключ и активируйте бесплатный безлимит на модель GLM-4-Flash.'
    ],
    bestForThemes: [
      'Анализ и проверка контрагентов по бизнесу РФ',
      'Юридические услуги в РФ',
      'Бухгалтерские услуги в РФ',
      'Анализ доступных нейросетей и их использование в РФ'
    ]
  },
  {
    id: 'free-kimi-moonshot',
    name: 'Moonshot Kimi (K1.5 & Long-Context 2M)',
    provider: 'kimi',
    company: 'Moonshot AI',
    officialUrl: 'https://moonshot.cn',
    getKeyUrl: 'https://platform.moonshot.cn/console/api-keys',
    badge: 'Стартовый баланс',
    freeLimitsDescription: 'Стартовый бесплатный грант 15 RMB (~200 руб / миллионы токенов) при регистрации. Непревзойденный контекст до 2 000 000 токенов (книги и судебные дела целиком).',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'moonshot-v1-128k / kimi-k1.5',
    description: 'Пионер сверхдлинного контекста. Способна за один запрос прочитать 200 страниц договора, судебные тома арбитражных дел или годовую бухгалтерскую отчетность с идеальной точностью.',
    howToGetSteps: [
      'Перейдите на platform.moonshot.cn.',
      'Пройдите быструю регистрацию по Email.',
      'В панели управления откройте вкладку «API Keys».',
      'Сгенерируйте токен и используйте стартовый грант для глубокого анализа договоров.'
    ],
    bestForThemes: [
      'Юридические услуги в РФ',
      'Бухгалтерские услуги в РФ',
      'Анализ и проверка контрагентов по бизнесу РФ',
      'Учет и сопровождение перевозчиков в РФ'
    ]
  },
  {
    id: 'free-mimo-xiaomi',
    name: 'Xiaomi MiLM & Mimo AI (Edge & System AI)',
    provider: 'mimo',
    company: 'Xiaomi Inc.',
    officialUrl: 'https://ai.xiaomi.com',
    getKeyUrl: 'https://open.ai.xiaomi.com',
    badge: 'Бесплатные лимиты',
    freeLimitsDescription: 'Бесплатные ежедневные квоты для разработчиков. Сверхлегкая архитектура для быстрой работы на ПК, смартфонах и в локальных сетях.',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'milm-7b-edge / mimo-sys-v1',
    description: 'Экосистемная модель Xiaomi, заточенная под системную диагностику, решение проблем с ПК, управление файлами и анализ телематики с датчиков (ГЛОНАСС, IoT, умные устройства).',
    howToGetSteps: [
      'Зайдите на открытый портал Xiaomi AI (open.ai.xiaomi.com).',
      'Авторизуйтесь под Mi Account или Email.',
      'Создайте проект в AI Console и сгенерируйте API Key.',
      'Подключите модель для диагностики систем и файлов.'
    ],
    bestForThemes: [
      'Настройка ПК и работа с файлами',
      'Учет «Сатурн»',
      'Учет и сопровождение перевозчиков в РФ'
    ]
  },
  {
    id: 'free-logoai-design',
    name: 'LogoAI & Brandmark Visual Engine',
    provider: 'logoai',
    company: 'LogoAI Lab',
    officialUrl: 'https://www.logoai.com',
    getKeyUrl: 'https://www.logoai.com/api',
    badge: 'Бесплатные лимиты',
    freeLimitsDescription: 'Бесплатный режим предпросмотра генерации логотипов, брендбуков, визиток и фавиконов для сайтов российских компаний.',
    rfAccessStatus: 'Работает напрямую в РФ',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'logoai-vector-v2',
    description: 'Специализированная дизайнерская нейросеть для бизнеса. Мгновенно генерирует фирменный стиль, эмблемы компаний, оформление сайтов и брендинг автопарков грузоперевозчиков.',
    howToGetSteps: [
      'Перейдите на logoai.com.',
      'Введите название вашей компании и сферу деятельности.',
      'Получите доступ к AI Brand Engine через личный кабинет.',
      'Используйте сгенерированные стили и векторные ассеты для сайтов и документов.'
    ],
    bestForThemes: [
      'Создание приложений и сайтов',
      'Учет и сопровождение перевозчиков в РФ',
      'Общие бизнес-задачи'
    ]
  },
  {
    id: 'free-hailuo-minimax',
    name: 'Hailuo AI & MiniMax Multimodal (Video & Text)',
    provider: 'hailuo',
    company: 'MiniMax AI (Hailuo)',
    officialUrl: 'https://hailuoai.video',
    getKeyUrl: 'https://api.minimax.chat',
    badge: 'Стартовый баланс',
    freeLimitsDescription: 'Бесплатные ежедневные кредиты для генерации фотореалистичных видеороликов, озвучки текста и текстовая модель abab 6.5s с бесплатным стартовым грантом.',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'minimax-abab-6.5s / hailuo-video-01',
    description: 'Флагманская мультимодальная нейросеть. Создает потрясающие рекламные видеоролики для сайтов, реалистичную голосовую озвучку для автоинформаторов и консультаций водителей.',
    howToGetSteps: [
      'Зайдите на api.minimax.chat или hailuoai.video.',
      'Зарегистрируйтесь по Email.',
      'Получите стартовый баланс токенов и видео-кредитов.',
      'Создайте API-ключ для интеграции в промо-страницы и ботов.'
    ],
    bestForThemes: [
      'Создание приложений и сайтов',
      'Анализ доступных нейросетей и их использование в РФ',
      'Учет и сопровождение перевозчиков в РФ'
    ]
  },
  {
    id: 'free-hunyuan-tencent',
    name: 'Tencent Hunyuan (Hunyuan-Large MOE)',
    provider: 'hunyuan',
    company: 'Tencent Cloud',
    officialUrl: 'https://hunyuan.tencent.com',
    getKeyUrl: 'https://console.cloud.tencent.com/hunyuan',
    badge: 'Бесплатные лимиты',
    freeLimitsDescription: '100 000 бесплатных токенов каждый день в консоли Tencent Cloud. Мультимодальная модель с мощнейшим OCR для распознавания накладных и таблиц.',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'hunyuan-large / hunyuan-vision',
    description: 'Корпоративная языковая модель от создателей WeChat. Идеально распознает сканы путевых листов, табличные отчеты по телематике ГЛОНАСС и сложные накладные с печатями.',
    howToGetSteps: [
      'Перейдите в консоль cloud.tencent.com.',
      'Активируйте сервис Hunyuan API.',
      'Сгенерируйте SecretId и SecretKey в панели доступа.',
      'Используйте ежедневный бесплатный пакет токенов.'
    ],
    bestForThemes: [
      'Учет и сопровождение перевозчиков в РФ',
      'Учет «Меркурий»',
      'Бухгалтерские услуги в РФ'
    ]
  },
  {
    id: 'free-kling-kuaishou',
    name: 'Kling AI (Kuaishou Kling 1.5 Video Studio)',
    provider: 'kling',
    company: 'Kuaishou Technology',
    officialUrl: 'https://klingai.com',
    getKeyUrl: 'https://klingai.com/api',
    badge: 'Бесплатные лимиты',
    freeLimitsDescription: '66 бесплатных ежедневных кредитов (обновляются каждые 24 часа) для генерации фотореалистичных 1080p видеороликов и графических баннеров.',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'kling-v1.5-pro / kling-video-gen',
    description: 'Мировой лидер фотореалистичной генерации видео. Позволяет создавать эффектные визуальные презентации для сайтов, видеоинструкции для водителей и рекламные креативы.',
    howToGetSteps: [
      'Перейдите на klingai.com и войдите через Google аккаунт.',
      'Получите 66 бесплатных баллов в день.',
      'В настройках профиля перейдите в раздел Developer API.',
      'Используйте ключ для генерации промо-видео и обучающих роликов.'
    ],
    bestForThemes: [
      'Создание приложений и сайтов',
      'Учет и сопровождение перевозчиков в РФ',
      'Анализ доступных нейросетей и их использование в РФ'
    ]
  },
  {
    id: 'free-typesafe-jev',
    name: 'TypeSafe AI Jev (System One Decision Model)',
    provider: 'jev',
    company: 'TypeSafe AI (San Francisco)',
    officialUrl: 'https://typesafe.ai',
    getKeyUrl: 'https://typesafe.ai/developers',
    badge: '100% Бесплатно',
    freeLimitsDescription: 'Бесплатный стартовый Developer Tier (до 100 000 структурированных решений в месяц). Вывод до 200x быстрее и 400x дешевле классических LLM!',
    rfAccessStatus: 'Нужен аккаунт Google/GitHub',
    cardRequired: 'Карта НЕ требуется',
    recommendedModelId: 'jev-core / jev-flash (System-1 Decision Engine)',
    description: 'Инновационная модель System One, созданная экс-разработчиками OpenAI (соавторами InstructGPT/ChatGPT). Не сочиняет случайный текст, а выдает строго типизированные параллельные решения, вероятность и скоринг без галлюцинаций (Zero Hallucination). Идеальна для роутинга в коде, классификации договоров, скоринга контрагентов и телематических аномалий.',
    howToGetSteps: [
      'Перейдите на typesafe.ai и нажмите «Get API Access» (вход через GitHub или Google).',
      'Создайте новый проект в консоли разработчика TypeSafe Console.',
      'Сгенерируйте API ключ вида jev_sk_...',
      'Используйте сверхбыстрый движок решений для мгновенной валидации и классификации.'
    ],
    bestForThemes: [
      'Создание приложений и сайтов',
      'Анализ и проверка контрагентов по бизнесу РФ',
      'Учет «Честный знак»',
      'Бухгалтерские услуги в РФ'
    ]
  }
];
