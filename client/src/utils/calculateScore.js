const answerScores = {
  'Ни разу': 0,
  Иногда: 1,
  Умеренно: 2,
  Часто: 3,
  'Крайне часто': 4,
}

export function calculateScore(answers) {
  // Проходим по всем ответам и суммируем баллы
  const total = Object.values(answers).reduce((sum, answer) => {
    return sum + (answerScores[answer] || 0)
  }, 0)

  return total
}
