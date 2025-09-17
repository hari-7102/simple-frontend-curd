import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import apiClient from "../apiClient/apiClient"

const  LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 state for toggle

  const navigate = useNavigate();

    const handleSubmit = async () => {
      
      try {
        const data = { email, password }
        const response = await apiClient.post("/login",data);
        console.log(response.data)
        // setMessage(response.data);
        localStorage.setItem("authToken", response.data.accessToken);
        localStorage.setItem("Email", response.data.email);
        navigate("/products")
      } catch (error) {
        console.error("Login error", );
        setMessage("Invaild Credentials");
      }
    };

  

    


  return (
    <div className="flex h-screen items-center justify-center bg-gray-700">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div  className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 border rounded-lg pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-sm text-gray-600 hover:text-black"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </div>

        <div className="flex mt-2 items-center justify-between ">
          <button className="text-blue-700   cursor-pointer"    onClick={() => navigate('/forgotpassword')}>Forgot Password ?</button>
          <button className="text-gray-800 cursor-pointer" onClick={() => navigate('/signup')}>SignUp</button>
        </div>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}


export default LoginPage;