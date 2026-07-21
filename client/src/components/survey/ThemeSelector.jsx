import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

const PLACEHOLDER_IMAGES = [
  '/images/themes/theme-1.svg',
  '/images/themes/theme-2.svg',
  '/images/themes/theme-3.svg',
  '/images/themes/theme-4.svg',
]

function ThemeSelector({ themes, onSelect }) {
  return (
    <Carousel className="theme-selector-carousel">
      <CarouselContent>
        {themes.map((theme, index) => (
          <CarouselItem key={theme.id}>
            <div className="flex justify-center px-3 sm:px-5">
              <Card
                className="theme-card survey-card-width"
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
                  className="w-full"
                  alt={theme.title}
                />
                <CardContent className="flex flex-col justify-center items-center text-center">
                  <p className="card-ink-text">{theme.description}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default ThemeSelector
