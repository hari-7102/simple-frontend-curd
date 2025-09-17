import { useState } from "react";
import apiClient from "../apiClient/apiClient";
import { useNavigate } from "react-router-dom";
const  forgotPassword = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate('')

    const handleSubmit = async() => {
    if (!email || !password || !confirmPassword) {
        setError('Please enter all field ...');
        return;
    }
    
    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }
    // setError('');
    // setSuccess('Password reset successfully!');
    // Here you would typically make an API call        to reset the password
        try{
            const data = { email , confirmPassword }
            const res = await apiClient.post('/forgotpass', data)
            console.log(res.data)
            alert("Password Change Successfully ... ")
            navigate("/login")
        }catch (error) {
            console.log("Error ", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
    <div className="py-16 w-full bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex flex-col  items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-center text-gray-900 text-3xl font-bold mb-8">Reset Password</h1>
        <div className="flex flex-col items-center justify-center gap-4 w-full">
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
            <label className="text-lg font-medium text-gray-700" htmlFor="password">Create Password</label>
            <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Create new password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <button
                type="button"
                className="absolute bottom-2.5 right-3 text-sm text-blue-600 hover:text-blue-800 transition duration-200"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? "Hide" : "Show"}
            </button>
            </div>
            <div className="w-full">
            <label className="text-lg font-medium text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
            <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            </div>
            {error && <p classClass="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <button
            type="button"
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            onClick={handleSubmit}
            >
            Reset Password
            </button>
        </div>
        </div>


        <p    onClick={() => navigate('/login')}
        className="text-gray-700 text-center mt-7 hover:text-blue-800 cursor-pointer">Login Page</p>
    </div>
    );
}


 export default forgotPassword