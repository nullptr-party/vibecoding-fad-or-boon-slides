import * as React from "react";
import {Box, Deck, FlexBox, Heading, Image, ListItem, Notes, Slide, Text, UnorderedList} from "spectacle";
import mermaid from "mermaid";
import {QRCodeSVG} from 'qrcode.react';

// ==================================================================
// ДИЗАЙН И КОМПОНЕНТЫ
// ==================================================================

// НОВАЯ, БОЛЕЕ СВЕТЛАЯ ЦВЕТОВАЯ СХЕМА
const theme = {
  colors: {
    bg: "#F8F9FA", // Слегка серый фон для "воздуха"
    cardBg: "#FFFFFF", // Чисто белые карточки
    text: "#495057", // Мягкий серый для основного текста
    heading: "#212529", // Почти черный для заголовков, для контраста
    accent: "#0D6EFD", // Более яркий и стандартный синий
    muted: "#6C757D", // Приглушенный серый для подписей и второстепенного текста
    border: "#E9ECEF", // Очень светлая граница
    danger: "#DC3545",
    success: "#198754",
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
    h5: "24px",
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
    padding={32} // Увеличил паддинг для "воздуха"
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

const MermaidDiagram: React.FC<{ chart: string; size?: 'S' | 'M' | 'L' | 'XL' | 'XXL' }> = ({chart, size = 'M'}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fontSize = size === 'S' ? '16px' : size === 'L' ? '20px' : size === 'XL' ? '24px' : size === 'XXL' ? '28px' : '18px';

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
        fontSize,
      },
      flowchart: {curve: "basis"},
    });

    const id = "mmd-" + Math.random().toString(36).slice(2);
    mermaid.render(id, chart).then(({svg}) => {
      if (ref.current) ref.current.innerHTML = svg;
    });
  }, [chart, size]);

  const scaleMap = {
    S: 0.8,
    M: 1,
    L: 1.1,
    XL: 1.2,
    XXL: 1.3,
  };
  const scale = scaleMap[size];

  return <div ref={ref} style={{
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    transform: `scale(${scale})`,
    transformOrigin: 'center',
  }}/>;
};

const SectionTitle: React.FC<{ label: string; caption?: string }> = ({label, caption}) => (
  <Box textAlign="left">
    <Heading color="heading" fontSize="h2" margin="0 0 8px 0">{label}</Heading>
    {caption && (
      <Text color="muted" fontSize="text" margin="0" marginTop={-16} marginBottom={32}>{caption}</Text>
    )}
  </Box>
);

const MATERIALS_URL = "https://github.com/your-repo/vibe-coding-talk"; // TODO: замени на реальную ссылку
const CHANNEL_URL = "https://t.me/abitdeeper";
const OUR_GROUP = "https://t.me/+60NkAf4EsJ8xYWJi";

const QRBlock: React.FC<{ value: string; label?: string, size?: number }> = ({
                                                                               value,
                                                                               label = "Материалы доклада",
                                                                               size,
                                                                             }) => (
  <Card>
    <FlexBox flexDirection="column" alignItems="center" gap={16}>
      <QRCodeSVG value={value} size={size ?? 160} bgColor={theme.colors.cardBg} fgColor={theme.colors.heading}/>
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
    <Text fontSize="text" color="muted">{slideNumber}</Text>
  </Box>
);


