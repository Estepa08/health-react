import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './pages/HomePage'
import SurveyPage from './pages/SurveyPage'
import ResultPage from './pages/ResultPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/survey" element={<SurveyPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
