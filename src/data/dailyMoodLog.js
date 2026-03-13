// src/data/dailyMoodLog.js
// Еженедельный трекер настроения на основе Daily Mood Log Дэвида Бернса
// Источники: The Feeling Good Handbook [citation:2], feelinggood.com [citation:6]

// Список основных чувств (можно расширять)
export const feelingList = [
  'Грусть',
  'Тоска',
  'Подавленность',
  'Тревога',
  'Страх',
  'Вина',
  'Стыд',
  'Разочарование',
  'Гнев',
  'Одиночество',
  'Безнадежность',
  'Раздражительность',
]

// Список когнитивных искажений (можно импортировать из предыдущего файла)
export const cognitiveDistortions = [
  { id: 'all-or-nothing', name: 'Мышление по принципу «всё или ничего»' },
  { id: 'overgeneralization', name: 'Сверхобобщение' },
  { id: 'mental-filter', name: 'Ментальный фильтр' },
  { id: 'disqualifying-positive', name: 'Обесценивание положительного' },
  { id: 'jumping-conclusions', name: 'Поспешные выводы' },
  { id: 'magnification', name: 'Преувеличение и преуменьшение' },
  { id: 'emotional-reasoning', name: 'Эмоциональное обоснование' },
  { id: 'should-statements', name: 'Утверждения со словом «должен»' },
  { id: 'labeling', name: 'Навешивание ярлыков' },
  { id: 'personalization', name: 'Персонализация' },
]

// Структура одной записи в журнале
export const createEmptyMoodLogEntry = () => ({
  id: null, // для хранения в базе данных
  date: new Date().toISOString(),
  situation: '',
  feelings: [], // массив объектов { name: "Грусть", initialScore: 80 }
  automaticThoughts: [], // массив объектов { text: "...", beliefScore: 90, distortions: [], rationalResponse: "", rationalBeliefScore: 0 }
  finalFeelings: [], // массив объектов { name: "Грусть", finalScore: 30 }
})

// Пример готовой записи (для демонстрации пользователю)
export const moodLogExample = {
  situation:
    'Вечером, укладывая дочку спать, я отвлекся на телефон, и она упала с кровати и ударилась головой. Пришлось ехать в травмпункт.',
  feelings: [
    { name: 'Вина', initialScore: 95 },
    { name: 'Страх', initialScore: 80 },
  ],
  automaticThoughts: [
    {
      text: 'Это была полностью моя вина. Я ужасный отец.',
      beliefScore: 100,
      distortions: ['personalization', 'labeling'],
      rationalResponse:
        "Я не мог контролировать каждое движение ребенка. Я сразу же среагировал, успокоил её и отвез к врачу. Ошибка — это не делает меня 'ужасным отцом'.",
      rationalBeliefScore: 80,
    },
  ],
  finalFeelings: [{ name: 'Вина', finalScore: 30 }],
}
