import * as React from "react";
import {Box, Deck, FlexBox, Heading, ListItem, Notes, Slide, Text, UnorderedList} from "spectacle";
import mermaid from "mermaid";
import { QRCodeSVG } from 'qrcode.react';

// ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ
const Placeholder: React.FC<{
  title: string;
  subtitle?: string;
  bullets?: string[];
}> = ({title, subtitle, bullets}) => (
  <Box
    padding={24}
    borderRadius={20}
    border="3px dashed #9CA3AF"
    backgroundColor="#F3F4F6"
  >
    <Heading fontSize="h4" margin="0 0 8px 0">{title}</Heading>
    {subtitle && (
      <Text fontSize="24px" color="#4B5563" margin="0 0 8px 0">
        {subtitle}
      </Text>
    )}
    {bullets && bullets.length > 0 && (
      <UnorderedList>
        {bullets.map((b, i) => (
          <ListItem key={i}>{b}</ListItem>
        ))}
      </UnorderedList>
    )}
  </Box>
);

let __mmdInit = false;
const MermaidDiagram: React.FC<{ chart: string; caption?: string }> = ({chart, caption}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!__mmdInit) {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "neutral",
        flowchart: {curve: "basis"},
      });
      __mmdInit = true;
    }
    const id = "mmd-" + Math.random().toString(36).slice(2);
    mermaid.render(id, chart).then(({svg}) => {
      if (ref.current) ref.current.innerHTML = svg;
    });
  }, [chart]);

  return (
    <Box padding={16} border="1px solid #E5E7EB" borderRadius={16} backgroundColor="#F9FAFB">
      <div ref={ref}/>
      {caption && (
        <Text fontSize="18px" color="#6B7280" margin="8px 0 0 0">
          {caption}
        </Text>
      )}
    </Box>
  );
};

// ——— простые SVG-чарты как плейсхолдеры, где Mermaid не подходит
const BansBarChart: React.FC<{
  data?: number[]
}> = ({data = [600, 800, 900, 1000, 1200, 1100, 950, 1050, 980, 1020, 970, 900]}) => {
  const W = 600, H = 220, pad = 32;
  const max = Math.max(...data);
  const bw = (W - pad * 2) / data.length;
  return (
    <Box padding={16} border="1px solid #E5E7EB" borderRadius={16} backgroundColor="#F9FAFB">
      <svg width="100%" height="220" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Баны по месяцам">
        <rect x="0" y="0" width={W} height={H} fill="white"/>
        {/* axes */}
        <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="#9CA3AF"/>
        <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="#9CA3AF"/>
        {data.map((v, i) => {
          const h = ((H - pad * 2) * v) / max;
          const x = pad + i * bw + 4;
          const y = H - pad - h;
          return <rect key={i} x={x} y={y} width={bw - 8} height={h} rx="4" fill="#2563EB" opacity="0.85"/>;
        })}
      </svg>
      <Text fontSize="18px" color="#6B7280" margin="8px 0 0 0">~10 000 банов / 5–6 FP</Text>
    </Box>
  );
};

const SizeVsEfficiencyChart: React.FC = () => {
  const W = 600, H = 220, pad = 32;
  const path = `M ${pad},${pad + 20} C ${W / 3},${pad} ${W / 2},${H - pad} ${W - pad},${H - pad - 10}`;
  return (
    <Box padding={16} border="1px solid #E5E7EB" borderRadius={16} backgroundColor="#F9FAFB">
      <svg width="100%" height="220" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Размер кода vs эффективность">
        <rect x="0" y="0" width={W} height={H} fill="white"/>
        {/* axes */}
        <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="#9CA3AF"/>
        <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="#9CA3AF"/>
        <path d={path} stroke="#2563EB" strokeWidth="3" fill="none"/>
        <Text x={W - pad - 90} y={H - 6} fontSize="12">Размер кода →</Text>
        <Text x={6} y={14} fontSize="12">Эффективность ↑</Text>
      </svg>
      <Text fontSize="18px" color="#6B7280" margin="8px 0 0 0">Чистый вайб падает с ростом KLOC</Text>
    </Box>
  );
};

