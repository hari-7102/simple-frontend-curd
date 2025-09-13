import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Login from './component/Login'
import Signup from './component/Signup'
import UserData from './component/UserData'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<div>Haii , hello</div>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/user' element={<UserData/>} />
        </Routes>
      </Router>
    
    </div>
  )
}

export default App
