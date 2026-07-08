import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './pages/HomePage'
import SurveyPage from './pages/SurveyPage'
import ResultPage from './pages/ResultPage'
import DashboardPage from './pages/DashboardPage'
import DistortionGamesPage from './pages/DistortionGamesPage'
import DistortionGamePage from './pages/DistortionGamePage'
import DistortionResultPage from './pages/DistortionResultPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/survey" element={<SurveyPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/distortions" element={<DistortionGamesPage />} />
      <Route path="/distortions/:gameId" element={<DistortionGamePage />} />
      <Route path="/distortions/:gameId/result" element={<DistortionResultPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
