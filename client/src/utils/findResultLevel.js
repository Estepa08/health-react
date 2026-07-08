export function findResultLevel(resultLevels, score) {
  return resultLevels.find((item) => score >= item.minScore && score <= item.maxScore)
}
