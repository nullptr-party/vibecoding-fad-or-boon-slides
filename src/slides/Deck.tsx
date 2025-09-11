import * as React from "react";
import {
  Deck,
  Slide,
  FlexBox,
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Notes,
} from "spectacle";
import mermaid from "mermaid";
import { QRCodeSVG } from 'qrcode.react';

// ==================================================================
// НОВЫЙ ДИЗАЙН И КОМПОНЕНТЫ
// ==================================================================

const theme = {
  colors: {
    bg: "#F8F9FA", // Почти белый фон
    text: "#212529", // Основной текст
    heading: "#15191E", // Заголовки
    accent: "#4C6EF5", // Яркий синий акцент
    muted: "#868E96", // Приглушенный текст
    border: "#DEE2E6", // Границы
    cardBg: "#FFFFFF", // Фон карточек
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
  }
};

const Card: React.FC<{ children: React.ReactNode; flex?: number }> = ({ children, flex }) => (
  <Box
    backgroundColor="cardBg"
    border="1px solid"
    borderColor="border"
    borderRadius={16}
    padding={24}
    boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
    flex={flex}
  >
    {children}
  </Box>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text
    as="span"
    backgroundColor="#DEE2E6"
    color="#212529"
    borderRadius="999px"
    padding="6px 14px"
    fontSize="small"
    fontWeight="600"
  >
    {children}
  </Text>
);

let __mmdInit = false;
const MermaidDiagram: React.FC<{ chart: string; }> = ({ chart }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!__mmdInit) {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "base",
        themeVariables: {
          background: theme.colors.cardBg,
          primaryColor: "#F1F3F5",
          primaryTextColor: theme.colors.text,
          primaryBorderColor: theme.colors.border,
          lineColor: theme.colors.heading,
          textColor: theme.colors.text,
          fontSize: "18px",
          nodeBorderRadius: 8,
        },
        flowchart: { curve: "basis", useMaxWidth: true },
      });
      __mmdInit = true;
    }
    const id = "mmd-" + Math.random().toString(36).slice(2);
    mermaid.render(id, chart).then(({ svg }) => {
      if (ref.current) ref.current.innerHTML = svg;
    });
  }, [chart]);

  return (
    <div ref={ref} style={{ display: "flex", justifyContent: "center" }} />
  );
};

const SectionTitle: React.FC<{ label: string; caption?: string }> = ({
  label,
  caption,
}) => (
  <Box textAlign="center" marginBottom={48}>
    <Heading color="heading" fontSize="h2" margin="0 0 12px 0">
      {label}
    </Heading>
    {caption && (
      <Text color="muted" fontSize="text" margin={0}>
        {caption}
      </Text>
    )}
  </Box>
);

const MATERIALS_URL =
  "https://github.com/your-repo/vibe-coding-talk"; // TODO: замени на реальную ссылку

const QRBlock: React.FC<{ value: string; label?: string }> = ({
  value,
  label = "Материалы доклада",
}) => (
  <Card>
    <FlexBox flexDirection="column" alignItems="center" gap={16}>
      <QRCodeSVG
        value={value}
        size={160}
        bgColor={theme.colors.cardBg}
        fgColor={theme.colors.heading}
      />
      <Text fontSize="small" color="muted" textAlign="center" margin={0}>
        {label}
      </Text>
    </FlexBox>
  </Card>
);

const FooterTemplate = () => (
  <Box
    display="flex"
    justifyContent="space-between"
    width="100%"
    padding="16px 24px"
  >
    <Text fontSize="small" color="muted">
      Вайбкодинг: блажь или благо?
    </Text>
    <Text fontSize="small" color="muted">
      Илья / inDrive DevProd
    </Text>
  </Box>
);

// ==================================================================
// ОСНОВНАЯ ПРЕЗЕНТАЦИЯ
// ==================================================================

