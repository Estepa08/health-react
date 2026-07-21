import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Layout from '../components/layout/SurveyLayout'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="flex justify-center px-3 sm:px-5">
        <Card style={{ width: '320px', maxWidth: '100%', height: '480px' }}>
          <CardContent className="flex flex-col justify-center items-center text-center h-full">
            <h1 className="card-title mb-3">404</h1>
            <p className="mb-4">Страница не найдена</p>
            <Button onClick={() => navigate('/')}>
              На главную
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default NotFoundPage
