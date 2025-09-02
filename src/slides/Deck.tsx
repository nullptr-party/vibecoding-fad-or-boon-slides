import React from "react";
import {
  Box,
  CodePane,
  Deck,
  Heading,
  ListItem,
  Notes,
  Quote,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  UnorderedList,
} from "spectacle";

// Tiny helpers
const Todo = ({children}: { children: React.ReactNode }) => (
  <span className="todo">[TODO] {children}</span>
);

export default function DeckApp() {
  return (
    <Deck>
      {/* S1 — Титул */}
      <Slide>
        <Heading fontSize="h2">Вайбкодинг — блажь или благо?</Heading>
        <Text className="muted">От эйфории к зрелости: как превратить магию в инженерный процесс</Text>
        <Quote className="muted tiny">Доклад частично сгенерирован на вайбе (bun + TS + Spectacle)</Quote>
        <Notes>Лёгкий тон, без мата на слайде. В речи можно «лайт».</Notes>
      </Slide>

      {/* S2 — Хук и цифры */}
      <Slide>
        <Heading fontSize="h3">Хук</Heading>
        <Text>«За год мой антиспам‑бот забанил ≈9 000 спамеров с 5–6 ложными банами — и это всё равно не магия»</Text>
        <Text><Todo>проверить цифры по логам</Todo> · <Todo>мини‑график «баны по дням»</Todo></Text>
        <Notes>10–12 секунд, чтобы зацепить и перейти к теме ответственности.</Notes>
      </Slide>

      {/* S3 — План доклада */}
      <Slide>
        <Heading fontSize="h3">План</Heading>
        <UnorderedList>
          <ListItem>Что такое вайбкодинг и где его границы</ListItem>
          <ListItem>Кейс 1: антиспам‑бот — «с вау до зрелости»</ListItem>
          <ListItem>Кейс 2: Webhook Explorer + snapshot‑тесты — «приложения по запросу»</ListItem>
          <ListItem>Ловушки и гигиена (перфекционизм, sunk cost, безопасность)</ListItem>
          <ListItem><b>Инструменты под задачи</b>: лестница от чата к агентам + матрица выбора</ListItem>
          <ListItem>Гибридный метод: План → Агент → Тесты</ListItem>
          <ListItem>Итоги: когда это благо, когда блажь</ListItem>
        </UnorderedList>
        <Notes>Покажи, что будет раздел про инструменты.</Notes>
      </Slide>

      {/* S4 — Что такое «вайбкодинг» */}
      <Slide>
        <Heading fontSize="h3">Что такое «вайбкодинг»</Heading>
        <UnorderedList>
          <ListItem>Программируешь намерениями/правками «на человеческом», не вникая глубоко в сгенерированный
            код.</ListItem>
          <ListItem>Идея популяризована в сообществе в конце 2024.</ListItem>
        </UnorderedList>
        <Text><b>Плюсы:</b> скорость, низкий порог входа, «дешёвые» одноразовые утилиты.</Text>
        <Text><b>Минусы:</b> контроль качества, безопасность, масштабирование.</Text>
        <Text><Todo>вынести 1 строку‑цитату и дату появления термина</Todo></Text>
        <Notes>Пообещай вернуться к «как держать контроль».</Notes>
      </Slide>

      {/* S5 — Кейс 1: контекст */}
      <Slide>
        <Heading fontSize="h3">Кейс 1: контекст</Heading>
        <UnorderedList>
          <ListItem><b>Задача:</b> антиспам в нескольких TG‑группах (≈1–4k участников).</ListItem>
          <ListItem><b>Идея:</b> каждое сообщение новичка → LLM‑классификация → бан/пропуск.</ListItem>
          <ListItem><b>MVP:</b> на вайбе за ~1–2 часа.</ListItem>
        </UnorderedList>
        <Notes>Подчеркни простоту MVP.</Notes>
      </Slide>

      {/* S6 — Кейс 1: результаты */}
      <Slide>
        <Heading fontSize="h3">Кейс 1: результаты</Heading>
        <UnorderedList>
          <ListItem>≈9 000 банов/год; 5–6 ложных — низкий FP.</ListItem>
          <ListItem>Работает без активной поддержки; редкие правки.</ListItem>
        </UnorderedList>
        <Text><Todo>Мини‑график/скрин обзора метрик</Todo></Text>
        <Notes>30–40 секунд, не увязнуть в деталях.</Notes>
      </Slide>

      {/* S7 — Кейс 1: где подвёл «чистый вайб» */}
      <Slide>
        <Heading fontSize="h3">Где подвёл «чистый вайб»</Heading>
        <UnorderedList>
          <ListItem><b>Перфекционизм:</b> хотел идеальный login UI и «Python‑first» → TS → Rust → Kotlin → обратно
            Python.</ListItem>
          <ListItem><b>Sunk cost:</b> «ещё одна итерация в агенте» — часы ушли, пользы мало.</ListItem>
          <ListItem><b>Не читаю код:</b> риск уязвимостей в публичном сервисе.</ListItem>
          <ListItem><b>Инструментальная ловушка:</b> «делаю только агентом» → тупики на интеграции.</ListItem>
        </UnorderedList>
        <Notes>Честно, с самоиронией.</Notes>
      </Slide>

      {/* S8 — Кейс 1: гигиена */}
      <Slide>
        <Heading fontSize="h3">Кейс 1: как правильно (гигиена)</Heading>
        <UnorderedList>
          <ListItem>Команды только от супер‑админа/вайтлист ролей.</ListItem>
          <ListItem>Логин один раз локально → перенос сессии на сервер (без «красивого» UI).</ListItem>
          <ListItem>Логи и простые алерты (всплеск банов/ошибок).</ListItem>
        </UnorderedList>
        <Text className="small"><b>Стоп‑критерии:</b> 2 фейла подряд → смена инструмента/урезать фичу;
          если <code>T_LLM &gt; T_manual</code> дважды — стоп.</Text>
        <Text className="small"><b>Итог:</b> «вайб» — для MVP; дальше — рамки и контроль.</Text>
        <Notes>Подчёркни «узкую поверхность атаки».</Notes>
      </Slide>

      {/* S9 — Кейс 2: боль и цель */}
      <Slide>
        <Heading fontSize="h3">Кейс 2: боль и цель</Heading>
        <UnorderedList>
          <ListItem><b>Сервис:</b> сбор метрик CI/CD, тонна GitHub webhooks.</ListItem>
          <ListItem><b>Цель:</b> менять логику, не ломая старое; быстро собирать тестовые наборы из реальных
            событий.</ListItem>
        </UnorderedList>
        <Notes>Подвести к «чёрному ящику».</Notes>
      </Slide>

      {/* S10 — Решение «чёрный ящик» + снапшоты */}
      <Slide>
        <Heading fontSize="h3">Решение: «чёрный ящик» + снапшоты</Heading>
        <UnorderedList>
          <ListItem>Поднимаем сервис и БД; на вход — реальные вебхуки; на выходе — состояние БД → снапшотим.</ListItem>
          <ListItem>LLM генерит каркас тестового стенда.</ListItem>
          <ListItem>Валидируем: на одинаковом входе всегда одинаковый снимок.</ListItem>
        </UnorderedList>
        <Notes>Визуализируй потоки.</Notes>
      </Slide>

      {/* S11 — Webhook Explorer */}
      <Slide>
        <Heading fontSize="h3">Webhook Explorer (утилита «по запросу»)</Heading>
        <UnorderedList>
          <ListItem>За 5–20 минут LLM сгенерила GUI на Python: фильтр по PR/статусу/времени, сбор групп событий, экспорт
            кейсов.</ListItem>
          <ListItem>«Руками» заняло бы ≈3 часа.</ListItem>
        </UnorderedList>
        <Text><Todo>Скриншот GUI; пояснить поля фильтров</Todo></Text>
        <Notes>Подчеркни: «раньше я бы даже не писал такую утилиту».</Notes>
      </Slide>

      {/* S12 — ROI и ловушки */}
      <Slide>
        <Heading fontSize="h3">ROI и ловушки</Heading>
        <UnorderedList>
          <ListItem><b>ROI:</b> 3 часа → ≈20 минут (генерация + фиксы).</ListItem>
          <ListItem><b>Валидация:</b> «сгенерилось» ≠ «надёжно» → минимум снапшотов (happy/fail).</ListItem>
          <ListItem><b>Данные:</b> не утащить секреты/PII в промпты/репо.</ListItem>
          <ListItem><b>Иллюзия контроля:</b> важнее корректно группировать вход/выход, а не «красота GUI».</ListItem>
        </UnorderedList>
        <Notes>Одной цифры ROI достаточно.</Notes>
      </Slide>

      {/* S13 — Мини‑сниппет снапшота */}
      <Slide>
        <Heading fontSize="h3">Мини‑сниппет снапшота</Heading>
        <CodePane language="diff">
          {`
              - before: metrics.job_duration[pr=123, status=failed] = 00:00:00
              + after: metrics.job_duration[pr=123, status=failed] = 00:07:42            
            `}
        </CodePane>
        <Text><Todo>Заменить на реальный короткий diff/фрагмент дампа БД (≤7 строк)</Todo></Text>
        <Notes>Не погружайся глубоко; показать принцип фикса состояний.</Notes>
      </Slide>

      {/* S14 — Почему «чистый вайб» ломается */}
      <Slide>
        <Heading fontSize="h3">Почему «чистый вайб» ломается</Heading>
        <UnorderedList>
          <ListItem>Контекст и патчи: модели путают номера строк → diff рвётся.</ListItem>
          <ListItem>Агенты: теряют рабочую директорию, пропускают файлы, зацикливаются.</ListItem>
          <ListItem>Языки: Python &gt; TypeScript &gt; … (по опыту 2024–2025).</ListItem>
          <ListItem>Перфекционизм + публичный периметр = рост риска уязвимостей.</ListItem>
          <ListItem>Sunk cost: «уже столько вложили…»</ListItem>
        </UnorderedList>
        <Notes>За 60–90 секунд пройтись по пунктам.</Notes>
      </Slide>

      {/* S15 — Контрмеры */}
      <Slide>
        <Heading fontSize="h3">Контрмеры к ловушкам</Heading>
        <UnorderedList>
          <ListItem>Делить патчи на файлы/малые MR.</ListItem>
          <ListItem>Для агентов: <code>/compact</code>, перезапуск, summary‑файл прогресса.</ListItem>
          <ListItem>Выбирать язык, где модель сильнее, для одноразовых тулз.</ListItem>
          <ListItem>Мини‑полиси безопасности и фича‑флаги «off by default».</ListItem>
          <ListItem>Таймбоксы: ≤15 минут на микротулзу; 40 минут без прогресса → стоп.</ListItem>
        </UnorderedList>
        <Notes>Связать с кейсами.</Notes>
      </Slide>

      {/* S16 — Лестница инструментов */}
      <Slide>
        <Heading fontSize="h3">Инструменты под задачи — «лестница»</Heading>
        <UnorderedList>
          <ListItem><b>Уровень 1 — Чат LLM:</b> ChatGPT/Claude/Gemini/Grok и т.п.</ListItem>
          <ListItem><b>Уровень 1.5 — files‑to‑prompt/патчи:</b> формируем контекст из папок/файлов.</ListItem>
          <ListItem><b>Уровень 2 — Большой контекст:</b> план/ревью/патчи по всему проекту.</ListItem>
          <ListItem><b>Уровень 3 — Агенты:</b> Aider, Cursor/Kiro, Copilot Chat и т.п.</ListItem>
        </UnorderedList>
        <Notes>Это каркас для следующих 3 слайдов.</Notes>
      </Slide>

      {/* S17 — Уровень 1 */}
      <Slide>
        <Heading fontSize="h3">Уровень 1: Чат (+ files‑to‑prompt)</Heading>
        <UnorderedList>
          <ListItem><b>Когда:</b> маленькие задачи, отдельные файлы, короткие сниппеты, объяснения.</ListItem>
          <ListItem><b>Как:</b> «покормили» контентом, получили код/патч.</ListItem>
          <ListItem><b>Плюсы:</b> простота, скорость.</ListItem>
          <ListItem><b>Минусы:</b> ломается на больших diff (номера строк), легко потерять целостность.</ListItem>
          <ListItem><b>Шаблоны промптов:</b> «Дай патч для X», «Объясни файл Y в 5 пунктах», «Сделай минимальный пример
            для Z».</ListItem>
        </UnorderedList>
        <Notes>40–50 секунд.</Notes>
      </Slide>

      {/* S18 — Уровень 2 */}
      <Slide>
        <Heading fontSize="h3">Уровень 2: Большой контекст</Heading>
        <UnorderedList>
          <ListItem><b>Когда:</b> нужно «прочитать» проект, составить <b>план из ≤7 шагов</b>, сделать
            обзор/диагностику.</ListItem>
          <ListItem><b>Плюсы:</b> видит много, умеет планировать изменения.</ListItem>
          <ListItem><b>Минусы:</b> не всегда идеально «считает» патчи; нужна валидация.</ListItem>
          <ListItem><b>Шаблоны:</b> «Сделай план имплементации X с критериями готовности», «Найди, где фича‑флаги
            отдаются на бэкенде».</ListItem>
        </UnorderedList>
        <Notes>Свяжи с навигацией по кодовой базе.</Notes>
      </Slide>

      {/* S19 — Уровень 3 */}
      <Slide>
        <Heading fontSize="h3">Уровень 3: Агенты (CLI/IDE)</Heading>
        <UnorderedList>
          <ListItem><b>Когда:</b> применять план пошагово, навигация, мелкие рефакторы, генерация/правки по
            месту.</ListItem>
          <ListItem><b>Плюсы:</b> скорость, меньше копипасты, может сам применять изменения.</ListItem>
          <ListItem><b>Минусы/анти‑паттерны:</b> зацикливание, неверная директория, пропуск файлов, чрезмерная
            автономность без валидации.</ListItem>
          <ListItem><b>Repair‑приёмы:</b> <code>/compact</code>, перезапуск, «один шаг плана за раз», фиксировать
            «сделано» в файле.</ListItem>
        </UnorderedList>
        <Notes>60–70 секунд.</Notes>
      </Slide>

      {/* S20 — Матрица выбора инструмента */}
      <Slide>
        <Heading fontSize="h3">Матрица выбора инструмента (Task × Tool)</Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Задача</TableCell>
              <TableCell>Чат</TableCell>
              <TableCell>files‑to‑prompt</TableCell>
              <TableCell>Большой контекст</TableCell>
              <TableCell>Агент</TableCell>
              <TableCell>Гибрид</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {([
              ["Микро‑утилита (одноразовая)", "✔︎", "✔︎", "", "", ""],
              ["Небольшой рефактор/фиксы", "✔︎", "✔︎", "", "✔︎", "✔︎"],
              ["Навигация в незнакомом проекте", "", "", "✔︎", "✔︎", "✔︎"],
              ["CI‑проверки/линтеры‑эвристики", "✔︎", "✔︎", "", "✔︎", ""],
              ["Генерация конфигов (YAML/Bash)", "✔︎", "✔︎", "", "", ""],
              ["Публичный сервис/интеграции", "", "", "✔︎ (план/ревью)", "", "✔︎"],
              ["Тестовый стенд/снапшоты", "", "", "✔︎", "✔︎", "✔︎"],
            ] as const).map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, j) => <TableCell key={j}>{cell}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Notes>✔︎ = «хороший базовый выбор».</Notes>
      </Slide>

      {/* S21 — Сигналы переключить инструмент */}
      <Slide>
        <Heading fontSize="h3">Сигналы переключить инструмент</Heading>
        <UnorderedList>
          <ListItem>Патч рвётся по строкам → к большому контексту/гибриду.</ListItem>
          <ListItem>Агент буксует 2 итерации → compact/перезапуск/гибрид.</ListItem>
          <ListItem>Контекст раздулся → делим задачи, суммаризируем диалог.</ListItem>
          <ListItem>Время LLM стабильно &gt; ручного → остановка/урезание фичи.</ListItem>
        </UnorderedList>
        <Notes>Показать как «дорожные знаки».</Notes>
      </Slide>

      {/* S22 — Языки и ожидания */}
      <Slide>
        <Heading fontSize="h3">Языки и ожидания</Heading>
        <UnorderedList>
          <ListItem><b>По опыту:</b> Python &gt; TypeScript &gt; … &gt; Kotlin (прогресс есть, но всё ещё сложнее, чем
            Py/TS).</ListItem>
          <ListItem><b>Следствие:</b> для утилит не стесняйся выбирать язык, где модель сильнее.</ListItem>
          <ListItem className="tiny"><b>Дисклеймер:</b> эмпирика за 2024–2025, не истина в последней
            инстанции.</ListItem>
        </UnorderedList>
        <Notes>20–30 секунд.</Notes>
      </Slide>

      {/* S23 — Безопасность: минимум */}
      <Slide>
        <Heading fontSize="h3">Безопасность: минимум для маленьких ботов</Heading>
        <UnorderedList>
          <ListItem>Сужаем поверхность: только админ‑команды/вайтлист.</ListItem>
          <ListItem>Секреты не в коде: env/secret manager.</ListItem>
          <ListItem>Пинить версии зависимостей; избегать «левых» пакетов.</ListItem>
          <ListItem>Логи/алерты (ошибки, аномальные баны, rate limit).</ListItem>
          <ListItem>Инпут‑валидация даже «для своих».</ListItem>
        </UnorderedList>
        <Notes>Слайд‑«памятка» для фото.</Notes>
      </Slide>

      {/* S24 — Гибридный метод */}
      <Slide>
        <Heading fontSize="h3">Гибридный метод: План → Агент → Тесты</Heading>
        <UnorderedList>
          <ListItem>Большой контекст LLM делает план (≤7 шагов, критерии готовности, риски).</ListItem>
          <ListItem>Агент выполняет <b>один шаг</b>; фиксируем «сделано» в файле.</ListItem>
          <ListItem>После каждого шага — тест/снапшот.</ListItem>
          <ListItem>Застряли → compact/перезапуск/уточнение плана.</ListItem>
          <ListItem>Релиз → метрики/алерты.</ListItem>
        </UnorderedList>
        <Text className="small"><b>Шаблон промпта «Сделай план»:</b> Цель; Ограничения; Критерии готовности; Риски; 5–7
          шагов; проверка после каждого.</Text>
        <Notes>Дай 1 пример критерия готовности.</Notes>
      </Slide>

      {/* S25 — Рецепт snapshot‑тестов */}
      <Slide>
        <Heading fontSize="h3">Рецепт snapshot‑тестов «чёрного ящика»</Heading>
        <UnorderedList>
          <ListItem>Собрать реальные вебхуки за короткий период.</ListItem>
          <ListItem>Поднять сервис + БД локально/в тест‑контейнере.</ListItem>
          <ListItem>Прогнать наборы вебхуков → зафиксировать состояние БД в файлы.</ListItem>
          <ListItem>При изменениях — прогонять снова; diff ≠ 0 → разбираться.</ListItem>
          <ListItem>Минимум 2 набора: happy‑path и fail‑path.</ListItem>
        </UnorderedList>
        <Notes>Связать с Webhook Explorer.</Notes>
      </Slide>

      {/* S26 — Таймбоксы и anti‑sunk cost */}
      <Slide>
        <Heading fontSize="h3">Таймбоксы и anti‑sunk cost</Heading>
        <UnorderedList>
          <ListItem>Микро‑тулза: ≤15 мин (или бросаем/упрощаем).</ListItem>
          <ListItem>2 подряд провальные итерации с агентом → меняем инструмент.</ListItem>
          <ListItem>40 мин без прогресса → стоп/переформулировать.</ListItem>
          <ListItem>Мем про вагонетку: «остановить можно сейчас — иначе прошлые жертвы окажутся зря».</ListItem>
        </UnorderedList>
        <Notes>Коротко и с улыбкой.</Notes>
      </Slide>

      {/* S27 — График */}
      <Slide>
        <Heading fontSize="h3">Размер проекта vs эффективность вайба</Heading>
        <Text>Линия 1: <b>Эффективность чистого вайбкодинга</b> ↓ с ростом размера.</Text>
        <Text>Линия 2: <b>Удовольствие разработчика</b> ↓ после «сладкой точки».</Text>
        <Text>Отметить «sweet spot» для микротулз и «зона гибрида».</Text>
        <Text><Todo>Нарисовать простой line chart</Todo></Text>
        <Notes>20 секунд, перейти к выводам.</Notes>
      </Slide>

      {/* S28 — Когда благо, когда блажь */}
      <Slide>
        <Heading fontSize="h3">Когда благо, когда блажь</Heading>
        <div className="two-col">
          <Box>
            <Heading fontSize="h4">Благо</Heading>
            <UnorderedList>
              <ListItem>Маленькие приватные тулзы</ListItem>
              <ListItem>Быстрые эксперименты</ListItem>
              <ListItem>Тестовые стенды</ListItem>
              <ListItem>Навигация по коду</ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Heading fontSize="h4">Блажь</Heading>
            <UnorderedList>
              <ListItem>Публичные сервисы без ревью</ListItem>
              <ListItem>Погони за «идеальным стеком»</ListItem>
              <ListItem>Игнор тестов/политик</ListItem>
              <ListItem>Слепое доверие агенту</ListItem>
            </UnorderedList>
          </Box>
        </div>
        <Notes>Привяжи к двум кейсам.</Notes>
      </Slide>

      {/* S29 — Итоговый чек‑лист */}
      <Slide>
        <Heading fontSize="h3">Итоговый чек‑лист</Heading>
        <UnorderedList>
          <ListItem>План ≤7 шагов + критерии.</ListItem>
          <ListItem>Малые итерации; после каждой — тест/снапшот.</ListItem>
          <ListItem>Таймбоксы и стоп‑критерии.</ListItem>
          <ListItem>Мини‑полиси безопасности.</ListItem>
          <ListItem>Матрица выбора инструмента.</ListItem>
          <ListItem>Пост‑мортем и правила команды.</ListItem>
        </UnorderedList>
        <Text className="muted">Финальный тезис — «Вайбкодинг — благо в рамках».</Text>
        <Notes>Слайд «фото и в путь».</Notes>
      </Slide>

      {/* S30 — Q&A + бэкап */}
      <Slide>
        <Heading fontSize="h3">Q&amp;A</Heading>
        <Text>Спасибо!</Text>
        <UnorderedList>
          <ListItem>Бэкап‑слайды: доп. сниппеты/скрины</ListItem>
          <ListItem>Таблица языков с краткими комментариями</ListItem>
          <ListItem>Чек‑лист «починить агента» (подробно)</ListItem>
          <ListItem>Полезные ссылки на инструменты (без рекламных логотипов)</ListItem>
        </UnorderedList>
        <Notes>Держи 2–3 заранее подготовленных ответа (безопасность, выбор инструмента, языки).</Notes>
      </Slide>
    </Deck>
  );
}