export default function DeckComponent() {
  return (
    <Deck theme={theme as any} template={<FooterTemplate />}>
      {/* 0. ТИТУЛ */}
      <Slide backgroundColor="bg">
        <FlexBox
          height="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={48}
        >
          <Box textAlign="center">
            <Heading color="heading" fontSize="h1">
              Вайбкодинг: блажь или благо?
            </Heading>
            <Text color="muted" fontSize="h4">
              Как ускоряться с ИИ, но не терять контроль
            </Text>
          </Box>
          <QRBlock value={MATERIALS_URL} label="Материалы и слайды" />
        </FlexBox>
      </Slide>

      {/* 1. О СЕБЕ */}
      <Slide backgroundColor="bg">
        <SectionTitle
          label="Кто я и почему «условно» вайбкодер?"
          caption="inDrive • Release / Dev Productivity"
        />
        <FlexBox gap={48} alignItems="stretch">
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>
              Чем занимаюсь
            </Heading>
            <UnorderedList fontSize="text" color="heading" lineHeight="1.5">
              <ListItem>Release Engineering, CI/CD</ListItem>
              <ListItem>Автоматизация рутины</ListItem>
              <ListItem>Навигация по legacy коду</ListItem>
            </UnorderedList>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>
              Мой гибридный стек
            </Heading>
            <FlexBox flexDirection="column" gap={16}>
              <Text fontSize="text" margin={0} color="heading">
                <b style={{ color: theme.colors.accent }}>Планирование:</b>{" "}
                <Pill>Gemini 2.5 Pro</Pill>
              </Text>
              <Text fontSize="text" margin={0} color="heading">
                <b style={{ color: theme.colors.accent }}>Исполнение:</b>{" "}
                <Pill>Claude Code</Pill>
              </Text>
              <Text fontSize="text" margin={0} color="heading">
                <b style={{ color: theme.colors.accent }}>Рефакторинг:</b>{" "}
                <Pill>ChatGPT/GPT-4</Pill>
              </Text>
            </FlexBox>
          </Card>        </FlexBox>
      </Slide>

      {/* 2. КЕЙС #1: АНТИСПАМ БОТ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Кейс #1: Антиспам в Telegram" caption="Успех, который чуть не стал провалом" />
        <FlexBox gap={32} alignItems="center">
          <Card flex={1}>
            <Heading fontSize="h3" color="accent" margin={0}>~10 000</Heading>
            <Text fontSize="text" color="text" margin="8px 0 0 0">спамеров забанено</Text>
            <Heading fontSize="h3" color="accent" margin="24px 0 0 0">5-6</Heading>
            <Text fontSize="text" color="text" margin="8px 0 0 0">ложных срабатываний</Text>
            <Heading fontSize="h3" color="accent" margin="24px 0 0 0">20 мин</Heading>
            <Text fontSize="text" color="text" margin="8px 0 0 0">до рабочего MVP</Text>
          </Card>
          <Box flex={2}>
            <MermaidDiagram chart={`
              flowchart TD
                A["📥 Новое сообщение"] --> B{"🤖 LLM-классификатор"};
                B -- "Это спам" --> C["🚫 Бан"];
                B -- "Не спам" --> D["✅ OK"];
            `} />
          </Box>
        </FlexBox>
      </Slide>

      {/* 3. ТРИ ОШИБКИ ИЗ КЕЙСА #1 */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Три ошибки, которые я совершил" caption="И как их избежать" />
        <FlexBox gap={24} alignItems="stretch">
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>1. Перфекционизм</Heading>
            <Text fontSize="text" color="text">Вместо рабочего MVP полез "делать красиво" и усложнять.</Text>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>2. Sunk Cost</Heading>
            <Text fontSize="text" color="text">"Ещё чуть-чуть, и взлетит" — ловушка невозвратных затрат.</Text>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>3. Эскалация сложности</Heading>
            <Text fontSize="text" color="text">С ростом кода чистый вайб ломается. Нужен инженерный подход.</Text>
          </Card>
        </FlexBox>
      </Slide>

      {/* 4. КЕЙС #2: ПРИЛОЖЕНИЕ ПО ЗАПРОСУ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Кейс #2: Приложение по запросу" caption="Идеальный сценарий для вайб-кодинга" />
        <FlexBox gap={32} alignItems="center">
          <Card flex={1}>
            <Heading fontSize="h3" color="accent" margin={0}>120 000</Heading>
            <Text fontSize="text" color="text" margin="8px 0 24px 0">JSON-файлов для тестов</Text>
            <Heading fontSize="h3" color="accent" margin={0}>20 минут</Heading>
            <Text fontSize="text" color="text" margin="8px 0 24px 0">на GUI-утилиту на Python</Text>
            <Text fontSize="small" color="muted" margin={0}>~1500 строк кода, которые я бы никогда не написал руками</Text>
          </Card>
          <Card flex={2}>
            <Heading fontSize="h4" color="heading" marginTop={0}>Результат</Heading>
            <Text fontSize="text" color="text">Инструмент для группировки и экспорта тестовых данных, сгенерированный под конкретную задачу.</Text>
            <Box border="1px solid" borderColor="border" borderRadius={8} padding={16} marginTop={24} backgroundColor="#F8F9FA">
              <Text fontFamily="monospace" color="muted">python webhook_explorer.py --dir ./events</Text>
            </Box>
          </Card>
        </FlexBox>
      </Slide>

      {/* 5. ЕЖЕДНЕВНЫЕ ПОБЕДЫ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Ежедневные победы" caption="Где вайб-кодинг экономит время постоянно" />
        <FlexBox gap={24} alignItems="stretch" flexWrap="wrap">
          <Card flex={1}><Text fontSize="text">Генерация **Bash/YAML** для CI/CD</Text></Card>
          <Card flex={1}><Text fontSize="text">Красивые **отчёты в PR**</Text></Card>
          <Card flex={1}><Text fontSize="text">**Навигация по legacy** коду</Text></Card>
          <Card flex={1}><Text fontSize="text">Эта **презентация** (частично)</Text></Card>
        </FlexBox>
      </Slide>

      {/* 6. ГИБРИДНЫЙ ЦИКЛ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Мой гибридный цикл" caption="Как я управляю процессом" />
        <MermaidDiagram chart={`
          graph TD
            subgraph "Шаг 1: Планирование"
              A["**План** в Gemini 2.5 Pro"]
            end
            subgraph "Шаг 2: Исполнение"
              B["**Исполнение** в Claude Code"]
            end
            subgraph "Шаг 3: Контроль"
              C{"**Тесты** / Снэпшоты"}
            end
            
            A -- План из 5-8 шагов --> B;
            B -- Изменения в коде --> C;
            C -- OK --> D[✅ Ship];
            C -- Fail --> E["**Корректировка**<br/>/compact, дробим шаг"];
            E --> B;
            
            classDef plan fill:#E9ECEF,stroke:#495057;
            classDef exec fill:#E7F5FF,stroke:#339AF0;
            classDef control fill:#E3FAF_C,stroke:#2_F_B_E_A_5;

            class A plan;
            class B exec;
            class C,E control;
        `} />
      </Slide>

      {/* 7. ЯЗЫКИ И БЕЗОПАСНОСТЬ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Языки и Безопасность" caption="Важные нюансы" />
        <FlexBox gap={32} alignItems="stretch">
          <Card flex={1}>
            <Heading fontSize="h4" marginTop={0}>Где LLM пишет лучше?</Heading>
            <Text fontSize="text"><b>#1 Python:</b> стабильнее всего</Text>
            <Text fontSize="text"><b>#2 TypeScript:</b> хорошо, но чуть больше трения</Text>
            <Text fontSize="text"><b>#3 Kotlin/Rust:</b> заметно тяжелее для агентов</Text>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h4" marginTop={0}>Кейс "Tea": без контроля</Heading>
            <UnorderedList fontSize="text">
              <ListItem>Требовали фото с ID "для верификации"</ListItem>
              <ListItem>Хранили геолокацию</ListItem>
              <ListItem>Результат: компрометация данных</ListItem>
            </UnorderedList>
          </Card>
        </FlexBox>
      </Slide>

      {/* 8. МАНИФЕСТ */}
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
      </Slide>

      {/* 9. Q&A */}
      <Slide backgroundColor="bg">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center" gap={48}>
          <Heading color="heading" fontSize="h1">Спасибо!</Heading>
          <SectionTitle label="Q&A" caption="Готов к вашим вопросам" />
        </FlexBox>
      </Slide>
    </Deck>
  );
}
