import { useNavigate } from 'react-router-dom'
import { buttonColors } from '../utils/buttonColors'

function Header() {
  const navigate = useNavigate()
  const rawUser = localStorage.getItem('user')
  const user = rawUser ? JSON.parse(rawUser) : null

  if (!user) return null

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div
      className="d-flex justify-content-between align-items-start w-100 mb-3 p-3 rounded"
      style={{ backgroundColor: '#c3c9d1' }}
    >
      <span>{user.name}</span>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm"
        style={{ backgroundColor: buttonColors.outlineSecondary }}
        onClick={handleLogout}
      >
        Выход
      </button>
    </div>
  )
}

export default Header
