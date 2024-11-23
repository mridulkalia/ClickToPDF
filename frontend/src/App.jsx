import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import PDFToWord from './pages/DocToPDF'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/wordtopdf' element={<PDFToWord />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
