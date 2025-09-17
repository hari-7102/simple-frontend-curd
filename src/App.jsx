import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Login from './component/Login'

import UserData from './component/UserData'
import Products from './component/ProductsData'
import Signup from './component/Signup'
import ForgotPassword from './component/forgotPassword'
import PostProducts from './component/postProduct'
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<div className='text-center justify-center flex h-screen bg-blue-300'>Haii , hello</div>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/user' element={<UserData/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/products/create' element={<PostProducts/>} />
        </Routes>
      </Router>
    
    </div>
  )
}

export default App
