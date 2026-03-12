import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import './GreenCard.css' // создадим файл со стилями

export default function GreenCard({ question = 'Вам грустно или вы в плохом настроении?' }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={`flip-card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flip-card-inner">
        {/* Лицевая сторона */}
        <div className="flip-card-front">
          <Card
            bg="success"
            text="white"
            style={{ width: '18rem', height: '250px', cursor: 'pointer' }}
          >
            <Card.Header>Вопрос</Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <Card.Title className="text-center">{question}</Card.Title>
            </Card.Body>
          </Card>
        </div>

        {/* Обратная сторона */}
        <div className="flip-card-back">
          <Card
            bg="info"
            text="white"
            style={{ width: '18rem', height: '250px', cursor: 'pointer' }}
          >
            <Card.Header>Ответ</Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <div className="text-center">
                <h5>Как вы ответите?</h5>
                <div className="mt-3">
                  <Button variant="light" size="sm" className="m-1">
                    Да
                  </Button>
                  <Button variant="light" size="sm" className="m-1">
                    Нет
                  </Button>
                  <Button variant="light" size="sm" className="m-1">
                    Иногда
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
