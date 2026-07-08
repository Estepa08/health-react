export function calculateScore(answers) {
  return Object.values(answers).reduce((total, value) => total + value, 0)
}
