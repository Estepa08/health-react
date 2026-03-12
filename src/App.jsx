import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import GreenCard from './components/GreenCard'

function App() {
  return (
    <div className="container">
      <h1 className="text-center my-5"></h1>
      <div className="row justify-content-center g-4">
        {[1, 2, 3, 4, 5, 6 ].map((_, i) => (
          <div key={i} className="col-sm-6 col-md-5 col-lg-4 d-flex justify-content-center">
            <GreenCard />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
