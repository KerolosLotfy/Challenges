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
        <Route path="/" element={<Main />} />



        {/* Page Not Found  (Error 404) */}
        <Route path='/*' element={<Error404 />} />
      </Routes>

    </Router>
  )
}

export default App
