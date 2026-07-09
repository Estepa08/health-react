import { assertSafeUrlSegment } from '../utils/assertSafeUrlSegment'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchDistortionGames() {
  const res = await fetch(`${API_URL}/api/distortion-games`)
  if (!res.ok) throw new Error('Не удалось загрузить список игр')
  return res.json()
}

export async function fetchDistortionCards(gameId) {
  const res = await fetch(`${API_URL}/api/distortion-games/${assertSafeUrlSegment(gameId)}/cards`)
  if (!res.ok) throw new Error('Не удалось загрузить карточки')
  return res.json()
}