const SectionTitle: React.FC<{ label: string; caption?: string }> = ({
                                                                       label,
                                                                       caption,
                                                                     }) => (
  <Box>
    <Heading fontSize="h2" margin="0 0 8px 0">{label}</Heading>
    {caption && (
      <Text fontSize="28px" color="#6B7280" margin="0">{caption}</Text>
    )}
  </Box>
);

const theme = {
  colors: {
    primary: "#0B1221",
    secondary: "#6B7280",
    accent: "#2563EB",
    surface: "#FFFFFF",
  },
  fonts: {
    header: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    text: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  },
};

const MATERIALS_URL = "https://your-repo-or-notion-link"; // TODO: замени на реальную ссылку

const QRBlock: React.FC<{ value: string; label?: string }> = ({value, label = "Материалы доклада"}) => (
  <Box
    padding={16}
    border="1px dashed #9CA3AF"
    borderRadius={16}
    backgroundColor="#F9FAFB"
    display="flex"
    flexDirection="column"
    alignItems="center"
    gap={8}
  >
    <QRCodeSVG
      value={"123"}/>
    <Text fontSize="18px" color="#6B7280">{label}</Text>
    <Text fontSize="14px" color="#9CA3AF">{value}</Text>
  </Box>
);

const FooterTemplate = () => (
  <Box display="flex" justifyContent="space-between" width="100%" padding="12px 16px">
    <Text fontSize="18px" color="#9CA3AF">Вайбкодинг: мифы vs реальность</Text>
    <Text fontSize="18px" color="#9CA3AF">@inDrive • DevProd</Text>
  </Box>
);

