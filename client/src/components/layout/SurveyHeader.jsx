import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

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
    <div className="flex justify-between items-center w-full mb-4 p-3 rounded header-bar">
      <div className="flex items-center gap-2">
        <span className="header-avatar" aria-hidden="true">
          {initial}
        </span>
        <span>{user.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
          Статистика
        </Button>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Выход
        </Button>
      </div>
    </div>
  )
}

export default Header
