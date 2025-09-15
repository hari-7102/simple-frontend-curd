import React, { use, useState } from 'react'
import axios from 'axios'
import apiClient from '../apiClient/apiClient'
import { useNavigate } from 'react-router-dom'
const Signup = () => {

  const [username , setUsername] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [showpassword , setShowPassword] = useState(false)


  const navigate = useNavigate()

  const handleCreate = async () => {
        try{
          const data = { username , email , password }
          const res = await apiClient.post("/api/users" , data)
          console.log(res.data)
          alert("user created successfully")
          navigate('/login')
        }catch (error) {
          console.log("error message",error.message)
          alert("Not Created")
        }
  }

      return (
        <div className="py-16 w-full bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
            <h1 className="text-center text-gray-900 text-3xl font-bold mb-8">Create Account</h1>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
              <div className="w-full">
                <label className="text-lg font-medium text-gray-700" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="w-full">
                <label className="text-lg font-medium text-gray-700" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="w-full relative">
                <label className="text-lg font-medium text-gray-700" htmlFor="password">Password</label>
                <input
                  type={showpassword ? "text" : "password"}
                  id="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <button
                  type="button"
                  className="absolute bottom-2.5 right-3 text-sm text-blue-600 hover:text-blue-800 transition duration-200"
                  onClick={() => setShowPassword(!showpassword)}
                >
                  {showpassword ? "Hide" : "Show"}
                </button>
              </div>
              <button
                type="button"
                onClick={handleCreate}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      );
    }

export default Signup
