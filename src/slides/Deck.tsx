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
  <Box textAlign="left" marginBottom={32}>
    <Heading color="heading" fontSize="h2" margin="0 0 8px 0">{label}</Heading>
    {caption && (
      <Text color="muted" fontSize="text" margin="0">{caption}</Text>
    )}
  </Box>
);

const MATERIALS_URL = "https://github.com/your-repo/vibe-coding-talk"; // TODO: замени на реальную ссылку
const CHANNEL_URL = "https://t.me/abitdeeper";
const OUR_GROUP = "https://t.me/+60NkAf4EsJ8xYWJi";

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
          [00:05] Друзья, всем привет! Спасибо, что пришли. Меня зовут Илья, и сегодня я расскажу, как я стал вайбкодером,
          зачем это нужно и как может помочь вам.
        </Notes>
      </Slide>

      {/* 1. О СПИКЕРЕ */}
      <Slide backgroundColor="bg">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center" gap={48}>
          <Box textAlign="center">
            <Heading color="heading" fontSize="h2" margin="0 0 24px 0">Илья Гуля</Heading>
            <Text color="text" fontSize="text" margin="0 0 16px 0">inDrive</Text>
            <Text color="muted" fontSize="text" margin="0 0 8px 0">Release Engineer</Text>
            <Text color="muted" fontSize="text" margin="0">Developer Productivity Engineer</Text>
          </Box>
        </FlexBox>
        <Notes>
          [00:21] Я работаю в inDriver релиз-инженером и Developer Productivity инженером. Поле деятельности у меня
          достаточно размытое.
        </Notes>
      </Slide>

      {/* 2. ЧТО ТАКОЕ ВАЙБ-КОДИНГ? (ИСТОЧНИК) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Что такое вайб-кодинг?"/>
        <FitImage src={require("../img/tweet-1886192184808149383.png")}/>
        <Notes>
          [00:32] Что такое вайбкодинг? Термин придумал Андрей Карпатый, один из сооснователей OpenAI. Он описывает, как
          можно использовать LLM для кодинга, не вникая глубоко в суть.
        </Notes>
      </Slide>

      {/* 3. ПРОЦЕСС ВАЙБ-КОДИНГА (СХЕМА КАРПАТОГО) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Как это выглядит в теории"/>
        <Card>
          <MermaidDiagram chart={`
            flowchart LR
              A["👤 **Человек**"] --> |"Просит фичу"| B["🤖 **LLM**"];
              B --> |"Генерирует код"| C["💻 **Код**"];
              C --> |"Возникает ошибка"| A;
              A --> |"Отдаёт ошибку"| B;

              style A fill:#E9ECEF,stroke:#495057
              style B fill:#E7F5FF,stroke:#339AF0
          `}/>
        </Card>
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
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>Идея</Heading>
            <Text color="text">К тому моменту нейронки уже хорошо генерили код. Я решил: почему бы не навайбкодить бота?</Text>
          </Card>
        </FlexBox>
        <Notes>
          [01:53] Первый кейс — антиспам-бот. У меня есть несколько групп в телеграме, и в них начали стабильно заходить
          спамеры. Приходилось чистить руками, это очень бесило. Я решил попробовать навайбкодить решение.
        </Notes>
      </Slide>

      {/* 5. КЕЙС #1: КОНЦЕПЦИЯ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Концепция бота" caption="Проще некуда"/>
        <Card>
          <MermaidDiagram chart={`
              flowchart LR
                A["👤 Новый пользователь"] -->|пишет сообщение| B["📝 Сообщение"];
                B --> C{"🤖 LLM-классификатор"};
                C -->|"Это спам"| D["🚫 Бан"];
                C -->|"Не спам"| E["✅ OK"];
            `}/>
        </Card>
        <Notes>
          [02:36] Концепция простая: приходит новый человек, пишет сообщение, мы отправляем его в LLM и просим
          проклассифицировать: спамер или нет? Промпт самый заурядный, никакой магии. Просто доверяемся нейронке.
        </Notes>
      </Slide>

      {/* 6. КЕЙС #1: ПЕРВОНАЧАЛЬНЫЙ УСПЕХ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Первоначальный успех" caption="...и это сработало идеально!"/>
        <FlexBox gap={32} alignItems="center">
          <Card flex={1}>
            <Heading fontSize="h3" color="success" margin={0}>~10 000</Heading>
            <Text fontSize="text" color="text" margin="8px 0 24px 0">спамеров забанено за год</Text>
            <Heading fontSize="h3" color="accent" margin={0}>20 минут</Heading>
            <Text fontSize="text" color="text" margin="8px 0 0 0">ушло на рабочего MVP на Python</Text>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>Результат</Heading>
            <Text fontSize="text" color="text" margin="0 0 16px 0">✅ Спам остановлен</Text>
            <Text fontSize="text" color="text" margin="0 0 16px 0">✅ Всего 5-6 ложных срабатываний</Text>
            <Text fontSize="text" color="muted" margin="24px 0 0 0">Звучит как идеальная история успеха...</Text>
          </Card>
        </FlexBox>
        <Notes>
          [03:00] И это сработало! Почти 10 000 забаненных спамеров, всего 5-6 ложных срабатываний. На написание MVP ушло
          20 минут. Кажется, классно. Но на самом деле все пошло не совсем по плану.
        </Notes>
      </Slide>

      {/* 7. КЕЙС #1: ПРОВАЛ (РАЗВИЛКА) */}
      <Slide backgroundColor="bg">
        <SectionTitle label="...и где я свернул не туда" caption="Простой путь vs. Кроличья нора перфекционизма"/>
        <MermaidDiagram chart={`
          graph LR
            A["MVP работает локально"] --> B{"Нужен деплой на сервер"};
            B --> C["✅ **Простой путь (1 минута)**<br/>Скопировать файл сессии"];
            B --> D["❌ **Мой путь (часы страданий)**<br/>Сделать красивый веб-логин"];
            D --> E["Переписать на TypeScript"];
            E --> F["Переписать на Rust..."];
            F --> G["...сдаться"];
            
            style C fill:#E3FAFC,stroke:#198754
        `}/>
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
        <FlexBox gap={24} alignItems="stretch">
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>1. Перфекционизм</Heading>
            <Text fontSize="text" color="text">Нужно было остановиться на MVP, а я полез "делать красиво".</Text>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>2. Невозвратные затраты</Heading>
            <Text fontSize="text" color="text">Продолжал вкладываться в то, что не работало, вместо того чтобы
              откатиться.</Text>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>3. Эскалация сложности</Heading>
            <Text fontSize="text" color="text">С ростом кодовой базы "чистый" вайбкодинг ломается. LLM перестала
              справляться.</Text>
          </Card>
        </FlexBox>
        <Notes>
          [05:42] В этом кейсе можно выделить три ошибки. Первое — перфекционизм. Второе — ошибка невозвратных затрат.
          И третье — эскалация сложности. Вайбкодинг по-карпатому ломается, как только кодовая база растет.
        </Notes>
      </Slide>

      {/* 10. КЕЙС #2: ПРОБЛЕМА */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Кейс #2: Тестирование Legacy-сервиса" caption="Идеальная задача для вайбкодера"/>
        <FlexBox gap={32} alignItems="stretch">
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>Контекст</Heading>
            <UnorderedList color="text">
              <ListItem>Сервис на Go собирает метрики из GitHub</ListItem>
              <ListItem>Написан не мной, я не люблю Go</ListItem>
              <ListItem>И главное — **нет тестов**</ListItem>
            </UnorderedList>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h4" color="heading" marginTop={0}>План</Heading>
            <Text color="text">Раз тестов нет, их нужно как-то родить. Самый простой вариант — **снэпшот-тесты**.</Text>
          </Card>
        </FlexBox>
        <Notes>
          [06:40] Следующий кейс гораздо лучше отражает идеальную задачу для вайбкодера. На работе есть сервис на Go,
          который собирает метрики. Он без тестов. Я решил, что нужно их как-то родить.
        </Notes>
      </Slide>

      {/* 11. КЕЙС #2: СНЭПШОТ-ТЕСТЫ */}
       <Slide backgroundColor="bg">
        <SectionTitle label="Как работают снэпшот-тесты"/>
        <Card>
          <MermaidDiagram chart={`
            flowchart LR
                A["📥 Вход (пачка GitHub-событий)"] --> B["⚙️ **Сервис** (чёрный ящик)"];
                B --> C["📤 Выход (состояние БД)"];
                C --> D["📸 **Слепок (Snapshot)**<br/>Записываем результат"];

                subgraph "В будущем"
                  A1["📥 Тот же вход"] --> B1["⚙️ **Сервис**"];
                  B1 --> C1["📤 Новый выход"];
                  C1 --> E{"Сравнить с D"};
                  E --> |"Совпало"| F["✅ OK"];
                  E --> |"Не совпало"| G["❌ Fail"];
                end
            `}/>
        </Card>
        <Notes>
          [07:41] Концепция снэпшот-тестов такая: мы представляем сервис как черный ящик. На вход подаем события, на выходе
          получаем состояние базы данных. Мы записываем это состояние как "слепок" и в будущем сравниваем с ним новые
          результаты.
        </Notes>
      </Slide>

      {/* 12. КЕЙС #2: НОВАЯ ПРОБЛЕМА */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Новая проблема: откуда взять данные?" caption="Тестовый фреймворк готов за 20 минут, но..."/>
        <FlexBox gap={32} alignItems="center">
          <Card flex={1}>
            <Text fontSize="text" color="text">Я скачал все события из GitHub API за последние 3 дня...</Text>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h2" color="danger" margin="0 0 16px 0">120 000</Heading>
            <Text fontSize="text" color="text" margin="0">JSON-файлов. На каждый PR по 200-300 событий.</Text>
            <Text fontSize="text" color="muted" marginTop={16}>Руками их не разобрать.</Text>
          </Card>
        </FlexBox>
        <Notes>
          [08:37] Тестовый фреймворк я навайбкодил за 20 минут. Но возникла другая проблема: откуда взять события? Я скачал
          их из API Гитхаба. Их оказалось 120 тысяч. Шансов вытащить что-то руками — ноль.
        </Notes>
      </Slide>

      {/* 13. КЕЙС #2: РЕШЕНИЕ */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Решение: приложение по запросу" caption="Когда вайб-кодинг показывает свою силу"/>
        <FlexBox gap={32} alignItems="center">
          <Card flex={2}>
            <Heading fontSize="h4" color="heading" marginTop={0}>Задача для AI</Heading>
            <Box border="1px solid" borderColor="border" borderRadius={8} padding={16} marginTop={16}
                 backgroundColor="#F8F9FA">
              <Text fontFamily="monospace" color="muted" margin={0}>
                "Gemini, сгенерируй мне тулзу на Питоне, которая будет индексировать эти файлики и позволит мне выцеплять
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
          [09:20] И тут я пошел путем, которым бы никогда не пошел до LLM. Я пошел в Gemini и просто описал, какую утилиту
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
        <SectionTitle label="Ежедневные победы" caption="Где вайб-кодинг экономит время постоянно"/>
        <FlexBox gap={24} alignItems="stretch" flexWrap="wrap">
          <Card flex={1}><Text fontSize="text" color="text" textAlign="center">Генерация **Bash/YAML** для CI/CD (я ненавижу
            Bash)</Text></Card>
          <Card flex={1}><Text fontSize="text" color="text" textAlign="center">Красивые **отчёты в PR**</Text></Card>
          <Card flex={1}><Text fontSize="text" color="text" textAlign="center">**Навигация по legacy** коду</Text></Card>
          <Card flex={1}><Text fontSize="text" color="text" textAlign="center">Эта **презентация** (частично)</Text></Card>
        </FlexBox>
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
          <MermaidDiagram chart={`
          flowchart LR
            D{"Сложность задачи"}
            
            D --> |"Простая"| B["**Claude Code**<br/>(основной выбор)"]
            D --> |"Средняя"| C["**Claude Code**<br/>(режим планирования)"]  
            D --> |"Сложная"| A["**Gemini 2.5 Pro**<br/>(сложные планы и ревью)"]
            
            C --> |"План готов"| B
            A --> |"Ревью кода"| B
            
            classDef simple fill:#E7F5FF,stroke:#339AF0;
            classDef medium fill:#FFF3E0,stroke:#FF9800;
            classDef complex fill:#FCE4EC,stroke:#E91E63;
            
            class B simple;
            class C medium;
            class A complex;
        `}/>
        </VisualCard>
        <Notes>
          [12:17] Давайте немного об инструментах. Мой go-to инструмент — Claude Code для мелких задач. Если задача
          среднего размера, нужно планирование. Я либо прошу Claude Code спланировать, либо иду в Gemini 2.5 Pro,
          собираю контекст, прошу сгенерить план, а потом этот план отдаю в Claude.
        </Notes>
      </Slide>

      {/* 17. КЕЙС "TEA": БЕЗОПАСНОСТЬ */}
      <Slide backgroundColor="bg">
        <SectionTitle label='Кейс "Tea": когда всё идёт не так' caption="Пахнет чистым, неконтролируемым вайбкодингом"/>
        <FlexBox gap={32} alignItems="stretch">
          <Card flex={1}>
            <Heading fontSize="h4" marginTop={0} color="danger">Что пошло не так?</Heading>
            <UnorderedList fontSize="text" color="text">
              <ListItem>Требовали фото с паспортом "для верификации"</ListItem>
              <ListItem>Собирали геолокацию пользователей</ListItem>
              <ListItem>И всё это лежало в **публичном бакете Firebase**</ListItem>
            </UnorderedList>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h4" marginTop={0} color="heading">Результат</Heading>
            <Text fontSize="text" color="text">Масштабная компрометация данных и репутационный ущерб.</Text>
            <Box border="1px solid" borderColor="danger" borderRadius={8} padding={16} marginTop={24}
                 backgroundColor="#F8D7DA">
              <Text fontSize="text" color="danger" textAlign="center" margin={0}>
                С большой силой приходит большая ответственность
              </Text>
            </Box>
          </Card>
        </FlexBox>
        <Notes>
          [14:00] Хочу показать подводные камни. Кейс приложения Tii. Для регистрации женщины должны были делиться фото с
          паспортом. Они утверждали, что данные удаляют. Но в итоге все лежало в публичном бакете Firebase, доступно
          всему интернету. Не факт, что это вайбкодинг, но очень пахнет им.
        </Notes>
      </Slide>

      {/* 18. ВЫВОД */}
      <Slide backgroundColor="bg">
        <SectionTitle label="Так блажь или благо?" caption="Отвечая на главный вопрос доклада"/>
        <FlexBox gap={32} alignItems="stretch">
          <Card flex={1}>
            <Heading fontSize="h3" marginTop={0} color="success">✅ Благо</Heading>
            <Text color="text" marginTop={24}>...если вы:</Text>
            <UnorderedList color="text">
                <ListItem>Понимаете ограничения инструментов</ListItem>
                <ListItem>Сохраняете контроль и экспертизу</ListItem>
                <ListItem>Следуете инженерным практикам (тесты, ревью)</ListItem>
            </UnorderedList>
          </Card>
          <Card flex={1}>
            <Heading fontSize="h3" marginTop={0} color="danger">❌ Блажь</Heading>
            <Text color="text" marginTop={24}>...если вы:</Text>
            <UnorderedList color="text">
                <ListItem>Считаете себя всемогущим</ListItem>
                <ListItem>Слепо доверяете сгенерированному коду</ListItem>
                <ListItem>Игнорируете безопасность и здравый смысл</ListItem>
            </UnorderedList>
          </Card>
        </FlexBox>
        <Notes>
            [23:19] Так вот, отвечая на вопрос из названия доклада. Вайбкодинг — это благо, если вы понимаете
            ограничения инструментов и следуете инженерным практикам. И это блажь, если вы считаете, что теперь
            всемогущи и можете делать что угодно без контроля.
        </Notes>
      </Slide>

      {/* 19. Q&A */}
      <Slide backgroundColor="bg">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center" gap={48}>
          <Heading color="heading" fontSize="h1">Спасибо!</Heading>
          <Text color="muted" fontSize="h4">Вопросы?</Text>
          <FlexBox gap={32} alignItems="center">
            {/*<QRBlock value={MATERIALS_URL} label="Материалы и слайды"/>*/}
            <QRBlock value={CHANNEL_URL} label="Мой канал"/>
            <QRBlock value={OUR_GROUP} label="Наша группа"/>
          </FlexBox>
        </FlexBox>
        <Notes>
          Спасибо! Готов к вашим вопросам.
        </Notes>
      </Slide>
    </Deck>
  );
}