export default function DeckComponent() {
  return (
    <Deck theme={theme as any} template={<FooterTemplate/>}>
      {/* 1. ТИТУЛ */}
      <Slide backgroundColor="surface">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center" gap={24}>
          <Heading>Вайбкодинг: мифы vs реальность</Heading>
          <Text fontSize="32px" color="secondary">как ускоряться безопасно и без хайпа</Text>
          <FlexBox gap={24}>
            <Placeholder
              title="Плейсхолдер: логотип команды/ивента"
              bullets={["Лого конференции / компании"]}
            />
            <QRBlock value={MATERIALS_URL} label="QR на материалы"/>
          </FlexBox>
        </FlexBox>
        <Notes>
          {`
          Открытие: «анти-хайп, про практику». Я — условно вайбкодер: с сентября почти не пишу код руками, но пользую гибрид.
          Не говорить фразу «времени мало».
          `}
        </Notes>
      </Slide>

      {/* 1.1 О СЕБЕ / «УСЛОВНО ВАЙБКОДЕР» */}
      <Slide>
        <SectionTitle label="Кто я и почему «условно» вайбкодер?" caption="inDrive • Release / Dev Productivity"/>
        <FlexBox gap={16} margin="24px 0">
          <Placeholder
            title="Роли и зона ответственности"
            bullets={[
              "Release engineering, CI/CD, DevProd",
              "Много YAML/Bash → теперь LLM",
              "Навигация по legacy через агента",
            ]}
          />
          <Placeholder
            title="Как работаю с кодом сегодня"
            subtitle="Гибрид вместо чистого вайба"
            bullets={[
              "План: Gemini 2.5 Pro (часто через AI Studio)",
              "Исполнение: Claude Code (go-to агент)",
              "Рефакторинг/некодовые: ChatGPT / GPT-4",
            ]}
          />
        </FlexBox>
        <Notes>
          {`
          Акцент: «условно» = не автопилот, а управляемый гибрид. Эту презентацию тоже частично вайбкодил.
          `}
        </Notes>
      </Slide>

      {/* 2. HOOK — обещания из техтвиттера */}
      <Slide>
        <SectionTitle label="Хук: обещания из техтвиттера" caption="с чем сравним реальность"/>
        <FlexBox gap={16} margin="24px 0">
          <Placeholder
            title="Скриншот твита-хайпа #1"
            subtitle="«ИИ заменил команду — $1M ARR за неделю»"
            bullets={["Затереть ники/аватарки", "Контрастные цифры"]}
          />
          <Placeholder
            title="Скриншот твита-хайпа #2"
            subtitle="«Агент всё делает, я код не читаю»"
            bullets={["Подчеркнуть «без ревью»", "Эмодзи-предостережение"]}
          />
          <Placeholder
            title="Скриншот твита-хайпа #3"
            subtitle="«Агенты тянут любые проекты»"
            bullets={["Большой репозиторий на фоне", "Микро-иконка бесконечного цикла"]}
          />
        </FlexBox>
        <Notes>
          {`
          Реплика: «У меня тоже есть эффектные цифры — антиспам-бот… Но давайте проверим, где правда, а где фокус».
          `}
        </Notes>
      </Slide>

      {/* 3. БЫСТРОЕ ОПРЕДЕЛЕНИЕ (ВИЗУАЛЬНОЕ) */}
      <Slide>
        <SectionTitle label="Что такое вайбкодинг?" caption="визуально, без определений"/>
        <MermaidDiagram
          chart={`
            flowchart LR
              A["Естественные инструкции"] --> B["LLM / Агент"]
              B --> C["Изменения в коде"]
              C --> D{"Тесты / Снэпшоты"}
              D -- ok --> E["Ship (MVP)"]
              D -- fail --> B
              style D fill:#E8F2FF,stroke:#2563EB,stroke-width:2px
          `}
          caption="Ускоритель, а не автопилот: цикл закрывается тестами"
        />
        <Notes>
          {`
          Голосом: вайбкодинг = ускоритель, не автопилот. Контроль тестами обязателен.
          `}
        </Notes>
      </Slide>

      {/* 4. МИФ 1 */}
      <Slide>
        <SectionTitle label="Миф 1" caption="«Вайбкодинг заменяет команду»"/>
        <FlexBox gap={24} margin="24px 0">
          <MermaidDiagram
            chart={`
            flowchart LR
              Ext[Внешний мир] -->|"1 эндпоинт (узкий периметр)"| GW[(Gateway)]
              GW --> Core[Ядро антиспама]
              Core --> DB[(Хранилище)]
              GW -. закрыто .-> X1[прочие endpoints]
              style GW fill:#EEF2FF,stroke:#6366F1,stroke-width:2px
            `}
          />
          <BansBarChart/>
        </FlexBox>
        <Notes>
          {`
          Голос: узкая задача — идеально. Ключ: ship простое (копирование сессии), не лезть в «идеальный веб-логин».
          `}
        </Notes>
      </Slide>

      {/* 5. P1 */}
      <Slide backgroundColor="#0B1221">
        <FlexBox height="100%" alignItems="center" justifyContent="center" flexDirection="column" gap={20}>
          <Heading color="#FFFFFF">P1. Сначала сузь периметр — потом ускоряй</Heading>
          <Placeholder
            title="Мем/иллюстрация: «нож вместо швейцарского ножа»"
            subtitle="Один чёткий сценарий > всё и сразу"
            bullets={["Наглядно: минимум функций", "Стикер «Done > Perfect»"]}
          />
        </FlexBox>
        <Notes>{`К привязке: антиспам-бот и развилка деплоя.`}</Notes>
      </Slide>

      {/* 6. МИФ 2 */}
      <Slide>
        <SectionTitle label="Миф 2" caption="«Код можно не смотреть»"/>
        <FlexBox gap={24} margin="24px 0">
          <MermaidDiagram
            chart={`
              flowchart TB
                ext[Пользователь/Внешний мир] -->|"минимальный API"| gw[Gateway]
                gw -->|"auth / roles"| svc[Сервис]
                gw --> log[Логи / Аудит]
                svc --> store[(Хранилище)]
                gw -. reject .-> rej[403/429]
                classDef shield fill:#ECFDF5,stroke:#10B981,stroke-width:2px,color:#065F46;
                class gw,log shield;
            `}
          />
          <Placeholder
            title="Скрин-мок: PR-отчёт"
            subtitle="Читаемый авто-репорт по проверкам"
            bullets={["До/после оформление", "Навигация по ошибкам"]}
          />
        </FlexBox>
        <Notes>
          {`Внутренние утилиты — проще, но заборы нужны. Публичный периметр — ревью обязательно.`}
        </Notes>
      </Slide>

      {/* 6.1 КЕЙС TEA — БЕЗОПАСНОСТЬ */}
      <Slide>
        <SectionTitle label="Кейс: Tea" caption="что бывает без «заборов»"/>
        <FlexBox gap={16} margin="24px 0">
          <Placeholder
            title="Скриншот/заметка СМИ (затемнить данные)"
            subtitle="Публичный сервис без базовой безопасности"
            bullets={[
              "Требовали ID+фото «на верификацию»",
              "Хранили гео/чувствительные поля",
              "Данные «торчали» — компрометация",
            ]}
          />
          <Placeholder
            title="Вывод (крупно)"
            bullets={[
              "Сужай поверхность атаки",
              "Не храни лишнее по умолчанию",
              "И хотя бы ИИ-security-проход (лучше — человеческий)",
            ]}
          />
        </FlexBox>
        <Notes>{`Короткая история → один чёткий вывод для аудитории.`}</Notes>
      </Slide>

      {/* 7. P2 */}
      <Slide backgroundColor="#0B1221">
        <FlexBox height="100%" alignItems="center" justifyContent="center" flexDirection="column" gap={20}>
          <Heading color="#FFFFFF">P2. Всегда ставь «заборы»</Heading>
          <Placeholder
            title="Мем: «Велосипед с мотором и тормозами»"
            subtitle="Скорость ≠ отмена тормозов"
            bullets={["Пиктограмма тормоза", "Знак стоп"]}
          />
        </FlexBox>
        <Notes>{`Закрепить через Tea и антиспам-бот (узкий периметр).`}</Notes>
      </Slide>

      {/* 8. МИФ 3 */}
      <Slide>
        <SectionTitle label="Миф 3" caption="«Агенты тянут любые проекты»"/>
        <FlexBox gap={24} margin="24px 0">
          <SizeVsEfficiencyChart/>
          <MermaidDiagram
            chart={`
              flowchart LR
                start([Старт]) --> run["Запуск команды"]
                run --> fail{"Ошибка?"}
                fail -- да --> think["Анализ лога"]
                think --> ctx{"Контекст переполнен / не та папка?"}
                ctx -- да --> compact["/compact / смена директории"]
                compact --> run
                ctx -- нет --> fix["Предложить фикс"] --> run
                fail -- нет --> done([Готово])
            `}
          />
        </FlexBox>
        <Notes>
          {`Сильные стороны: навигация по базе, точечные правки, утилиты. Слабые: большие системы, тонна тестов.`}
        </Notes>
      </Slide>

      {/* 9. P3 */}
      <Slide backgroundColor="#0B1221">
        <FlexBox height="100%" alignItems="center" justifyContent="center" flexDirection="column" gap={20}>
          <Heading color="#FFFFFF">P3. Гибрид: план → агент → тесты</Heading>
          <MermaidDiagram
            chart={`
              flowchart LR
                G[Gemini 2.5 Pro] -- План / диффы --> A[Claude Code]
                A -- Изменения --> R[Репозиторий]
                R --> T{"Тесты / Снэпшоты"}
                T -- ok --> Ship[Ship]
                T -- fail --> A
                style T fill:#E8F2FF,stroke:#2563EB,stroke-width:2px
              `}
          />
        </FlexBox>
        <Notes>{`Проговорить короткий цикл. Не уходить в детали здесь — они на следующем слайде.`}</Notes>
      </Slide>

      {/* 9.1 ГИБРИДНЫЙ ЦИКЛ — ПОДРОБНО */}
      <Slide>
        <SectionTitle label="Гибридный цикл — подробно" caption="5 шагов без закапывания"/>
        <FlexBox gap={16} margin="24px 0">
          <Placeholder
            title="0) Подготовка"
            bullets={[
              "Цель, список файлов, логи/ошибки",
              "files-to-prompt/RepoMix для больших кусков",
            ]}
          />
          <Placeholder
            title="1) План (Gemini 2.5 Pro)"
            bullets={[
              "5–8 шагов с ожидаемым результатом",
              "Дай замены для шагов 1–2",
            ]}
          />
          <Placeholder
            title="2) Применение (Claude Code)"
            bullets={[
              "PLAN.md, шаг-за-шагом",
              "Сборка/тесты — обязательно",
            ]}
          />
        </FlexBox>
        <FlexBox gap={16} margin="16px 0">
          <Placeholder
            title="3) Тест/снэпшоты"
            bullets={["Smoke или snapshot (вход→выход)", "Фиксируем регрессии"]}
          />
          <Placeholder
            title="4) Если «поплыло»"
            bullets={[
              "/compact у агента",
              "Логи/дифф → в Gemini за корректировками",
              "Дробим шаг и продолжаем",
            ]}
          />
        </FlexBox>
        <MermaidDiagram
          chart={`
flowchart TB
  P0["0) Подготовка: цель, файлы, логи"] --> P1["1) План в Gemini 2.5 Pro (5–8 шагов)"]
  P1 --> P2["2) Выполнение в Claude Code (PLAN.md)"]
  P2 --> P3["3) Тест/снэпшоты"]
  P3 --> OK{"Падает?"}
  OK -- "нет" --> Done([Ship])
  OK -- "да" --> Fix["/compact → корректировки в Gemini → дробим шаг"] --> P2
`}
        />
        <Notes>{`Это и есть управляемый вайб: минимум ручного, максимум контроля.`}</Notes>
      </Slide>

      {/* 10. ИНСТРУМЕНТЫ ПО ЗАПРОСУ — ВЕБХУКИ */}
      <Slide>
        <SectionTitle label="Инструменты по запросу" caption="ROI 5–20 минут"/>
        <Placeholder
          title="Скрин-мок: Webhook Explorer GUI (Python)"
          subtitle="Фильтры, группировки, экспорт"
          bullets={[
            "≈120 000 событий / 3 дня",
            "1-я версия 5–10 мин, до пользы ≤20 мин",
            "~1500 строк Python",
          ]}
        />
        <Notes>
          {`Идеальный кейс для вайбкодинга: самодостаточно, без внешних интеграций.`}
        </Notes>
      </Slide>

      {/* 10.1 КАРТА ИНСТРУМЕНТОВ */}
      <Slide>
        <SectionTitle label="Карта инструментов" caption="кто за что отвечает"/>
        <MermaidDiagram
          chart={`
flowchart LR
  subgraph Plan["Планировщик"]
    G["Gemini 2.5 Pro<br/>(AI Studio)"]
  end
  subgraph Exec["Исполнитель"]
    C[Claude Code]
  end
  subgraph Assist["Рефакторинг/прочее"]
    H[ChatGPT / GPT-4]
  end
  subgraph Feed["Кормушки контента"]
    F1[files-to-prompt]
    F2[RepoMix]
    F3[Shotgun Code]
  end

  F1 --> G
  F2 --> G
  F3 --> G

  G -- план/диффы/замены --> C
  H -. рефакторинг/тексты .-> C

  C -- изменения --> R[(Repo)]
  R --> T{"Тесты/снэпшоты"}
  T -- ok --> Ship[Ship]
  T -- fail --> C

  classDef key fill:#E8F2FF,stroke:#2563EB,stroke-width:2px,color:#0B1221;
  class G,C,T key
`}
        />
        <Notes>{`Подчеркнуть AI Studio как удобную точку входа для Gemini 2.5 Pro.`}</Notes>
      </Slide>

      {/* 10.2 ЯЗЫКИ — ГДЕ LLM ПИШЕТ ЛУЧШЕ */}
      <Slide>
        <SectionTitle label="Где LLM пишет лучше?" caption="ощущение от прод-работы"/>
        <FlexBox gap={16} margin="24px 0">
          <Placeholder
            title="Python"
            subtitle="#1 по стабильности генерации"
            bullets={["Меньше бойлерплейта", "Больше обучающих данных", "Быстрое окружение"]}
          />
          <Placeholder
            title="TypeScript"
            subtitle="#2 в прод-практике"
            bullets={["Хорошие инструменты", "Чёткие типы", "Чуть больше трения"]}
          />
          <Placeholder
            title="Kotlin / Rust"
            subtitle="Тяжелее для агентов"
            bullets={["Сложнее сборка/тулы", "Чувствительны к контексту", "Требуют больше ручного контроля"]}
          />
        </FlexBox>
        <Notes>{`Личный порядок предпочтений для вайб-итераций; не догма.`}</Notes>
      </Slide>

      {/* 11. МАНИФЕСТ */}
      <Slide backgroundColor="#0B1221">
        <FlexBox height="100%" alignItems="center" justifyContent="center" flexDirection="column" gap={24}>
          <Heading color="#FFFFFF">Манифест вайбкодинга</Heading>
          <FlexBox gap={16} alignItems="stretch" justifyContent="center" flexWrap="wrap">
            <Placeholder title="Иконка «щит»" subtitle="Делай быстро только то, что безопасно"/>
            <Placeholder title="Схема периметра" subtitle="Любой внешний периметр — под забор"/>
            <Placeholder title="Пайплайн" subtitle="Гибрид там, где растёт код"/>
            <Placeholder title="Мем trolley problem" subtitle="Не корми sunk cost"/>
          </FlexBox>
        </FlexBox>
        <Notes>{`Предложить сфоткать. 4 правила вслух.`}</Notes>
      </Slide>

      {/* 12. NOW WHAT */}
      <Slide>
        <SectionTitle label="Что делать завтра?" caption="конкретный старт"/>
        <FlexBox gap={24} margin="24px 0">
          <Placeholder
            title="Чек-лист (3 пункта)"
            bullets={["Выбери одну рутину", "Сделай утилиту за вечер", "Публичный сервис → только гибрид"]}
          />
          <QRBlock value={MATERIALS_URL} label="QR на репозиторий/материалы"/>
        </FlexBox>
        <Notes>
          {`Закрытие: «Я говорю “Gemini” — имею в виду 2.5 Pro. Эти слайды тоже вайбкодились». Не говорить «времени мало».`}
        </Notes>
      </Slide>

      {/* 13. Q&A */}
      <Slide>
        <SectionTitle label="Q&A" caption="быстрые ответы в формате PREP"/>
        <FlexBox gap={16}>
          <Placeholder
            title="Шпаргалка PREP"
            bullets={["Point → Reason → Example → Point", "Коротко и по сути"]}
          />
          <Placeholder
            title="Карточка: когда точно гибрид?"
            bullets={["Растёт код/есть внешний периметр", "3× фейл агента подряд", "Нужна воспроизводимость (тесты)"]}
          />
          <Placeholder
            title="Карточка: почему Python ощущается лучше?"
            bullets={["Меньше бойлерплейта", "Быстрое окружение", "Стабильнее генерация"]}
          />
        </FlexBox>
        <Notes>{`Держать темп, отвечать по PREP. Напомнить про стоп-правила.`}</Notes>
      </Slide>

      {/* 14. РЕЗЕРВНЫЕ / БЭКАП */}
      <Slide>
        <SectionTitle label="Бэкап-слайды" caption="на случай времени/вопросов"/>
        <FlexBox gap={16}>
          <MermaidDiagram
            chart={`
flowchart TB
  Q{"Есть внешний доступ?"}
  Q -- да --> Hybrid[Гибрид: план→агент→тесты]
  Q -- нет --> Size{"Размер задачи?"}
  Size -- "1–3 файла" --> Agent[Только агент]
  Size -- "несколько модулей" --> Plan[План в Gemini → агент]
  Size -- "большая" --> Split[Дробим на подзадачи] --> Plan
  Plan --> Stop{"3× фейл подряд?"}
  Agent --> Stop
  Stop -- да --> Switch["/compact, дробление, смена инструмента"]
  Stop -- нет --> Go([Вперёд])
  Hybrid --> Sec["Заборы/логирование/ревью"]
`}
          />
          <Placeholder
            title="Гайд по единообразию терминов"
            bullets={["Всюду: «Gemini» = 2.5 Pro", "Единые названия инструментов", "AI Studio как вход для планов"]}
          />
          <Placeholder
            title="Сетка «до/после»"
            bullets={["Ручной Bash vs LLM", "Сырые отчёты vs читаемые", "Навигация по legacy агентом"]}
          />
        </FlexBox>
        <Notes>{`Резерв на перерасход/недобор времени. Оставаться в русле темы.`}</Notes>
      </Slide>
    </Deck>
  );
}
