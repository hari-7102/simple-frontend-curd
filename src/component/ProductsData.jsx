import React from 'react'
import { useState, useEffect } from 'react';
// import { fetchWithAuth } from '../component/fetchWithAuth';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import apiClient from "../apiClient/apiClient"

const ProductsData = () => {

        const [userData, setUserData] = useState([]);
        // const token = localStorage.getItem("authToken");
        // console.log(token)
        const navigate = useNavigate();
        // const refreshToken = getCookie("refreshToken");

        // function getCookie(name) {
        //   const value = `; ${document.cookie}`;
        //   const parts = value.split(`; ${name}=`);
        //   if (parts.length === 2) return parts.pop().split(";").shift();
        //   return null;
        // }
        // console.log("refresh token", refreshToken);

          
            const fetchUserData = async () => {
              try {
                const res = await apiClient.get("/api/products")
              
                // console.log(res.data)

                if (!res) {
                  throw new Error("Failed to fetch user data");
                }
                setUserData(res.data);
                console.log(res.data)
                // console.log("userdata",)
              } catch (error) {
                console.error("Error fetching user data:", error);
              }
            };


          useEffect (() => {  

            fetchUserData()

          }, []);



const handleLogout = async () => {
  
    // Clear access token (localStorage / state)
    localStorage.removeItem("authToken");
    localStorage.removeItem("Email");

    // Call backend logout → clears refresh token cookie
    await axios.post("http://localhost:3000/logout", {
      
      credentials: "include", // ✅ send cookies
    });

    // Redirect to login page
    navigate("/login");
};




    
  return (
    <div className="p-6">
    <h2 className="text-xl font-bold mb-2 text-gray-800">Products Data</h2>
    <button className='bg-blue-600 text-white px-5 py-2  rounded-xl mb-4'   onClick={() => navigate('/products/create')}>Add Products</button>

    <div className="grid gap-4">
        {userData && userData.map((item, index) => (
        <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between border border-gray-200 hover:shadow-lg transition"
        >
            <div>
            <p className="text-lg font-semibold text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-600">{item.quantity}</p>
            </div>

            <div className="text-sm text-red-500 font-mono">
            {item.price}
            </div>
        </div>
        ))}
    </div>

    <div>
        <button onClick={handleLogout} className='bg-red-800 px-5 py-2 rounded-2xl text-center text-white mt-3 '>Logout</button>
    </div>
    </div>

  )
}

export default ProductsData
