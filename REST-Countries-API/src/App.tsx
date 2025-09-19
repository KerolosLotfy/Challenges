import './App.css'
import Error404 from './Components/error404'
// import { Details } from './Components/details'
import { Header } from './Components/header'
import { Main } from './Components/main'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router basename="/">
      <Header />
      <Routes>
        <Route path="/" element={<Main filtered={false} details={false} />} />
        <Route path="/filter" element={<Main filtered={true} details={false} />} />
        <Route path="/details/:name" element={<Main filtered={false} details={true} />} />
        <Route path='/*' element={<Error404 />} /> {/* Page Not Found  (Error 404) */}
      </Routes>

    </Router>
  )
}

export default App
