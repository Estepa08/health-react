import { Carousel } from 'react-bootstrap'

function ThemeSelector({ themes, onSelect }) {
  return (
    <Carousel interval={null} className="theme-selector-carousel" indicators={false}>
      {themes.map((theme) => (
        <Carousel.Item key={theme.id}>
          <div className="d-flex justify-content-center px-5">
            <div
              className="card"
              style={{ width: '320px', height: '480px', cursor: 'pointer' }}
              onClick={() => onSelect(theme.id)}
            >
              <img src="/images/theme.jpeg" className="card-img-top" alt={theme.title} />
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <p className="card-text">{theme.description}</p>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ThemeSelector
