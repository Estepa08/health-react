// src/data/cognitiveDistortionsSurvey.js
// Опросник когнитивных искажений (на основе работ Дэвида Бернса)
// Источник: "Терапия настроения" (Feeling Good), "Хорошее самочувствие" (Feeling Great)

// Сначала определим сами типы искажений с описаниями
export const distortionTypes = [
  {
    id: 'all-or-nothing',
    name: 'Мышление по принципу «всё или ничего»',
    description:
      'Вы видите всё в чёрно-белых тонах. Если что-то не идеально, вы считаете это полным провалом.',
  },
  {
    id: 'overgeneralization',
    name: 'Сверхобобщение',
    description:
      'Вы рассматриваете единичное негативное событие как бесконечную закономерность поражений.',
  },
  {
    id: 'mental-filter',
    name: 'Ментальный фильтр',
    description: 'Вы концентрируетесь на одной негативной детали и не замечаете всё позитивное.',
  },
  {
    id: 'disqualifying-positive',
    name: 'Обесценивание положительного',
    description: 'Вы отвергаете позитивный опыт, считая, что он «не считается».',
  },
  {
    id: 'jumping-conclusions',
    name: 'Поспешные выводы',
    description: 'Вы делаете негативные заключения без подтверждающих фактов.',
  },
  {
    id: 'magnification',
    name: 'Преувеличение и преуменьшение',
    description: 'Вы раздуваете проблемы или приуменьшаете свои достижения.',
  },
  {
    id: 'emotional-reasoning',
    name: 'Эмоциональное обоснование',
    description: 'Вы считаете, что ваши негативные чувства отражают реальность.',
  },
  {
    id: 'should-statements',
    name: 'Утверждения со словом «должен»',
    description: 'Вы критикуете себя или других с помощью «должен», «обязан», «надо».',
  },
  {
    id: 'labeling',
    name: 'Навешивание ярлыков',
    description: 'Вместо «я совершил ошибку» вы говорите «я неудачник».',
  },
  {
    id: 'personalization',
    name: 'Персонализация',
    description: 'Вы берёте на себя вину за события, к которым не имеете отношения.',
  },
]

// Вопросы для определения склонности к каждому типу искажений
export const cognitiveDistortionsSurvey = [
  {
    id: 1,
    distortionId: 'all-or-nothing',
    question: 'Когда я допускаю небольшую ошибку, я считаю, что полностью провалил дело',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 2,
    distortionId: 'all-or-nothing',
    question: 'Я оцениваю себя либо как успешного, либо как неудачника — середины не существует',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 3,
    distortionId: 'overgeneralization',
    question: 'Если что-то пошло не так один раз, я уверен, что так будет всегда',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 4,
    distortionId: 'overgeneralization',
    question: 'Я использую слова «всегда», «никогда», «все», «никто», описывая негативные события',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 5,
    distortionId: 'mental-filter',
    question: 'Я концентрируюсь на одной негативной детали и не замечаю всё остальное',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 6,
    distortionId: 'mental-filter',
    question: 'Даже когда происходит много хорошего, я запоминаю только плохое',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 7,
    distortionId: 'disqualifying-positive',
    question: 'Когда меня хвалят, я считаю, что люди просто вежливы или ошибаются',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 8,
    distortionId: 'disqualifying-positive',
    question: 'Мои достижения кажутся мне незначительными или случайными',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 9,
    distortionId: 'jumping-conclusions',
    question: 'Я часто «читаю мысли» и уверен, что другие думают обо мне плохо (без доказательств)',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 10,
    distortionId: 'jumping-conclusions',
    question: 'Я предсказываю, что всё закончится плохо, ещё до того, как что-то случилось',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 11,
    distortionId: 'magnification',
    question: 'Я склонен «делать из мухи слона», преувеличивать важность проблем',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 12,
    distortionId: 'magnification',
    question: 'Я приуменьшаю свои успехи и достижения, считая их неважными',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 13,
    distortionId: 'emotional-reasoning',
    question: 'Я считаю: «Раз я так себя чувствую, значит, это правда»',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 14,
    distortionId: 'emotional-reasoning',
    question: 'Если я чувствую себя глупо, значит, я действительно глуп',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 15,
    distortionId: 'should-statements',
    question: 'Я часто говорю себе «я должен», «мне следует», «мне надо»',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 16,
    distortionId: 'should-statements',
    question: 'Я критикую себя за то, что не соответствую своим стандартам',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 17,
    distortionId: 'labeling',
    question: 'Вместо «я ошибся» я говорю себе «я неудачник» или «я дурак»',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 18,
    distortionId: 'labeling',
    question: 'Я навешиваю негативные ярлыки на себя или других людей',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 19,
    distortionId: 'personalization',
    question: 'Я беру на себя вину за события, к которым не имею отношения',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
  {
    id: 20,
    distortionId: 'personalization',
    question: 'Мне кажется, что поведение других людей как-то связано со мной',
    options: [
      'Совсем не согласен',
      'Немного согласен',
      'Умеренно согласен',
      'Сильно согласен',
      'Полностью согласен',
    ],
    scores: [0, 1, 2, 3, 4],
  },
]

// Функция для подсчета результатов по типам искажений
export const calculateDistortionScores = (answers) => {
  // answers: объект вида { "1": 3, "2": 2, ... } где значение - балл (0-4)

  // Инициализируем счетчики для каждого типа искажений
  const distortionScores = {}
  distortionTypes.forEach((type) => {
    distortionScores[type.id] = {
      total: 0,
      count: 0,
      name: type.name,
      description: type.description,
    }
  })

  // Суммируем баллы по каждому типу
  Object.entries(answers).forEach(([questionId, score]) => {
    const question = cognitiveDistortionsSurvey.find((q) => q.id === parseInt(questionId))
    if (question) {
      const distortionId = question.distortionId
      distortionScores[distortionId].total += score
      distortionScores[distortionId].count += 1
    }
  })

  // Вычисляем средние баллы и определяем уровень выраженности
  const results = []
  Object.values(distortionScores).forEach((distortion) => {
    if (distortion.count > 0) {
      const average = distortion.total / distortion.count
      let level = ''

      if (average < 1) level = 'Низкая выраженность'
      else if (average < 2) level = 'Умеренная выраженность'
      else if (average < 3) level = 'Заметная выраженность'
      else level = 'Сильная выраженность'

      results.push({
        ...distortion,
        average: average.toFixed(1),
        level,
      })
    }
  })

  // Сортируем по убыванию выраженности
  return results.sort((a, b) => b.average - a.average)
}

// Общий балл по всем искажениям
export const calculateTotalDistortionScore = (answers) => {
  const total = Object.values(answers).reduce((sum, score) => sum + score, 0)
  const maxPossible = cognitiveDistortionsSurvey.length * 4
  const percentage = (total / maxPossible) * 100

  let interpretation = ''
  if (percentage < 20) interpretation = 'Низкий уровень когнитивных искажений'
  else if (percentage < 40) interpretation = 'Умеренный уровень'
  else if (percentage < 60) interpretation = 'Повышенный уровень'
  else interpretation = 'Высокий уровень (рекомендуется работа с психологом)'

  return {
    total,
    maxPossible,
    percentage: Math.round(percentage),
    interpretation,
  }
}

export default cognitiveDistortionsSurvey
