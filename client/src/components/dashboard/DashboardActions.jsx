import { useNavigate } from 'react-router-dom'

function DashboardActions({ primaryLabel }) {
  const navigate = useNavigate()

  return (
    <div className="text-center d-flex flex-column gap-2 align-items-center">
      <button className="btn btn-primary" onClick={() => navigate('/survey')}>
        {primaryLabel}
      </button>
      <button className="btn btn-outline-primary" onClick={() => navigate('/distortions')}>
        Игры на когнитивные искажения
      </button>
    </div>
  )
}

export default DashboardActions
