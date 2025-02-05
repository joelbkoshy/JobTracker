import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from '../src/pages/Registration.jsx'
import Login from '../src/pages/Login.jsx'
import Dashboard from '../src/pages/Dashboard.jsx'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
