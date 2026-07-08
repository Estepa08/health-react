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

  return (
    <div className="d-flex justify-content-end align-items-center gap-3 mb-3">
      <span>{user.name}</span>
      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
        Выход
      </button>
    </div>
  )
}

export default Header
