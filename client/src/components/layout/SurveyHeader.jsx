import { useNavigate } from 'react-router-dom'

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

  const initial = user.name?.trim()?.[0]?.toUpperCase() ?? '?'

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center w-100 mb-4 p-3 rounded header-bar gap-2">
      <div className="d-flex align-items-center gap-2">
        <span className="header-avatar" aria-hidden="true">
          {initial}
        </span>
        <span>{user.name}</span>
      </div>
      <div className="d-flex align-items-center gap-2 header-actions">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => navigate('/dashboard')}
        >
          Статистика
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
          Выход
        </button>
      </div>
    </div>
  )
}

export default Header
