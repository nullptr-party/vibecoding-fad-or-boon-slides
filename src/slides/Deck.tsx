import * as React from "react";
import {Box, Deck, FlexBox, Heading, Image, ListItem, Notes, Slide, Text, UnorderedList} from "spectacle";
import mermaid from "mermaid";
import {QRCodeSVG} from 'qrcode.react';

// ==================================================================
// ДИЗАЙН И КОМПОНЕНТЫ
// ==================================================================

const theme = {
  colors: {
    bg: "#F8F9FA",
    text: "#212529",
    heading: "#15191E",
    accent: "#4C6EF5",
    muted: "#868E96",
    border: "#DEE2E6",
    cardBg: "#FFFFFF",
    danger: "#E03131",
  },
  fonts: {
    header: "'Manrope', sans-serif",
    text: "'Inter', sans-serif",
  },
  fontSizes: {
    h1: "72px",
    h2: "56px",
    h3: "48px",
    h4: "36px",
    text: "28px",
    small: "20px",
  },
};

const Card: React.FC<{ children: React.ReactNode; flex?: number }> = ({children, flex}) => (
  <Box
    backgroundColor="cardBg"
    border="1px solid"
    borderColor="border"
    borderRadius={16}
    padding={24}
    boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
    flex={flex}
    height="100%"
  >
    {children}
  </Box>
);

const VisualCard: React.FC<{ children: React.ReactNode; flex?: number }> = ({children, flex}) => (
  <Card flex={flex}>
    <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center" gap={16}>
      {children}
    </FlexBox>
  </Card>
);

let __mmdInit = false;
const MermaidDiagram: React.FC<{ chart: string; }> = ({chart}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!__mmdInit) {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "base",
        themeVariables: {
          background: theme.colors.cardBg,
          primaryColor: '#F1F3F5',
          primaryTextColor: theme.colors.text,
          primaryBorderColor: theme.colors.border,
          lineColor: theme.colors.heading,
          textColor: theme.colors.text,
          fontSize: '18px',
        },
        flowchart: {curve: "basis"},
      });
      __mmdInit = true;
    }
    const id = "mmd-" + Math.random().toString(36).slice(2);
    mermaid.render(id, chart).then(({svg}) => {
      if (ref.current) ref.current.innerHTML = svg;
    });
  }, [chart]);

  return <div ref={ref} style={{display: 'flex', justifyContent: 'center', width: '100%'}}/>;
};

const SectionTitle: React.FC<{ label: string; caption?: string }> = ({label, caption}) => (
  <Box textAlign="left">
    <Heading color="heading" fontSize="h2" margin="0 0 8px 0">{label}</Heading>
    {caption && (
      <Text color="muted" fontSize="text" margin="0">{caption}</Text>
    )}
  </Box>
);

const MATERIALS_URL = "https://github.com/your-repo/vibe-coding-talk"; // TODO: замени на реальную ссылку

const QRBlock: React.FC<{ value: string; label?: string }> = ({value, label = "Материалы доклада"}) => (
  <Card>
    <FlexBox flexDirection="column" alignItems="center" gap={16}>
      <QRCodeSVG value={value} size={160} bgColor={theme.colors.cardBg} fgColor={theme.colors.heading}/>
      <Text fontSize="small" color="muted" textAlign="center" margin={0}>{label}</Text>
    </FlexBox>
  </Card>
);

const FitImage: React.FC<{ src: string; alt?: string; maxHeight?: string }> = ({
                                                                                 src,
                                                                                 alt = "",
                                                                                 maxHeight = "600px",
                                                                               }) => (
  <Image
    src={src}
    alt={alt}
    width="100%"
    height="auto"
    style={{
      maxWidth: '100%',
      maxHeight: maxHeight,
      objectFit: 'contain',
    }}
  />
);

const FooterTemplate = ({slideNumber, numberOfSlides}: { slideNumber: number; numberOfSlides: number }) => (
  <Box
    position="absolute"
    bottom={0}
    right={0}
    padding="16px 24px"
  >
    <Text fontSize="small" color="muted">{slideNumber}</Text>
  </Box>
);

// ==================================================================
// ФИНАЛЬНАЯ СТРУКТУРА ПРЕЗЕНТАЦИИ
// ==================================================================

