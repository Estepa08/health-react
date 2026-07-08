import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './pages/HomePage'
import SurveyPage from './pages/SurveyPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/survey" element={<SurveyPage />} />
    </Routes>
  )
}

export default App
