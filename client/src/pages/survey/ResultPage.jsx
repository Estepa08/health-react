import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/SurveyLayout'
import { fetchLastResult } from '../../api/results'
import { fetchResultLevels } from '../../api/resultLevels'
import { fetchThemes } from '../../api/themes'
import { findResultLevel } from '../../utils/findResultLevel'

function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [totalScore, setTotalScore] = useState(location.state?.totalScore)
  const [themeId, setThemeId] = useState(location.state?.themeId)
  const [loading, setLoading] = useState(location.state?.totalScore === undefined)
  const [resultLevels, setResultLevels] = useState([])
  const [themeTitle, setThemeTitle] = useState('')

  useEffect(() => {
    if (location.state?.totalScore !== undefined) return

    fetchLastResult()
      .then((result) => {
        setTotalScore(result?.score)
        setThemeId(result?.themeId)
      })
      .catch(() => setTotalScore(undefined))
      .finally(() => setLoading(false))
  }, [location.state])

  useEffect(() => {
    if (loading) return

    fetchResultLevels(themeId)
      .then(setResultLevels)
      .catch(() => setResultLevels([]))
  }, [loading, themeId])

  useEffect(() => {
    if (!themeId) return

    fetchThemes()
      .then((themes) => {
        const theme = themes.find((item) => item.id === themeId)
        setThemeTitle(theme?.title ?? '')
      })
      .catch(() => setThemeTitle(''))
  }, [themeId])

  useEffect(() => {
    if (!loading && totalScore === undefined) {
      navigate('/survey', { replace: true })
    }
  }, [loading, totalScore, navigate])

  if (loading || totalScore === undefined) return null

  const level = findResultLevel(resultLevels, totalScore)
  const maxPossibleScore = resultLevels.reduce((max, item) => Math.max(max, item.maxScore), 0)
  const isGoodResult = maxPossibleScore > 0 && totalScore >= maxPossibleScore / 2
  const scorePercent =
    maxPossibleScore > 0 ? Math.min(100, Math.max(0, (totalScore / maxPossibleScore) * 100)) : 0

  return (
    <Layout>
      <div className="d-flex justify-content-center px-3 px-sm-5">
        <div className="card survey-card-width">
          <div className="card-body">
            {themeTitle && <h1 className="result-page-title mb-3">{themeTitle}</h1>}

            <div className="result-panel">
              <div className="result-score-marker" style={{ left: `${scorePercent}%` }}>
                <span className="result-score-value">{totalScore}</span>
              </div>
              <div className="result-gradient-bar" />

              {level && (
                <div className="d-flex flex-column align-items-center text-center mt-4">
                  <img
                    src={isGoodResult ? '/images/good.png' : '/images/bad.png'}
                    alt=""
                    className="result-mascot mb-3"
                  />
                  <h5 className="card-ink-title result-level-title mb-2">{level.title}</h5>
                  <p className="card-ink-text result-level-description mb-0">{level.description}</p>
                </div>
              )}
            </div>

            <div className="d-flex justify-content-center mt-4">
              <button className="btn btn-primary" onClick={() => navigate('/survey')}>
                Пройти заново
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ResultPage
