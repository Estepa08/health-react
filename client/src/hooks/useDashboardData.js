import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchResults } from '../api/results'
import { fetchResultLevels } from '../api/resultLevels'

export function useDashboardData() {
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [resultLevels, setResultLevels] = useState([])
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

  return { results, resultLevels, error }
}
