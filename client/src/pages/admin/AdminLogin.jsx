import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password
      });

      const data = res.data;

      // simpan token
      localStorage.setItem("token", data.token);

      // redirect ke dashboard
      navigate("/admin/dashboard");

    } catch (err) {
      alert("Login gagal");
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-md rounded w-96"
      >

        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        <div className="mb-4">
          <label className="block mb-1">Email</label>

          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>

          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

      </form>

    </div>
  );
}