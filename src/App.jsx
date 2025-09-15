import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Login from './component/Login'

import UserData from './component/UserData'
import Signup from './component/Signup'
import ForgotPassword from './component/forgotPassword'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<div className='text-center'>Haii , hello</div>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/user' element={<UserData/>} />
        </Routes>
      </Router>
    
    </div>
  )
}

export default App