export default function DeckComponent() {
  return (
    <Deck
      theme={theme as any}
      template={({slideNumber, numberOfSlides}) => (
        <FooterTemplate slideNumber={slideNumber}
                        numberOfSlides={numberOfSlides}/>
      )}>
      {/* 0. ТИТУЛ */}
      <Slide backgroundColor="bg">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center" gap={48}>
          <Box textAlign="center">
            <Heading color="heading" fontSize="h1">Вайбкодинг: блажь или благо?</Heading>
            <Text color="muted" fontSize="h4">Как ускоряться с ИИ, но не терять контроль</Text>
          </Box>
          <FlexBox gap={32} alignItems="center">
            <Box textAlign="right">
              <Heading fontSize="h3" margin={0}>Илья</Heading>
              <Text fontSize="text" color="muted" margin={0}>inDrive</Text>
              <Text fontSize="text" color="muted" margin={0}>Release Engineer</Text>
              <Text fontSize="text" color="muted" margin={0}>Developer Productivity</Text>
            </Box>
            <QRBlock value={MATERIALS_URL} label="Материалы и слайды"/>
          </FlexBox>
        </FlexBox>
        <Notes>
          «Всем привет! Я Илья... я — **условно** вайбкодер. С сентября почти не пишу код руками... Сегодня расскажу,
          почему "условно", где это работает, где ломается...»
        </Notes>
      </Slide>

      {/* 1. ЧТО ТАКОЕ ВАЙБ-КОДИНГ? (ИСТОЧНИК) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Что такое вайб-кодинг?"/>
        <FitImage src={require("../img/tweet-1886192184808149383.png")}/>
        <Notes>
          «Термин популяризировал Андрей Карпатый... В его описании это выглядит как магия...»
        </Notes>
      </Slide>

      {/* 1.1. ПРОЦЕСС ВАЙБ-КОДИНГА (СХЕМА КАРПАТОГО) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Как это выглядит в теории" caption="Цикл «Сказал → Сделано → Упало → Почини»"/>
        <Card>
          <MermaidDiagram chart={`
            flowchart LR
              A["👤 **Человек**<br/>(Формулирует намерение)"] --> B["🤖 **Агент/LLM**"];
              B -- "Генерирует/меняет код" --> C["💻 **Код в проекте**"];
              C -- "Возникает ошибка компиляции / баг" --> A;
              A -- "Говорит «Почини это»<br/>(не трогая код)" --> B;

              style A fill:#E9ECEF,stroke:#495057
              style B fill:#E7F5FF,stroke:#339AF0
          `}/>
        </Card>
        <Notes>
          «И вот как этот процесс выглядит в теории, по Карпатому. Это замкнутый цикл: я даю команду, агент её
          выполняет. Если что-то ломается, я не лезу в код, а просто говорю: «Почини». И так по кругу. Это и есть
          "чистый" вайб-кодинг...»
        </Notes>
      </Slide>

      {/* 2. КЕЙС #1: АНТИСПАМ - УСПЕХ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Кейс #1: Антиспам в Telegram" caption="История успеха... на первый взгляд"/>
        <FlexBox gap={32} alignItems="center">
          <Card flex={1}>
            <Heading fontSize="h3" color="accent" margin={0}>~10 000</Heading>
            <Text fontSize="text" color="text" margin="8px 0 0 0">спамеров забанено</Text>
            <Heading fontSize="h3" color="accent" margin="24px 0 0 0">20 минут</Heading>
            <Text fontSize="text" color="text" margin="8px 0 0 0">до рабочего MVP</Text>
          </Card>
          <Box flex={2}>
            <MermaidDiagram chart={`
              flowchart TD
                A["📥 Новое сообщение"] --> B{"🤖 LLM-классификатор"};
                B -- "Это спам" --> C["🚫 Бан"];
                B -- "Не спам" --> D["✅ OK"];
            `}/>
          </Box>
        </FlexBox>
        <Notes>
          «Сентябрь, спам-боты... Решил сгенерить бота. Концепция элементарная... Результат? 10 000 банов... Звучит как
          идеальная success story... Но была одна проблема. **Я**.»
        </Notes>
      </Slide>

      {/* 3. КЕЙС #1: ПРОВАЛ (РАЗВИЛКА) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="...и где я свернул не туда" caption="Простой путь vs. Кроличья нора перфекционизма"/>
        <MermaidDiagram chart={`
          graph LR
            A["Локально всё работает"] --> B{Время деплоить};
            B --> C["✅ **Простой путь**<br/>Скопировать файл сессии<br/>(1 минута)"];
            B --> D["❌ **Сложный путь**<br/>Сделать красивый веб-логин<br/>(часы страданий)"];
            D --> E["Переписать на TypeScript"];
            E --> F["Переписать на Rust..."];
            
            style C fill:#E3FAFC,stroke:#2FBFA5
            style D fill:#FFF0F6,stroke:#E03131
        `}/>
        <Notes>
          «Когда пришло время деплоя, был простой путь... Но мой перфекционизм кричал: "Нет! Нужен красивый
          веб-интерфейс!". Я полез в кроличью нору...»
        </Notes>
      </Slide>

      <Slide backgroundColor="bg">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center" gap={32}>
          <Heading fontSize="h3" color="heading" textAlign="center">Ошибка невозвратных затрат</Heading>
          <FitImage
            src={require("../img/11933170183.png")}
            maxHeight={"80%"}
          />
          <Text fontSize="text" color="muted" textAlign="center">Классическая ловушка перфекциониста-программиста</Text>
        </FlexBox>
        <Notes>
          «Вторая ошибка - ошибка невозвратных затрат. Как на этой классической картинке с вагонеткой...»
        </Notes>
      </Slide>

      <Slide backgroundColor="bg">
        <SectionTitle label="Три ошибки, которые я совершил" caption="И как их избежать"/>
        <FlexBox gap={24} alignItems="stretch">
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>1. Перфекционизм</Heading>
            <Text fontSize="text" color="text">Вместо рабочего MVP полез "делать красиво" и усложнять.</Text>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>2. Невозвратные затраты</Heading>
            <Text fontSize="text" color="text">Продолжал вкладываться в неработающее решение только потому, что уже
              потратил время.</Text>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>3. Эскалация сложности</Heading>
            <Text fontSize="text" color="text">С ростом кодовой базы вайбкодинг ломается</Text>
          </Card>
        </FlexBox>
        <Notes>
          «Этот кейс научил меня трём вещам...»
        </Notes>
      </Slide>

      {/* 5. КЕЙС #2: ПРИЛОЖЕНИЕ ПО ЗАПРОСУ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Кейс #2: Приложение по запросу" caption="Идеальный сценарий для вайб-кодинга"/>
        <FlexBox gap={32} alignItems="center">
          <Card flex={1}>
            <Heading fontSize="h3" color="accent" margin={0}>120 000</Heading>
            <Text fontSize="text" color="text" margin="8px 0 24px 0">JSON-файлов для тестов</Text>
            <Heading fontSize="h3" color="accent" margin={0}>20 минут</Heading>
            <Text fontSize="text" color="text" margin="8px 0 24px 0">на GUI-утилиту на Python</Text>
            <Text fontSize="small" color="muted" margin={0}>~1500 строк кода, которые я бы никогда не написал
              руками</Text>
          </Card>
          <Card flex={2}>
            <Heading fontSize="h4" color="heading" marginTop={0}>Задача</Heading>
            <Text fontSize="text" color="text">Нужен инструмент для группировки и экспорта тестовых данных из 120 000
              файлов.</Text>
            <Box border="1px solid" borderColor="border" borderRadius={8} padding={16} marginTop={24}
                 backgroundColor="#F8F9FA">
              <Text fontFamily="monospace" color="muted" margin={0}>"Gemini, сгенерируй GUI-утилиту, которая..."</Text>
            </Box>
          </Card>
        </FlexBox>
        <Notes>
          «Сервис на Go, нет тестов... Решение — снэпшот-тесты... Но главная проблема была в данных... 120 000 файлов...
          И вот тут случилась магия... Это и есть **"приложение по запросу"**.»
        </Notes>
      </Slide>

      {/* 6. ЕЖЕДНЕВНЫЕ ПОБЕДЫ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Ежедневные победы" caption="Где вайб-кодинг экономит время постоянно"/>
        <FlexBox gap={24} alignItems="stretch" flexWrap="wrap">
          <Card flex={1}><Text fontSize="text" textAlign="center">Генерация **Bash/YAML** для CI/CD</Text></Card>
          <Card flex={1}><Text fontSize="text" textAlign="center">Красивые **отчёты в PR**</Text></Card>
          <Card flex={1}><Text fontSize="text" textAlign="center">**Навигация по legacy** коду</Text></Card>
          <Card flex={1}><Text fontSize="text" textAlign="center">Эта **презентация** (частично)</Text></Card>
        </FlexBox>
        <Notes>
          «И такие маленькие победы случаются каждый день...»
        </Notes>
      </Slide>

      {/* 7. КАРТА ИНСТРУМЕНТОВ (РАСКРЫТИЕ ТАЙНЫ) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Мой инструментарий" caption="Как выглядит мой «условный» вайб-кодинг"/>
        <MermaidDiagram chart={`
          graph LR
            subgraph "Планировщик (большой контекст)"
              A["**Gemini 2.5 Pro**<br/>(через AI Studio)"]
            end
            subgraph "Исполнитель (go-to агент)"
              B["**Claude Code**"]
            end
            subgraph "Помощник (быстрые задачи)"
              C["**ChatGPT/GPT-4**"]
            end
            
            D{Масштаб задачи} --> |"Мелкая"| B
            D --> |"Средняя"| A
            A -- План --> B
            D --> |"Крупная"| E["Дробим на подзадачи"] --> A
            
            classDef plan fill:#E9ECEF,stroke:#495057;
            classDef exec fill:#E7F5FF,stroke:#339AF0;
            classDef assist fill:#FFF9DB,stroke:#FAB005;

            class A plan;
            class B exec;
            class C assist;
        `}/>
        <Notes>
          «Мой флоу может показаться хаотичным, но в нём есть система... Для планирования - Gemini. В роли исполнителя -
          Claude Code. Для быстрых задач - ChatGPT. Выбор зависит от масштаба...»
        </Notes>
      </Slide>

      {/* 7.1. ГИБРИДНЫЙ ЦИКЛ (КАК ЭТО РАБОТАЕТ) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Как это работает на практике" caption="5 шагов управляемого вайб-кодинга"/>
        <Card>
          <MermaidDiagram chart={`
            graph LR
              subgraph "Шаг 1: Планирование"
                A["**0) Подготовка:** Цель, файлы, логи<br/>**1) План** в Gemini 2.5 Pro"]
              end
              subgraph "Шаг 2: Исполнение"
                B["**2) Исполнение** в Claude Code"]
              end
              subgraph "Шаг 3: Контроль"
                C{"**3) Тесты** / Снэпшоты"}
              end
              
              A -- План из 5-8 шагов --> B;
              B -- Изменения в коде --> C;
              C -- OK --> D[✅ Ship];
              C -- Fail --> E["**4) Корректировка**<br/>/compact, дробим шаг, уточняем план"];
              E --> B;
              
              classDef plan fill:#E9ECEF,stroke:#495057;
              classDef exec fill:#E7F5FF,stroke:#339AF0;
              classDef control fill:#E3FAFC,stroke:#2FBFA5;

              class A plan;
              class B exec;
              class C,E control;
          `}/>
        </Card>
        <Notes>
          «А вот как я комбинирую эти инструменты. **Шаг 0, Подготовка:** собираю контекст. **Шаг 1, План:** иду в
          Gemini Pro и прошу составить детальный план...»
        </Notes>
      </Slide>

      {/* 8. НЮАНСЫ: ЯЗЫКИ И БЕЗОПАСНОСТЬ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Важные нюансы" caption="Языки и Безопасность"/>
        <FlexBox gap={32} alignItems="stretch">
          <Card flex={1}>
            <Heading fontSize="h4" marginTop={0}>Где LLM пишет лучше?</Heading>
            <Text fontSize="text"><b>#1 Python:</b> стабильнее всего</Text>
            <Text fontSize="text"><b>#2 TypeScript:</b> хорошо, но чуть больше трения</Text>
            <Text fontSize="text" color="muted"><b>#3 Kotlin/Rust:</b> заметно тяжелее</Text>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h4" marginTop={0} color="danger">Кейс "Tea": без контроля</Heading>
            <UnorderedList fontSize="text">
              <ListItem>Требовали фото с ID "для верификации"</ListItem>
              <ListItem>Хранили геолокацию</ListItem>
              <ListItem>Результат: компрометация данных</ListItem>
            </UnorderedList>
          </Card>
        </FlexBox>
        <Notes>
          «Кстати, есть ощущение, что ИИ пишет код на разных языках с разным качеством... И последнее, но самое важное.
          С большой силой приходит большая ответственность...»
        </Notes>
      </Slide>

      {/* 9. МАНИФЕСТ */}
      <Slide backgroundColor="heading">
        <FlexBox height="100%" alignItems="center" justifyContent="center" flexDirection="column" gap={48}>
          <Heading color="cardBg">Манифест управляемого вайбкодинга</Heading>
          <FlexBox gap={24} alignItems="stretch" justifyContent="center">
            <Card><Text fontSize="text" textAlign="center">Сужай периметр</Text></Card>
            <Card><Text fontSize="text" textAlign="center">Ставь "заборы"</Text></Card>
            <Card><Text fontSize="text" textAlign="center">Используй гибрид</Text></Card>
            <Card><Text fontSize="text" textAlign="center">Не корми Sunk Cost</Text></Card>
          </FlexBox>
        </FlexBox>
        <Notes>
          «Так что же такое вайб-кодинг: блажь или благо? Это блажь, если... И это благо, если...»
        </Notes>
      </Slide>

      {/* 10. Q&A */}
      <Slide backgroundColor="bg">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center" gap={48}>
          <Heading color="heading" fontSize="h1">Спасибо!</Heading>
          <SectionTitle label="Q&A" caption="Готов к вашим вопросам"/>
        </FlexBox>
        <Notes>
          «Спасибо! Готов к вашим вопросам.»
        </Notes>
      </Slide>
    </Deck>
  );
}
