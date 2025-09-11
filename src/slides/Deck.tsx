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
  Appear,
  Notes,
  Quote,
  Link
} from "spectacle";

// ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ
const Placeholder: React.FC<{
  title: string;
  subtitle?: string;
  bullets?: string[];
}> = ({ title, subtitle, bullets }) => (
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

const SectionTitle: React.FC<{ label: string; caption?: string }> = ({
                                                                       label,
                                                                       caption
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
    surface: "#FFFFFF"
  },
  fonts: {
    header: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    text: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
  }
};

const FooterTemplate = () => (
  <Box display="flex" justifyContent="space-between" width="100%" padding="12px 16px">
    <Text fontSize="18px" color="#9CA3AF">Вайбкодинг: мифы vs реальность</Text>
    <Text fontSize="18px" color="#9CA3AF">@inDrive • DevProd</Text>
  </Box>
);

export default function DeckComponent() {
  return (
    <Deck theme={theme as any} template={<FooterTemplate />}>
      {/* 1. ТИТУЛ */}
      <Slide backgroundColor="surface">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center" gap={24}>
          <Heading>Вайбкодинг: мифы vs реальность</Heading>
          <Text fontSize="32px" color="secondary">как ускоряться безопасно и без хайпа</Text>
          <Placeholder
            title="Плейсхолдер: логотип команды/ивента"
            bullets={["Лого конференции / компании","QR на репозиторий с материалами"]}
          />
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
        <SectionTitle label="Кто я и почему «условно» вайбкодер?" caption="inDrive • Release / Dev Productivity" />
        <FlexBox gap={16} margin="24px 0">
          <Placeholder
            title="Роли и зона ответственности"
            bullets={[
              "Release engineering, CI/CD, DevProd",
              "Много YAML/Bash → теперь LLM",
              "Навигация по legacy через агента"
            ]}
          />
          <Placeholder
            title="Как работаю с кодом сегодня"
            subtitle="Гибрид вместо чистого вайба"
            bullets={[
              "План: Gemini 2.5 Pro (часто через AI Studio)",
              "Исполнение: Claude Code (go-to агент)",
              "Рефакторинг/некодовые: ChatGPT / GPT-4"
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
        <SectionTitle label="Хук: обещания из техтвиттера" caption="с чем сравним реальность" />
        <FlexBox gap={16} margin="24px 0">
          <Placeholder
            title="Скриншот твита-хайпа #1"
            subtitle="«ИИ заменил команду — $1M ARR за неделю»"
            bullets={["Затереть ники/аватарки","Контрастные цифры"]}
          />
          <Placeholder
            title="Скриншот твита-хайпа #2"
            subtitle="«Агент всё делает, я код не читаю»"
            bullets={["Подчеркнуть «без ревью»","Эмодзи-предостережение"]}
          />
          <Placeholder
            title="Скриншот твита-хайпа #3"
            subtitle="«Агенты тянут любые проекты»"
            bullets={["Большой репозиторий на фоне","Микро-иконка бесконечного цикла"]}
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
        <SectionTitle label="Что такое вайбкодинг?" caption="визуально, без определений" />
        <Placeholder
          title="Схема-поток: «Естественные инструкции → Агент/LLM → Код/Изменения → Тесты/Заборы»"
          bullets={["Покажи стрелки и иконки","Выдели блок «контроль» цветом"]}
        />
        <Notes>
          {`
          Голосом: вайбкодинг = ускоритель, не автопилот. Контроль тестами обязателен.
          `}
        </Notes>
      </Slide>

      {/* 4. МИФ 1 */}
      <Slide>
        <SectionTitle label="Миф 1" caption="«Вайбкодинг заменяет команду»" />
        <FlexBox gap={24} margin="24px 0">
          <Placeholder
            title="Диаграмма периметра"
            subtitle="Сузить внешние точки касания"
            bullets={["Меньше API / меньше рисков","MVP с ограниченным доступом"]}
          />
          <Placeholder
            title="Визуал кейса: антиспам-бот"
            subtitle="Гистограмма: баны по месяцам; отметка ложных срабатываний"
            bullets={["~10 000 банов","5–6 FP/год","«20–30 минут до MVP» бейдж"]}
          />
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
            bullets={["Наглядно: минимум функций","Стикер «Done > Perfect»"]}
          />
        </FlexBox>
        <Notes>{`К привязке: антиспам-бот и развилка деплоя.`}</Notes>
      </Slide>

      {/* 6. МИФ 2 */}
      <Slide>
        <SectionTitle label="Миф 2" caption="«Код можно не смотреть»" />
        <FlexBox gap={24} margin="24px 0">
          <Placeholder
            title="Диаграмма «Заборы»"
            subtitle="Минимальный внешний API, роли/whitelist, логи"
            bullets={["Иконка «щит»","Схема потока прав/запретов"]}
          />
          <Placeholder
            title="Скрин-мок: PR-отчёт"
            subtitle="Читаемый авто-репорт по проверкам"
            bullets={["До/после оформление","Навигация по ошибкам"]}
          />
        </FlexBox>
        <Notes>
          {`Внутренние утилиты — проще, но заборы нужны. Публичный периметр — ревью обязательно.`}
        </Notes>
      </Slide>

      {/* 6.1 КЕЙС TEA — БЕЗОПАСНОСТЬ */}
      <Slide>
        <SectionTitle label="Кейс: Tea" caption="что бывает без «заборов»" />
        <FlexBox gap={16} margin="24px 0">
          <Placeholder
            title="Скриншот/заметка СМИ (затемнить данные)"
            subtitle="Публичный сервис без базовой безопасности"
            bullets={[
              "Требовали ID+фото «на верификацию»",
              "Хранили гео/чувствительные поля",
              "Данные «торчали» — компрометация"
            ]}
          />
          <Placeholder
            title="Вывод (крупно)"
            bullets={[
              "Сужай поверхность атаки",
              "Не храни лишнее по умолчанию",
              "И хотя бы ИИ-security-проход (лучше — человеческий)"
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
            bullets={["Пиктограмма тормоза","Знак стоп"]}
          />
        </FlexBox>
        <Notes>{`Закрепить через Tea и антиспам-бот (узкий периметр).`}</Notes>
      </Slide>

      {/* 8. МИФ 3 */}
      <Slide>
        <SectionTitle label="Миф 3" caption="«Агенты тянут любые проекты»" />
        <FlexBox gap={24} margin="24px 0">
          <Placeholder
            title="График: размер кода vs эффективность «чистого вайба»"
            subtitle="Кривая вниз при росте"
            bullets={["Оси: KLOC / эффективность","Точка «порог контекста»"]}
          />
          <Placeholder
            title="Схема: «agent loop / зацикливание»"
            subtitle="Контекст переполнен → путает папки → повтор команд"
            bullets={["Метка /compact","Смена инструмента"]}
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
          <Placeholder
            title="Пайплайн-диаграмма"
            subtitle="Gemini (план/дифф) → Agent (Claude Code/Aider) → Snapshot/Unit tests"
            bullets={["Малые итерации","Стоп-правило: 3 фейла"]}
          />
        </FlexBox>
        <Notes>{`Проговорить короткий цикл. Не уходить в детали здесь — они на следующем слайде.`}</Notes>
      </Slide>

      {/* 9.1 ГИБРИДНЫЙ ЦИКЛ — ПОДРОБНО */}
      <Slide>
        <SectionTitle label="Гибридный цикл — подробно" caption="5 шагов без закапывания" />
        <FlexBox gap={16} margin="24px 0">
          <Placeholder
            title="0) Подготовка"
            bullets={[
              "Цель, список файлов, логи/ошибки",
              "files-to-prompt/RepoMix для больших кусков"
            ]}
          />
          <Placeholder
            title="1) План (Gemini 2.5 Pro)"
            bullets={[
              "5–8 шагов с ожидаемым результатом",
              "Дай замены для шагов 1–2"
            ]}
          />
          <Placeholder
            title="2) Применение (Claude Code)"
            bullets={[
              "PLAN.md, шаг-за-шагом",
              "Сборка/тесты — обязательно"
            ]}
          />
        </FlexBox>
        <FlexBox gap={16} margin="16px 0">
          <Placeholder
            title="3) Тест/снэпшоты"
            bullets={["Smoke или snapshot (вход→выход)","Фиксируем регрессии"]}
          />
          <Placeholder
            title="4) Если «поплыло»"
            bullets={[
              "/compact у агента",
              "Логи/дифф → в Gemini за корректировками",
              "Дробим шаг и продолжаем"
            ]}
          />
        </FlexBox>
        <Notes>{`Это и есть управляемый вайб: минимум ручного, максимум контроля.`}</Notes>
      </Slide>

      {/* 10. ИНСТРУМЕНТЫ ПО ЗАПРОСУ — ВЕБХУКИ */}
      <Slide>
        <SectionTitle label="Инструменты по запросу" caption="ROI 5–20 минут" />
        <Placeholder
          title="Скрин-мок: Webhook Explorer GUI (Python)"
          subtitle="Фильтры, группировки, экспорт"
          bullets={[
            "≈120 000 событий / 3 дня",
            "1-я версия 5–10 мин, до пользы ≤20 мин",
            "~1500 строк Python"
          ]}
        />
        <Notes>
          {`Идеальный кейс для вайбкодинга: самодостаточно, без внешних интеграций.`}
        </Notes>
      </Slide>

      {/* 10.1 КАРТА ИНСТРУМЕНТОВ */}
      <Slide>
        <SectionTitle label="Карта инструментов" caption="кто за что отвечает" />
        <FlexBox gap={16} margin="24px 0">
          <Placeholder
            title="Планировщик"
            subtitle="Gemini 2.5 Pro (AI Studio ок)"
            bullets={["Большой контекст","План/диффы/замены","Проверка патчей"]}
          />
          <Placeholder
            title="Исполнитель"
            subtitle="Claude Code (go-to агент)"
            bullets={["Правки файлов","Команды/тесты","PLAN.md, /compact"]}
          />
          <Placeholder
            title="Рефакторинг/прочее"
            subtitle="ChatGPT / GPT-4"
            bullets={["Быстрые правки","Тексты/скрипты","Идеи/разметка"]}
          />
        </FlexBox>
        <FlexBox gap={16}>
          <Placeholder
            title="Кормушки контента"
            subtitle="files-to-prompt / RepoMix / Shotgun Code"
            bullets={["Упаковать каталог","Быстрые пресеты","Просветить проект"]}
          />
          <Placeholder
            title="Нотация терминов"
            bullets={[
              "В докладе: «Gemini» = 2.5 Pro",
              "Единообразные названия на всех слайдах"
            ]}
          />
        </FlexBox>
        <Notes>{`Подчеркнуть AI Studio как удобную точку входа для Gemini 2.5 Pro.`}</Notes>
      </Slide>

      {/* 10.2 ЯЗЫКИ — ГДЕ LLM ПИШЕТ ЛУЧШЕ */}
      <Slide>
        <SectionTitle label="Где LLM пишет лучше?" caption="ощущение от прод-работы" />
        <FlexBox gap={16} margin="24px 0">
          <Placeholder
            title="Python"
            subtitle="#1 по стабильности генерации"
            bullets={["Меньше бойлерплейта","Больше обучающих данных","Быстрое окружение"]}
          />
          <Placeholder
            title="TypeScript"
            subtitle="#2 в прод-практике"
            bullets={["Хорошие инструменты","Чёткие типы","Чуть больше трения"]}
          />
          <Placeholder
            title="Kotlin / Rust"
            subtitle="Тяжелее для агентов"
            bullets={["Сложнее сборка/тулы","Чувствительны к контексту","Требуют больше ручного контроля"]}
          />
        </FlexBox>
        <Notes>{`Личный порядок предпочтений для вайб-итераций; не догма.`}</Notes>
      </Slide>

      {/* 11. МАНИФЕСТ */}
      <Slide backgroundColor="#0B1221">
        <FlexBox height="100%" alignItems="center" justifyContent="center" flexDirection="column" gap={24}>
          <Heading color="#FFFFFF">Манифест вайбкодинга</Heading>
          <FlexBox gap={16} alignItems="stretch" justifyContent="center" flexWrap="wrap">
            <Placeholder title="Иконка «щит»" subtitle="Делай быстро только то, что безопасно" />
            <Placeholder title="Схема периметра" subtitle="Любой внешний периметр — под забор" />
            <Placeholder title="Пайплайн" subtitle="Гибрид там, где растёт код" />
            <Placeholder title="Мем trolley problem" subtitle="Не корми sunk cost" />
          </FlexBox>
        </FlexBox>
        <Notes>{`Предложить сфоткать. 4 правила вслух.`}</Notes>
      </Slide>

      {/* 12. NOW WHAT */}
      <Slide>
        <SectionTitle label="Что делать завтра?" caption="конкретный старт" />
        <FlexBox gap={24} margin="24px 0">
          <Placeholder
            title="Чек-лист (3 пункта)"
            bullets={["Выбери одну рутину","Сделай утилиту за вечер","Публичный сервис → только гибрид"]}
          />
          <Placeholder
            title="QR-код на репо/материалы"
            bullets={["README: дерево решений","Шаблоны промптов","PLAN.md-шаблон"]}
          />
        </FlexBox>
        <Notes>
          {`Закрытие: «Я говорю “Gemini” — имею в виду 2.5 Pro. Эти слайды тоже вайбкодились». Не говорить «времени мало».`}
        </Notes>
      </Slide>

      {/* 13. Q&A */}
      <Slide>
        <SectionTitle label="Q&A" caption="быстрые ответы в формате PREP" />
        <FlexBox gap={16}>
          <Placeholder
            title="Шпаргалка PREP"
            bullets={["Point → Reason → Example → Point","Коротко и по сути"]}
          />
          <Placeholder
            title="Карточка: когда точно гибрид?"
            bullets={["Растёт код/есть внешний периметр","3× фейл агента подряд","Нужна воспроизводимость (тесты)"]}
          />
          <Placeholder
            title="Карточка: почему Python ощущается лучше?"
            bullets={["Меньше бойлерплейта","Быстрое окружение","Стабильнее генерация"]}
          />
        </FlexBox>
        <Notes>{`Держать темп, отвечать по PREP. Напомнить про стоп-правила.`}</Notes>
      </Slide>

      {/* 14. РЕЗЕРВНЫЕ / БЭКАП */}
      <Slide>
        <SectionTitle label="Бэкап-слайды" caption="на случай времени/вопросов" />
        <FlexBox gap={16}>
          <Placeholder
            title="Дерево решений"
            bullets={["1) Есть внешний доступ?","2) Размер задачи?","3) Контекст/агент стабилен?","4) Перфекционизм?"]}
          />
          <Placeholder
            title="Гайд по единообразию терминов"
            bullets={["Всюду: «Gemini» = 2.5 Pro","Единые названия инструментов","AI Studio как вход для планов"]}
          />
          <Placeholder
            title="Сетка «до/после»"
            bullets={["Ручной Bash vs LLM","Сырые отчёты vs читаемые","Навигация по legacy агентом"]}
          />
        </FlexBox>
        <Notes>{`Резерв на перерасход/недобор времени. Оставаться в русле темы.`}</Notes>
      </Slide>
    </Deck>
  );
}
