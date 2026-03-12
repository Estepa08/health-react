import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card } from 'react-bootstrap';

function App() {
    return (
        <Container className="mt-5">
            <Card className="shadow-lg border-0">
                <Card.Body className="p-5 text-center">
                    <h1 className="display-4 mb-4">🏥 Health React</h1>
                    <p className="lead text-muted">Проект успешно создан!</p>
                    <hr />
                    <p className="text-success"></p>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default App;
