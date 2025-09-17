import React, { useState } from "react";
import axios from "axios";
import apiClient from "../apiClient/apiClient";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
    const navigate = useNavigate('')
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    total: "",
  });

  const [message, setMessage] = useState("");

  // update inputs
 
  // submit form
  const handleSubmit = async () => {
    // e.preventDefault();
    try {
    //   const token = localStorage.getItem("token"); // 👈 saved on login

      const res = await apiClient.post("/api/products",formData);

      setMessage("✅ Product added successfully!");
      navigate('/products')
      setFormData({ name: "", quantity: "", price: "", total: 0 });
    } catch (error) {
      setMessage("❌ Error adding product: " + error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>

      <div  className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
         onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="total"
          placeholder="Total"
          value={formData.total}
          onChange={(e) => setFormData({ ...formData, total: e.target.value })}
          className="w-full border p-2 rounded bg-gray-100"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AddProduct;
