import { useLocation, useNavigate } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { BarChartIcon, Logout01Icon, ClipboardCheckIcon, GameController01Icon, Award01Icon } from '@hugeicons/core-free-icons'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const links = [
    {
      key: 'survey',
      label: 'Пройти новый тест',
      icon: <HugeiconsIcon icon={ClipboardCheckIcon} size={18} />,
      to: '/survey',
    },
    { key: 'dashboard', label: 'Статистика', icon: <HugeiconsIcon icon={BarChartIcon} size={18} />, to: '/dashboard' },
    {
      key: 'distortions',
      label: 'Игры на когнитивные искажения',
      icon: <HugeiconsIcon icon={GameController01Icon} size={18} />,
      to: '/distortions',
    },
    {
      key: 'training',
      label: 'Тренировка по искажениям',
      icon: <HugeiconsIcon icon={Award01Icon} size={18} />,
      to: '/training',
    },
  ]

  return (
    <nav className="md-sidebar flex flex-col">
      <div className="md-sidebar-brand">Mental Health</div>
      <div className="flex flex-col gap-1">
        {links.map((link) => (
          <button
            key={link.key}
            type="button"
            className={`md-sidebar-link${location.pathname.startsWith(link.to) ? ' active' : ''}`}
            onClick={() => navigate(link.to)}
          >
            {link.icon}
            {link.label}
          </button>
        ))}
        <button type="button" className="md-sidebar-link" onClick={handleLogout}>
          <HugeiconsIcon icon={Logout01Icon} size={18} />
          Выход
        </button>
      </div>
    </nav>
  )
}

export default Sidebar
