function ThemeSelector({ themes, onSelect }) {
  return (
    <div className="d-grid gap-2">
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          className="btn btn-outline-primary text-start"
          onClick={() => onSelect(theme.id)}
        >
          <span className="me-2">{theme.icon}</span>
          {theme.title}
        </button>
      ))}
    </div>
  )
}

export default ThemeSelector