// ==================================================================
// ФИНАЛЬНАЯ СТРУКТУРА ПРЕЗЕНТАЦИИ (без изменений)
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
        </FlexBox>
        <Notes>
          [00:05] Друзья, всем привет! Спасибо, что пришли. Меня зовут Илья, и сегодня я расскажу, как я стал
          вайбкодером,
          зачем это нужно и как может помочь вам.
        </Notes>
      </Slide>

      {/* 1. О СПИКЕРЕ */}
      <Slide backgroundColor="bg">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
          <Box>
            <Heading color="heading" fontSize="h1">
              Илья Гуля
            </Heading>
            <UnorderedList color="text" fontSize="text" margin="0">
              <ListItem>Работаю в <strong>inDrive</strong></ListItem>
              <UnorderedList color="text">
                <ListItem>Release Engineering</ListItem>
                <ListItem>Developer Productivity</ListItem>
              </UnorderedList>
              <ListItem>Основатель <strong>nullptr.party</strong></ListItem>
            </UnorderedList>
          </Box>
        </FlexBox>
        <Notes>
          [00:21] Я работаю в inDriver релиз-инженером и Developer Productivity инженером. Поле деятельности у меня
          достаточно размытое.
        </Notes>
      </Slide>

      {/* 2. ЧТО ТАКОЕ ВАЙБ-КОДИНГ? (ИСТОЧНИК) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Что такое вайбкодинг?"/>
        <FitImage src={require("../img/tweet-1886192184808149383.png")}/>
        <Notes>
          [00:32] Что такое вайбкодинг? Термин придумал Андрей Карпатый, один из сооснователей OpenAI. Он описывает, как
          можно использовать LLM для кодинга, не вникая глубоко в суть.
        </Notes>
      </Slide>

      {/* 3. ПРОЦЕСС ВАЙБ-КОДИНГА (СХЕМА КАРПАТОГО) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Как это выглядит в теории"/>
        <VisualCard>
          <MermaidDiagram size="XL" chart={`
            flowchart LR
              A["👤 **Человек**"] --> |"Просит фичу"| B["🤖 **LLM**"];
              B --> |"Генерирует код"| C["💻 **Код**"];
              C --> |"Возникает ошибка"| A;
              A --> |"Отдаёт ошибку"| B;

              style A fill:#E7F5FF,stroke:#339AF0
              style B fill:#E7F5FF,stroke:#339AF0
              style C fill:#E7F5FF,stroke:#339AF0
          `}/>
        </VisualCard>
        <Notes>
          [01:00] По Карпатому, это выглядит так: ты не паришься, что генерит LLM. Просишь фичу, запускаешь. Не
          работает — отдаешь ошибку обратно. Такой цикл обратной связи, где ты просто копируешь туда-сюда. Звучит
          хорошо, но работает не всегда.
        </Notes>
      </Slide>

      {/* 4. КЕЙС #1: НАЧАЛО */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Кейс #1: Антиспам-бот для Telegram" caption="Когда рутина достала"/>
        <FlexBox gap={32} alignItems="stretch">
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>Контекст</Heading>
            <UnorderedList color="text">
              <ListItem>Администрирую несколько Telegram-групп</ListItem>
              <ListItem>К октябрю прошлого года — куча спамеров</ListItem>
              <ListItem>Приходилось вычищать руками, это бесило</ListItem>
            </UnorderedList>
          </Card>
        </FlexBox>
        <Notes>
          [01:53] Первый кейс — антиспам-бот. У меня есть несколько групп в телеграме, и в них начали стабильно заходить
          спамеры. Приходилось чистить руками, это очень бесило.
        </Notes>
      </Slide>
      <Slide backgroundColor="bg">
        <SectionTitle label="Кейс #1: Антиспам-бот для Telegram" caption="Когда рутина достала"/>
        <FlexBox gap={32} alignItems="stretch">
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>Идея</Heading>
            <Text color="text">К октябрю 2024 нейронки уже хорошо генерили код. </Text>
            <Text color="text">Почему бы не навайбкодить бота?</Text>
            <Text color="text">(до того как это стало мейнстримом)</Text>
          </Card>
        </FlexBox>
        <Notes>
          [02:16] К этому моменту нейронки уже достаточно качественно генерили код, и я решил попробовать навайбкодить
          решение.
        </Notes>
      </Slide>

      {/* 5. КЕЙС #1: КОНЦЕПЦИЯ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Концепция бота" caption="Проще некуда"/>
        <VisualCard>
          <MermaidDiagram size={'L'} chart={`
              graph LR
                A["👤 **Новый пользователь**<br/>📝 Первое сообщение"]
                A --> B{"🤖 **LLM-классификатор**"}
                B -->|"Это спам"| C["🚫 **БАН**<br/>Удалить пользователя"]
                B -->|"Не спам"| D["✅ **РАЗРЕШИТЬ**<br/>Оставить в группе"]
                
                style A fill:#E7F5FF,stroke:#339AF0
                style B fill:#FFF3CD,stroke:#F0AD4E
                style C fill:#FFF0F6,stroke:#DC3545
                style D fill:#E3FAFC,stroke:#198754
            `}/>
        </VisualCard>
        <Notes>
          [02:36] Концепция простая: приходит новый человек, пишет сообщение, мы отправляем его в LLM и просим
          проклассифицировать: спамер или нет? Промпт самый заурядный, никакой магии. Просто доверяемся нейронке.
        </Notes>
      </Slide>

      {/* 6. КЕЙС #1: ПЕРВОНАЧАЛЬНЫЙ УСПЕХ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Первоначальный успех" caption="...и это сработало идеально!"/>
        <FlexBox gap={32} alignItems="center">
          <Box>
            <Card flex={1}>
              <Heading fontSize="h3" color="success" margin={0}>~10 000</Heading>
              <Text fontSize="text" color="text" margin="8px 0 24px 0">спамеров забанено за год</Text>
              <Heading fontSize="h3" color="accent" margin={0}>20 минут</Heading>
              <Text fontSize="text" color="text" margin="8px 0 0 0">ушло на рабочего MVP на Python</Text>
            </Card>
          </Box>
          <Box>
            <Card flex={1}>
              <Heading fontSize="h4" color="heading" marginTop={0}>Результат</Heading>
              <Text fontSize="text" color="text" margin="0 0 16px 0">✅ Спам остановлен</Text>
              <Text fontSize="text" color="text" margin="0 0 16px 0">✅ Всего 5-6 ложных срабатываний</Text>
              <Text fontSize="text" color="muted" margin="24px 0 0 0">Звучит как история успеха...</Text>
            </Card>
          </Box>
        </FlexBox>
        <Notes>
          [03:00] И это сработало! Почти 10 000 забаненных спамеров, всего 5-6 ложных срабатываний. На написание MVP
          ушло
          20 минут. Кажется, классно. Но на самом деле все пошло не совсем по плану.
        </Notes>
      </Slide>

      {/* 7. КЕЙС #1: ПРОВАЛ (РАЗВИЛКА) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="...и где я свернул не туда" caption="Простой путь vs кроличья нора перфекционизма"/>
        <VisualCard>
          <MermaidDiagram size={'L'} chart={`
          graph LR
            B{"<b>Нужен деплой на сервер</b>"};
            B --> C["✅ **Простой путь (1 минута)**<br/>Скопировать файл сессии"];
            B --> D["❌ **Мой путь (часы страданий)**<br/>Сделать красивый веб-логин"];
            D --> E["Переписать на TypeScript/Rust<br>"];
            E --> G["...сдаться"];
            
            
            style B fill:#FFF3CD,stroke:#F0AD4E
            style C fill:#E3FAFC,stroke:#198754
            style D fill:#FFF0F6,stroke:#DC3545
            style E fill:#FFF0F6,stroke:#DC3545
            style G fill:#FFF0F6,stroke:#DC3545
        `}/>

        </VisualCard>
        <Notes>
          [03:40] Когда у меня появилось рабочее решение, его нужно было задеплоить. Был простой вариант: скопировать
          файл сессии на сервер и забыть. Но я, к сожалению, перфекционист. Я решил, что мне нужен красивый
          веб-логин... это привело к часам страданий.
        </Notes>
      </Slide>

      {/* 8. КЕЙС #1: ОШИБКА НЕВОЗВРАТНЫХ ЗАТРАТ */}
      <Slide backgroundColor="bg">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center" gap={32}>
          <Heading fontSize="h3" color="heading" textAlign="center">Ловушка №1: Ошибка невозвратных затрат</Heading>
          <FitImage
            src={require("../img/11933170183.png")}
            maxHeight={"80%"}
          />
          <Text fontSize="text" color="muted" textAlign="center">"Я уже столько вложил, нужно продолжать!"</Text>
        </FlexBox>
        <Notes>
          [05:05] То, что со мной произошло, называется ошибка невозвратных затрат. Это когда ты уже вложил столько
          усилий, что не хочешь останавливаться. Кажется, что вот-вот, еще чуть-чуть, и все получится.
        </Notes>
      </Slide>

      {/* 9. КЕЙС #1: ВЫВОДЫ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Три ошибки, которые я совершил" caption="И как их избежать"/>
        <Box>
          <FlexBox gap={24} alignItems="stretch">
            <Card flex={1}>
              <Heading fontSize="h4" color="heading" marginTop={0}>Перфекционизм<br/><br/></Heading>
              <Text fontSize="text" color="text">Нужно было остановиться на MVP, а я полез "делать
                красиво".<br/><br/></Text>
            </Card>
            <Card flex={1}>
              <Heading fontSize="h4" color="heading" marginTop={0}>Невозвратные затраты</Heading>
              <Text fontSize="text" color="text">Продолжал вкладываться в то, что не работало, вместо того, чтобы
                откатиться.</Text>
            </Card>
            <Card flex={1}>
              <Heading fontSize="h4" color="heading" marginTop={0}>Эскалация сложности</Heading>
              <Text fontSize="text" color="text">С ростом кодовой базы "чистый" вайбкодинг ломается. LLM перестала
                справляться.</Text>
            </Card>
          </FlexBox>
        </Box>
        <Notes>
          [05:42] В этом кейсе можно выделить три ошибки. Первое — перфекционизм. Второе — ошибка невозвратных затрат.
          И третье — эскалация сложности. Вайбкодинг по-карпатому ломается, как только кодовая база растет.
        </Notes>
      </Slide>

      {/* 10. КЕЙС #2: КОНТЕКСТ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Кейс #2: Тестирование Legacy-сервиса" caption="Идеальная задача для вайбкодера"/>
        <FlexBox>
          <Box>
            <Card flex={1}>
              <Heading fontSize="h4" color="heading" marginTop={0}>Контекст</Heading>
              <UnorderedList color="text">
                <ListItem>Сервис на Go собирает метрики из GitHub</ListItem>
                <ListItem>Написан не мной, придётся разбираться в коде на Go</ListItem>
                <ListItem><b>Нет тестов</b></ListItem>
              </UnorderedList>
            </Card>
          </Box>
        </FlexBox>
        <Notes>
          [06:40] Следующий кейс. На работе есть сервис на Go, который собирает метрики. Он без тестов, и я не очень
          люблю Go.
        </Notes>
      </Slide>

      {/* ================================================================== */}
      {/* НОВЫЙ СЛАЙД */}
      {/* ================================================================== */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Как работает сервис метрик"/>
        <VisualCard>
          <MermaidDiagram size={"L"} chart={`
            graph LR
                A["🐙 **GitHub**"] --> W["📡 **Webhooks**<br/>workflow_run<br/>workflow_job"];
                W --> B["⚙️ **Сервис метрик (Go)**<br/>Агрегирует и считает"];
                B --> C["💾 **ClickHouse**<br/>Хранит готовые метрики"];
                
                style A fill:#E7F5FF,stroke:#339AF0
                style W fill:#E7F5FF,stroke:#339AF0
                style B fill:#E7F5FF,stroke:#339AF0
                style C fill:#E7F5FF,stroke:#339AF0
            `}/>
        </VisualCard>
        <Notes>
          [06:48] Если кратко, то сервис работает так: он получает события из Гитхаба через вебхуки, обрабатывает их,
          превращает в конкретные метрики — например, сколько времени заняла CI-джоба или как часто падают тесты — и
          складывает всё это в базу данных ClickHouse, откуда мы уже строим дашборды для бизнеса.
        </Notes>
      </Slide>

      {/* 12. КЕЙС #2: ПЛАН */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Кейс #2: Тестирование Legacy-сервиса" caption="Идеальная задача для вайбкодера"/>
        <Box>
          <FlexBox>
            <VisualCard>
              <Heading fontSize="h4" color="heading" marginTop={0}>План</Heading>
              <Text color="text">Раз тестов нет, их нужно написать.</Text>
              <Text color="text">Самый простой вариант — <b>snapshot-тесты</b>.</Text>
            </VisualCard>
          </FlexBox>
        </Box>
        <Notes>
          [07:14] Я решил, что раз тестов нет, их нужно как-то родить. Самый простой вариант — это snapshot-тесты.
        </Notes>
      </Slide>

      {/* 13. КЕЙС #2: snapshot-ТЕСТЫ (ШАГ 1) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Как работают snapshot-тесты" caption="Шаг 1: Создание snapshot"/>
        <VisualCard>
          <MermaidDiagram size="L" chart={`
            graph LR
                A["📥 **Вход**<br>(события)"] --> B["⚙️ **Сервис**<br>(чёрный ящик)"];
                B --> C["📤 **Выход**<br>(состояние БД)"];
                C --> D["📸 **Snapshot**<br/>Записываем результат"];
                
                style A fill:#E7F5FF,stroke:#339AF0
                style B fill:#FFF3CD,stroke:#F0AD4E
                style C fill:#E3FAFC,stroke:#198754
                style D fill:#F3E8FF,stroke:#9C27B0
            `}/>
        </VisualCard>
        <Notes>
          [07:41] Концепция такая: мы представляем сервис как черный ящик. На вход подаем события, на выходе получаем
          состояние базы данных. Мы записываем это состояние как "слепок" или "snapshot".
        </Notes>
      </Slide>

      {/* 14. КЕЙС #2: snapshot-ТЕСТЫ (ШАГ 2) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Как работают snapshot-тесты" caption="Шаг 2: Сравнение со слепком"/>
        <VisualCard>
          <MermaidDiagram size={"L"} chart={`
            graph LR
                A["📥 **Тот же вход**"] --> B["⚙️ **Сервис**"];
                B --> C["📤 **Новый выход**"];
                C --> E{"**Сравнить со слепком**"};
                E --> |"Совпало"| F["✅ **OK**"];
                E --> |"Не совпало"| G["❌ **Fail**"];
                
                style A fill:#E7F5FF,stroke:#339AF0
                style B fill:#FFF3CD,stroke:#F0AD4E
                style C fill:#E3FAFC,stroke:#198754
                style E fill:#F8F9FA,stroke:#6C757D
                style F fill:#E3FAFC,stroke:#198754
                style G fill:#FFF0F6,stroke:#DC3545
            `}/>
        </VisualCard>
        <Notes>
          [08:15] И в будущем, когда мы вносим изменения в код, мы можем прогнать те же входные данные и сравнить новый
          результат с сохраненным слепком. Если что-то не совпало — тест падает.
        </Notes>
      </Slide>

      <Slide backgroundColor="bg">
        <SectionTitle label="Новая проблема: откуда взять данные?"
                      caption="Тестовый фреймворк готов за 20 минут, но..."/>
        <FlexBox gap={48} marginTop={48}>
          <Card flex={1}>
            <Text fontSize="text" color="text">
              Я скачал все события из GitHub API за последние 3 дня...
            </Text>
            <Heading fontSize="h2" color="danger" margin="0 0 16px 0">120 000 JSON-файлов</Heading>
          </Card>
        </FlexBox>
        <Notes>
          [08:37] Тестовый фреймворк я навайбкодил за 20 минут. Но возникла другая проблема: откуда взять события? Я
          скачал
          их из API Гитхаба. Их оказалось 120 тысяч. Шансов вытащить что-то руками — ноль.
        </Notes>
      </Slide>

      {/* 13. КЕЙС #2: РЕШЕНИЕ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Решение: приложение по запросу" caption="Когда вайбкодинг показывает свою силу"/>
        <FlexBox gap={32} alignItems="center">
          <Card flex={2}>
            <Heading fontSize="h4" color="heading" marginTop={0}>Задача для AI</Heading>
            <Box border="1px solid" borderColor="border" borderRadius={8} padding={16} marginTop={16}
                 backgroundColor="#F8F9FA">
              <Text fontFamily="monospace" color="muted" margin={0}>
                "Gemini, сгенерируй мне тулзу на Питоне, которая будет индексировать эти файлики и позволит мне
                выцеплять
                нужные паттерны..."
              </Text>
            </Box>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h3" color="accent" margin="0 0 8px 0">~15 минут</Heading>
            <Text fontSize="text" color="text" margin="0 0 16px 0">до рабочего MVP</Text>
            <Text fontSize="small" color="muted">~1500 строк кода, которые я бы никогда не написал руками</Text>
          </Card>
        </FlexBox>
        <Notes>
          [09:20] И тут я пошел путем, которым бы никогда не пошел до LLM. Я пошел в Gemini и просто описал, какую
          утилиту
          хочу. Сказано — сделано. За 10-15 минут я получил 1500 строк кода, которые успешно заработали.
        </Notes>
      </Slide>

      {/* 14. КЕЙС #2: РЕЗУЛЬТАТ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Результат: Инспектор событий"/>
        <FitImage src={require("../img/webhook.png")} maxHeight="600px"/>
        <Notes>
          [10:05] Выглядит это как-то так. Не супер красиво, но, блин, работает! Это яркий пример того, что мы живем в
          эпоху приложений по запросу. Эти 15 минут сэкономили мне часа 3-4 работы.
        </Notes>
      </Slide>

      {/* 15. ЕЖЕДНЕВНЫЕ ПОБЕДЫ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Ежедневные победы" caption="Где вайбкодинг экономит время"/>
        <UnorderedList color="text">
          <ListItem>Генерация <strong>Bash/YAML</strong> для CI/CD</ListItem>
          <ListItem>Красивые <strong>отчёты в PR</strong></ListItem>
          <ListItem>Правила для статических анализаторов</ListItem>
          <ListItem>Проверки на CI</ListItem>
          <ListItem><strong>Навигация по legacy</strong> коду</ListItem>
          <ListItem>Эта презентация 🫡</ListItem>
        </UnorderedList>
        <Notes>
          [10:55] Вайбкодинг помогает мне и в повседневной работе. Я плотно занимаюсь CI/CD, у нас много YAML и Bash. Я
          ненавижу Bash и за последний год не написал ни строчки. Всё делают нейронки. Отчеты в PR, навигация по
          легаси... ну и эта презентация тоже.
        </Notes>
      </Slide>

      {/* 16. КАРТА ИНСТРУМЕНТОВ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Мой инструментарий"/>
        <VisualCard>
          <MermaidDiagram size={"L"} chart={`
          flowchart LR
            D{"Сложность задачи"}
            
            D --> |"Простая"| B["**Claude Code**<br/>(основной выбор)"]
            D --> |"Средняя"| C["**Claude Code**<br/>(режим планирования)"]  
            D --> |"Сложная"| A["**Gemini 2.5 Pro**<br/>(сложные планы и ревью)"]
            
            C --> |"План"| B
            A --> |"План"| B
            
            classDef simple fill:#E7F5FF,stroke:#339AF0;
            classDef medium fill:#FFF3E0,stroke:#FF9800;
            classDef complex fill:#FCE4EC,stroke:#E91E63;
            classDef decision fill:#F0F0F0,stroke:#333333;
            
            class B simple;
            class C medium;
            class A complex;
            class D decision;
        `}/>
        </VisualCard>
        <Notes>
          [12:17] Давайте немного об инструментах. Мой go-to инструмент — Claude Code для мелких задач. Если задача
          среднего размера, нужно планирование. Я либо прошу Claude Code спланировать, либо иду в Gemini 2.5 Pro,
          собираю контекст, прошу сгенерить план, а потом этот план отдаю в Claude.
        </Notes>
      </Slide>

      {/* 17. КЕЙС "TEA": БЕЗОПАСНОСТЬ */}
      {/* ================================================================== */}
      {/* КЕЙС "Tea" РАЗДЕЛЕН НА ДВА СЛАЙДА */}
      {/* ================================================================== */}

      {/* 17. КЕЙС "Tea": КОНТЕКСТ */}
      <Slide backgroundColor="bg">
        <SectionTitle label='Кейс "Tea": когда всё идёт не так' caption="Пахнет чистым неконтролируемым вайбкодингом"/>
        <FlexBox marginTop={16}>
          <Card flex={1}>
            <Heading fontSize="h5" marginTop={0} color="heading">Что требовало приложение?</Heading>
            <UnorderedList fontSize="small" color="text">
              <ListItem>Фото с паспортом для верификации женщин</ListItem>
              <ListItem>Сбор геолокации пользователей</ListItem>
              <ListItem>Обещание: "Мы всё удалим после проверки"</ListItem>
            </UnorderedList>
          </Card>
        </FlexBox>
        <Notes>
          [14:00] Хочу показать подводные камни. Кейс приложения Tea. Для регистрации женщины должны были делиться фото
          с
          паспортом и геолокацией. Они утверждали, что данные используют только для верификации и потом удаляют.
        </Notes>
      </Slide>

      {/* 18. КЕЙС "TII": ПРОВАЛ */}
      <Slide backgroundColor="bg">
        <SectionTitle
          label='Кейс "Tea": когда всё идёт не так'
          caption="С большой силой приходит большая ответственность"
        />
        <FlexBox alignItems="stretch">
          <Box flex={1} marginRight={32}>
            <Card flex={1}>
              <Heading fontSize="h4" color="heading">
                Что пошло не так?
              </Heading>
              <Text fontSize="text" color="text">
                Все персональные данные и <strong>фото паспортов</strong><br/> лежали в{" "}
                <strong>публичном бакете</strong> Firebase
              </Text>
            </Card>
          </Box>
          <Box flex={1}>
            <Card flex={1}>
              <Heading fontSize="h4" color="heading">
                Последствия
              </Heading>
              <UnorderedList fontSize="text" color="text">
                <ListItem>Компрометация тысяч паспортов</ListItem>
                <ListItem>Масштабная утечка данных</ListItem>
                <ListItem>Репутационный ущерб</ListItem>
              </UnorderedList>
            </Card>
          </Box>
        </FlexBox>
        <Notes>
          [14:00] Хочу показать подводные камни. Кейс приложения Tii. Для регистрации женщины должны были делиться фото с паспортом. Они утверждали, что данные удаляют. Но в итоге все лежало в публичном бакете Firebase, доступно всему интернету. Не факт, что это вайбкодинг, но очень пахнет им.
          [14:57] Но в итоге всё, что они требовали, лежало в публичном бакете Firebase, доступно всему интернету. Результат — огромное количество скомпрометированных данных. Не факт, что это был вайбкодинг, но очень пахнет им.
        </Notes>
      </Slide>

      {/* 18. ВЫВОД */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Так блажь или благо?" caption="Отвечая на главный вопрос доклада"/>
        <FlexBox alignItems="stretch" marginTop={-16}>
          <Box flex={1} marginRight={32}>
            <Card flex={1}>
              <Heading fontSize="h3" marginTop={0} color="success">✅ Благо</Heading>
              <Text color="text">...если вы:</Text>
              <UnorderedList color="text">
                <ListItem>Понимаете ограничения инструментов</ListItem>
                <ListItem>Сохраняете контроль и экспертизу</ListItem>
                <ListItem>Следуете инженерным практикам (тесты, ревью)</ListItem>
              </UnorderedList>
            </Card>
          </Box>
          <Box flex={1}>
            <Card flex={1}>
              <Heading fontSize="h3" marginTop={0} color="danger">❌ Блажь</Heading>
              <Text color="text">...если вы:</Text>
              <UnorderedList color="text">
                <ListItem>Считаете себя всемогущим</ListItem>
                <ListItem>Слепо доверяете сгенерированному коду</ListItem>
                <ListItem>Игнорируете безопасность и здравый смысл</ListItem>
              </UnorderedList>
            </Card>
          </Box>
        </FlexBox>
        <Notes>
          [23:19] Так вот, отвечая на вопрос из названия доклада. Вайбкодинг — это благо, если вы понимаете
          ограничения инструментов и следуете инженерным практикам. И это блажь, если вы считаете, что теперь
          всемогущи и можете делать что угодно без контроля.
        </Notes>
      </Slide>

      {/* 19. Q&A */}
      <Slide backgroundColor="bg">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
          <Heading color="heading" fontSize="h1" marginBottom={48}>Спасибо!</Heading>
          <Text color="muted" fontSize="h4" marginBottom={48}>Вопросы?</Text>
          <FlexBox alignItems="center">
            {/*<QRBlock value={MATERIALS_URL} label="Материалы и слайды"/>*/}
            <Box marginRight={32}>
              <QRBlock
                value={CHANNEL_URL}
                size={256}
                label="Мой канал"/>
            </Box>
            <Box>
              <QRBlock
                value={OUR_GROUP}
                size={256}
                label="Наша группа"/>
            </Box>
          </FlexBox>
        </FlexBox>
        <Notes>
          Спасибо! Готов к вашим вопросам.
        </Notes>
      </Slide>
    </Deck>
  );
}
