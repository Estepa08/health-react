import { Carousel } from 'react-bootstrap'

const PLACEHOLDER_IMAGES = [
  '/images/themes/theme-1.svg',
  '/images/themes/theme-2.svg',
  '/images/themes/theme-3.svg',
  '/images/themes/theme-4.svg',
]

function ThemeSelector({ themes, onSelect }) {
  return (
    <Carousel interval={null} className="theme-selector-carousel" indicators={false}>
      {themes.map((theme, index) => (
        <Carousel.Item key={theme.id}>
          <div className="d-flex justify-content-center px-3 px-sm-5">
            <div
              className="card theme-card survey-card-width"
              style={{ height: '480px', cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(theme.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onSelect(theme.id)
                }
              }}
            >
              <img
                src={theme.icon || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]}
                className="card-img-top"
                alt={theme.title}
              />
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <p className="card-text card-ink-text">{theme.description}</p>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ThemeSelector
