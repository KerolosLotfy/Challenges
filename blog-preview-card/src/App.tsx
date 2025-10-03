import './App.css'
import Error404 from './Components/error404'
// import { Details } from './Components/details'
import { Main } from './Components/main'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path='/*' element={<Error404 />} /> {/* Page Not Found  (Error 404) */}
      </Routes>

    </Router>
  )
}

export default App
