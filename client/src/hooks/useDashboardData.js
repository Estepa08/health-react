import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchResults } from '../api/results'
import { fetchResultLevels } from '../api/resultLevels'
import { fetchDistortionAttempts } from '../api/distortionAttempts'

export function useDashboardData() {
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [resultLevels, setResultLevels] = useState([])
  const [distortionAttempts, setDistortionAttempts] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    fetchResults()
      .then(setResults)
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    fetchResultLevels()
      .then(setResultLevels)
      .catch(() => setResultLevels([]))
  }, [])

  useEffect(() => {
    fetchDistortionAttempts()
      .then(setDistortionAttempts)
      .catch(() => setDistortionAttempts([]))
  }, [])

  return { results, resultLevels, distortionAttempts, error }
}
